import React from 'react';
import { Check, Lock, ChevronRight, Play, ShieldAlert } from 'lucide-react';

export const WORKFLOW_STEPS = [
  // Phase 1
  { id: 1, phase: 1, title: 'Project Idea', desc: 'Enter idea & select domain' },
  { id: 2, phase: 1, title: 'AI Analysis', desc: 'Tech stack & difficulty' },
  { id: 3, phase: 1, title: 'Concept Extraction', desc: 'Must-learn vs skipped matrix' },
  { id: 4, phase: 1, title: 'Knowledge Assessment', desc: 'Skill diagnostic test (8/10 Pass)' },
  { id: 5, phase: 1, title: 'Personalized Roadmap', desc: 'Adaptive study timetable' },
  { id: 6, phase: 1, title: 'Learning Resources', desc: 'Cheat sheets & practice' },
  { id: 7, phase: 1, title: 'Knowledge Verification', desc: 'Post-module verification' },
  { id: 8, phase: 1, title: 'Readiness Score', desc: 'Mastery & unlock verdict' },
  
  // Phase 2
  { id: 9, phase: 2, title: 'Architecture Blueprint', desc: 'SRS, ER & folder tree' },
  { id: 10, phase: 2, title: 'Modular Code Studio', desc: 'Line-by-line code explanation' },
  { id: 11, phase: 2, title: 'Testing & Deployment', desc: 'Docker & PyTest configs' },
  { id: 12, phase: 2, title: 'Documentation & PPT', desc: 'SRS, README & slides' },
  { id: 13, phase: 2, title: 'Viva Preparation', desc: 'Virtual AI Examiner Q&A' },
  { id: 14, phase: 2, title: 'Final Certification', desc: 'Project completion summary' }
];

export default function PhaseTracker({ currentStep, unlockedStep = 1, onSelectStep, phase2Unlocked }) {
  const maxUnlocked = Math.max(1, unlockedStep || 1);

  return (
    <div className="bg-slate-900/80 border-b border-gray-800 py-3 px-4 overflow-x-auto no-scrollbar shadow-inner">
      <div className="max-w-7xl mx-auto flex items-center justify-between min-w-[950px] gap-2">
        {WORKFLOW_STEPS.map((step, idx) => {
          const isCompleted = step.id < maxUnlocked;
          const isActive = step.id === currentStep;
          const isUnlocked = step.id <= maxUnlocked || (step.phase === 2 && phase2Unlocked);
          const isLocked = !isUnlocked;

          return (
            <React.Fragment key={step.id}>
              <button
                disabled={isLocked}
                onClick={() => isUnlocked && onSelectStep(step.id)}
                title={isLocked ? `Locked: Complete Step ${step.id - 1} task to unlock ${step.title}` : `Navigate to ${step.title}`}
                className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl transition-all text-left group ${
                  isActive
                    ? 'bg-indigo-600/30 border border-indigo-500/60 shadow-lg shadow-indigo-500/20'
                    : isCompleted
                    ? 'bg-slate-800/60 hover:bg-slate-800 text-gray-200 border border-gray-800 hover:border-gray-700 cursor-pointer'
                    : isUnlocked
                    ? 'bg-slate-900 hover:bg-slate-800 text-gray-300 border border-gray-800 cursor-pointer'
                    : 'opacity-40 cursor-not-allowed text-gray-500 border border-transparent bg-slate-950'
                }`}
              >
                {/* Step Icon Badge */}
                <div
                  className={`h-7 w-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all shrink-0 ${
                    isCompleted
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/50 ring-2 ring-indigo-400/40'
                      : isUnlocked
                      ? 'bg-slate-800 text-gray-300 border border-gray-700'
                      : 'bg-slate-950 text-gray-600 border border-gray-850'
                  }`}
                >
                  {isCompleted ? <Check className="h-4 w-4 stroke-[3]" /> : isLocked ? <Lock className="h-3.5 w-3.5 text-gray-500" /> : step.id}
                </div>

                {/* Step Title & Desc */}
                <div className="hidden lg:block whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-xs font-bold ${isActive ? 'text-indigo-300' : isUnlocked ? 'text-gray-200' : 'text-gray-500'}`}>
                      {step.title}
                    </span>
                    {step.id === 8 && (
                      <span className="px-1.5 py-0.2 text-[9px] bg-amber-500/20 text-amber-300 rounded font-mono font-bold">
                        GATE
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-400 max-w-[130px] truncate">{step.desc}</p>
                </div>
              </button>

              {idx < WORKFLOW_STEPS.length - 1 && (
                <ChevronRight className={`h-4 w-4 shrink-0 ${idx + 1 < maxUnlocked ? 'text-emerald-500/60' : 'text-gray-700'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
