import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PhaseTracker from './components/PhaseTracker';
import AITutorDrawer from './components/AITutorDrawer';
import TechStackCustomizerModal from './components/TechStackCustomizerModal';
import AuthModal from './components/AuthModal';
import { useAuth } from './context/AuthContext';

// Phase 1 Components
import ProjectIdeaInput from './components/Phase1/ProjectIdeaInput';
import TechAnalysisView from './components/Phase1/TechAnalysisView';
import ConceptExtractor from './components/Phase1/ConceptExtractor';
import KnowledgeAssessment from './components/Phase1/KnowledgeAssessment';
import PersonalizedRoadmap from './components/Phase1/PersonalizedRoadmap';
import LearningHub from './components/Phase1/LearningHub';
import KnowledgeVerification from './components/Phase1/KnowledgeVerification';
import ReadinessDashboard from './components/Phase1/ReadinessDashboard';

// Phase 2 Components
import ArchitectureView from './components/Phase2/ArchitectureView';
import CodeStudio from './components/Phase2/CodeStudio';
import TestDeployCenter from './components/Phase2/TestDeployCenter';
import DocGenerator from './components/Phase2/DocGenerator';
import VivaExaminer from './components/Phase2/VivaExaminer';

// AI Services & Storage
import { PRESET_PROJECTS } from './data/sampleProjects';
import {
  generateDynamicProjectStructure,
  analyzeProject,
  swapProjectTechnology,
  calculateReadinessScore
} from './services/aiEngine';
import { storageService } from './services/storageService';

export default function App() {
  const { user } = useAuth();

  // State Initialization with LocalStorage / Backend Sync Persistence
  const [activeProject, setActiveProject] = useState(() => {
    const saved = storageService.getActiveProject();
    return saved || generateDynamicProjectStructure(PRESET_PROJECTS[0].title, PRESET_PROJECTS[0].domainId);
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [unlockedStep, setUnlockedStep] = useState(() => storageService.getUnlockedStep() || 1);
  const [assessmentAnswers, setAssessmentAnswers] = useState({});
  const [assessmentHistory, setAssessmentHistory] = useState(() => storageService.getAssessmentHistory() || []);
  const [completedModules, setCompletedModules] = useState(() => {
    const saved = storageService.getCompletedModules();
    return saved || ['FastAPI'];
  });

  const [phase2Unlocked, setPhase2Unlocked] = useState(() => unlockedStep >= 9);
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  // Helper to advance unlocked step in Gated Queue
  const unlockStep = (targetStep) => {
    setUnlockedStep(prev => {
      const nextMax = Math.max(prev, targetStep);
      storageService.saveUnlockedStep(nextMax);
      return nextMax;
    });
    setCurrentStep(targetStep);
  };

  // Sync state when user logs in / changes user session
  useEffect(() => {
    async function syncUserDataOnAuth() {
      if (user) {
        const data = await storageService.loadFromAPI();
        if (data) {
          if (data.activeProject) setActiveProject(data.activeProject);
          if (data.assessmentHistory) setAssessmentHistory(data.assessmentHistory);
          if (data.completedModules) setCompletedModules(data.completedModules);
          if (data.unlockedStep) {
            setUnlockedStep(data.unlockedStep);
            if (data.unlockedStep >= 9) setPhase2Unlocked(true);
          }
        }
      }
    }
    syncUserDataOnAuth();
  }, [user]);

  // Sync Active Project to Storage
  useEffect(() => {
    if (activeProject) {
      storageService.saveActiveProject(activeProject);
    }
  }, [activeProject]);

  const currentPhase = currentStep <= 8 ? 1 : 2;

  const handleSelectPreset = (preset) => {
    if (!preset) return;
    let targetTitle = typeof preset === 'string' ? preset : preset.title;
    let targetDomain = typeof preset === 'object' ? preset.domainId : 'swe';
    let targetDesc = typeof preset === 'object' ? preset.description : null;

    const match = PRESET_PROJECTS.find(p => p.id === preset || p.id === preset.id || p.title.toLowerCase() === targetTitle.toLowerCase());
    if (match) {
      targetTitle = match.title;
      targetDomain = match.domainId;
      targetDesc = match.description;
    }

    const freshProject = generateDynamicProjectStructure(targetTitle, targetDomain, targetDesc);
    setActiveProject(freshProject);
    unlockStep(2);
  };

  const handleSubmitIdea = (promptText, domainId) => {
    const analyzed = analyzeProject(promptText, domainId);
    setActiveProject(analyzed);
    unlockStep(2);
  };

  const handleSwapTech = (category, newTech) => {
    const updated = swapProjectTechnology(activeProject, category, newTech);
    setActiveProject(updated);
    return updated;
  };

  const handleSaveAnswers = (categoryAnswers, summary) => {
    setAssessmentAnswers(categoryAnswers);
    const updatedHistory = [...assessmentHistory, summary];
    setAssessmentHistory(updatedHistory);
    storageService.saveAssessmentHistory(updatedHistory);
    if (summary && summary.passed) {
      unlockStep(5);
    }
  };

  const handleMarkModuleComplete = (techName) => {
    if (!completedModules.includes(techName)) {
      const updated = [...completedModules, techName];
      setCompletedModules(updated);
      storageService.saveCompletedModules(updated);
    }
  };

  const handleUnlockPhase2 = () => {
    setPhase2Unlocked(true);
    unlockStep(9);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setUnlockedStep(1);
    const resetP = generateDynamicProjectStructure(PRESET_PROJECTS[0].title, PRESET_PROJECTS[0].domainId);
    setActiveProject(resetP);
    setAssessmentAnswers({});
    setAssessmentHistory([]);
    setCompletedModules(['FastAPI']);
    setPhase2Unlocked(false);
    storageService.clearAll();
  };

  const readinessData = calculateReadinessScore(assessmentAnswers, completedModules, activeProject);

  // Clear Guidance Label for "What Should I Do Next?"
  const getNextActionGuidance = () => {
    switch (currentStep) {
      case 1: return { text: 'Enter project idea & click "Analyze & Extract Concepts"', stepName: 'Step 1: Idea Input' };
      case 2: return { text: 'Review AI Tech Stack & click "Extract Essential Concepts"', stepName: 'Step 2: Tech Analysis' };
      case 3: return { text: 'Review Must-Learn vs Skipped matrix & click "Begin Baseline Diagnostic"', stepName: 'Step 3: Concept Extraction' };
      case 4: return { text: 'Score 8/10 or higher on diagnostic to unlock "Personalized Roadmap"', stepName: 'Step 4: Knowledge Diagnostic' };
      case 5: return { text: 'Adjust study hours & click "Explore Learning Resources"', stepName: 'Step 5: Personalized Roadmap' };
      case 6: return { text: 'Read cheat sheets, watch short videos, & click "Check Knowledge Verification"', stepName: 'Step 6: Learning Hub' };
      case 7: return { text: 'Verify practical tasks & click "Calculate Project Readiness Score"', stepName: 'Step 7: Verification' };
      case 8: return { text: 'Click "Unlock Phase 2 Development Studio"', stepName: 'Step 8: Readiness Gate' };
      case 9: return { text: 'Review folder tree & ER schema, then click "Open Step-by-Step Code Studio"', stepName: 'Step 9: Architecture' };
      case 10: return { text: 'Explore code files & line breakdowns, then click "Testing & Docker Setup"', stepName: 'Step 10: Code Studio' };
      case 11: return { text: 'Review Docker & unit test configs, then click "Generate SRS & PPT Deck"', stepName: 'Step 11: Testing & Docker' };
      case 12: return { text: 'Copy/download SRS or PPT, then click "Proceed to Virtual AI Viva Examiner"', stepName: 'Step 12: Documentation' };
      case 13:
      case 14: return { text: 'Answer AI Viva questions & claim your completion certificate!', stepName: 'Step 13-14: Viva Exam' };
      default: return { text: 'Follow the guided path', stepName: 'Overview' };
    }
  };

  const guidance = getNextActionGuidance();

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Global Navigation Bar */}
      <Navbar
        activeProject={activeProject}
        onSelectPreset={handleSelectPreset}
        currentPhase={currentPhase}
        currentStep={currentStep}
        onReset={handleReset}
        onOpenTutor={() => setIsTutorOpen(true)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      {/* Workflow Stepper Gated Queue */}
      <PhaseTracker
        currentStep={currentStep}
        unlockedStep={unlockedStep}
        onSelectStep={(stepId) => setCurrentStep(stepId)}
        phase2Unlocked={phase2Unlocked}
      />

      {/* Clear UX Guidance Banner: "What Should I Do Next?" */}
      <div className="bg-slate-900/90 border-b border-indigo-500/20 py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono font-bold uppercase text-[10px]">
              You are here: {guidance.stepName}
            </span>
            <span className="text-gray-300 font-medium">👉 Next Step: {guidance.text}</span>
          </div>

          <button
            onClick={() => setIsCustomizerOpen(true)}
            className="text-[11px] text-purple-400 hover:text-purple-300 underline font-semibold shrink-0 cursor-pointer"
          >
            Active Tech Stack: {activeProject?.techStack?.backend} + {activeProject?.techStack?.frontend} (Click to Swap)
          </button>
        </div>
      </div>

      {/* Main Dynamic View Content */}
      <main className="flex-1 pb-16">
        {currentStep === 1 && (
          <ProjectIdeaInput
            onSubmitIdea={handleSubmitIdea}
            onSelectPreset={handleSelectPreset}
          />
        )}

        {currentStep === 2 && (
          <TechAnalysisView
            project={activeProject}
            onNext={() => unlockStep(3)}
          />
        )}

        {currentStep === 3 && (
          <ConceptExtractor
            project={activeProject}
            onNext={() => unlockStep(4)}
          />
        )}

        {currentStep === 4 && (
          <KnowledgeAssessment
            project={activeProject}
            onSaveAnswers={handleSaveAnswers}
            attemptHistory={assessmentHistory}
            onNext={() => unlockStep(5)}
          />
        )}

        {currentStep === 5 && (
          <PersonalizedRoadmap
            project={activeProject}
            onNext={() => unlockStep(6)}
          />
        )}

        {currentStep === 6 && (
          <LearningHub
            project={activeProject}
            completedModules={completedModules}
            onMarkModuleComplete={handleMarkModuleComplete}
            onNext={() => unlockStep(7)}
          />
        )}

        {currentStep === 7 && (
          <KnowledgeVerification
            project={activeProject}
            completedModules={completedModules}
            onNext={() => unlockStep(8)}
          />
        )}

        {currentStep === 8 && (
          <ReadinessDashboard
            project={activeProject}
            readiness={readinessData}
            onUnlockPhase2={handleUnlockPhase2}
            phase2Unlocked={phase2Unlocked}
          />
        )}

        {currentStep === 9 && (
          <ArchitectureView
            project={activeProject}
            onNext={() => unlockStep(10)}
          />
        )}

        {currentStep === 10 && (
          <CodeStudio
            project={activeProject}
            onOpenCustomizer={() => setIsCustomizerOpen(true)}
            onNext={() => unlockStep(11)}
          />
        )}

        {currentStep === 11 && (
          <TestDeployCenter
            project={activeProject}
            onNext={() => unlockStep(12)}
          />
        )}

        {currentStep === 12 && (
          <DocGenerator
            project={activeProject}
            onNext={() => unlockStep(13)}
          />
        )}

        {(currentStep === 13 || currentStep === 14) && (
          <VivaExaminer
            project={activeProject}
            onFinish={handleReset}
          />
        )}
      </main>

      {/* Auth Modal Component */}
      <AuthModal />

      {/* AI Tutor Contextual Sidebar Drawer */}
      <AITutorDrawer
        isOpen={isTutorOpen}
        onClose={() => setIsTutorOpen(false)}
        project={activeProject}
        currentStep={currentStep}
      />

      {/* Adaptive Tech Stack Customizer Modal */}
      {isCustomizerOpen && (
        <TechStackCustomizerModal
          project={activeProject}
          onSwapTech={handleSwapTech}
          onClose={() => setIsCustomizerOpen(false)}
        />
      )}

      {/* Global Footer */}
      <footer className="border-t border-gray-800/80 bg-slate-950 py-6 px-4 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>LearnBuild AI © 2026 – Project-Based Adaptive Learning Platform</span>
          <span className="text-gray-400 font-mono">Building skills first, code second.</span>
        </div>
      </footer>
    </div>
  );
}
