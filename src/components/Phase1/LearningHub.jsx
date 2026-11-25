import React, { useState } from 'react';
import { BookOpen, ExternalLink, Code2, Check, Copy, Play, ArrowRight, Sparkles, CheckCircle2, Video, Wrench, FileCode2, HelpCircle, Download, FileText, Maximize2, Printer } from 'lucide-react';
import { generateDynamicLearningResources } from '../../services/aiEngine';
import TopicDocReaderModal from './TopicDocReaderModal';
import { generateElaboratedStudyDoc } from '../../services/elaboratedDocGenerator';

export default function LearningHub({ project, onMarkModuleComplete, completedModules, onNext }) {
  const dynamicResources = generateDynamicLearningResources(project);
  const availableTechs = Object.keys(dynamicResources);
  const [selectedTech, setSelectedTech] = useState(availableTechs[0] || 'FastAPI');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [selectedDocForModal, setSelectedDocForModal] = useState(null);
  
  const currentResource = dynamicResources[selectedTech] || dynamicResources[availableTechs[0]];
  const [exercisePassed, setExercisePassed] = useState(false);

  const handleCopy = (code, idx) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleVerifyExercise = () => {
    onMarkModuleComplete(selectedTech);
    setExercisePassed(true);
  };

  // Generate Styled PDF Print Window for Single Topic (Zero Hashtags!)
  const handleDownloadSingleTopicPDF = (doc) => {
    const fullDocText = generateElaboratedStudyDoc(doc.topicName, selectedTech, project?.title);
    
    let formattedHTML = fullDocText
      .replace(/# (.*)/g, '<h1 class="pdf-h1">$1</h1>')
      .replace(/## (.*)/g, '<h2 class="pdf-h2">$1</h2>')
      .replace(/### (.*)/g, '<h3 class="pdf-h3">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/```javascript([\s\S]*?)```/g, '<pre class="pdf-code">$1</pre>')
      .replace(/```([\s\S]*?)```/g, '<pre class="pdf-code">$1</pre>')
      .replace(/- (.*)/g, '<div class="pdf-bullet">• $1</div>')
      .replace(/\n\n/g, '<br/><br/>');

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${doc.topicName} - Study Guide PDF</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Fira+Code:wght@400;600&display=swap');
            body { font-family: 'Inter', sans-serif; padding: 40px; color: #0f172a; line-height: 1.6; background: #ffffff; }
            .header-banner { text-align: center; padding-bottom: 20px; border-bottom: 3px double #6366f1; margin-bottom: 30px; }
            .header-banner h1 { font-size: 26px; font-weight: 800; color: #4338ca; margin: 0 0 6px 0; border: none; }
            .header-banner p { font-size: 12px; color: #64748b; margin: 0; font-weight: 600; }
            .pdf-h1 { color: #4338ca; font-size: 22px; font-weight: 800; border-bottom: 2px solid #e0e7ff; padding-bottom: 6px; margin-top: 28px; margin-bottom: 12px; }
            .pdf-h2 { color: #1e1b4b; font-size: 16px; font-weight: 700; border-bottom: 1px solid #f1f5f9; padding-bottom: 4px; margin-top: 22px; margin-bottom: 10px; }
            .pdf-h3 { color: #7e22ce; font-size: 14px; font-weight: 700; margin-top: 16px; margin-bottom: 6px; }
            .pdf-code { background: #0f172a; color: #a5b4fc; padding: 16px; border-radius: 12px; font-family: 'Fira Code', monospace; font-size: 11px; overflow-x: auto; white-space: pre-wrap; margin: 14px 0; border: 1px solid #334155; }
            code { background: #eef2ff; color: #4338ca; padding: 2px 6px; border-radius: 4px; font-family: 'Fira Code', monospace; font-size: 11px; border: 1px solid #c7d2fe; }
            strong { color: #0f172a; font-weight: 700; }
            .pdf-bullet { margin-left: 16px; margin-bottom: 6px; font-size: 12px; color: #334155; }
            .footer { margin-top: 50px; font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 16px; }
          </style>
        </head>
        <body>
          <div class="header-banner">
            <h1>${doc.topicName}</h1>
            <p>Target Project: ${project?.title || 'Hospital Management System'} | Technology: ${selectedTech}</p>
          </div>
          
          <div>${formattedHTML}</div>

          <div class="footer">
            LearnBuild AI — Adaptive Learning & Development Platform • Confidential Study Guide
          </div>

          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Generate Styled PDF Print Window for Complete Tech Book (Zero Hashtags!)
  const handleDownloadAllStudyPDF = () => {
    if (!currentResource || !currentResource.mustLearnTopicDocs) return;

    let combinedHTML = '';
    currentResource.mustLearnTopicDocs.forEach((doc) => {
      const fullDoc = generateElaboratedStudyDoc(doc.topicName, selectedTech, project?.title);
      const parsed = fullDoc
        .replace(/# (.*)/g, '<h1 class="pdf-h1">$1</h1>')
        .replace(/## (.*)/g, '<h2 class="pdf-h2">$1</h2>')
        .replace(/### (.*)/g, '<h3 class="pdf-h3">$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/```javascript([\s\S]*?)```/g, '<pre class="pdf-code">$1</pre>')
        .replace(/```([\s\S]*?)```/g, '<pre class="pdf-code">$1</pre>')
        .replace(/- (.*)/g, '<div class="pdf-bullet">• $1</div>')
        .replace(/\n\n/g, '<br/><br/>');

      combinedHTML += `<div style="page-break-after: always;">${parsed}</div>`;
    });

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${selectedTech} Complete Study Book PDF</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Fira+Code:wght@400;600&display=swap');
            body { font-family: 'Inter', sans-serif; padding: 40px; color: #0f172a; line-height: 1.6; background: #ffffff; }
            .header-banner { text-align: center; padding-bottom: 20px; border-bottom: 3px double #6366f1; margin-bottom: 30px; }
            .header-banner h1 { font-size: 28px; font-weight: 800; color: #4338ca; margin: 0 0 6px 0; border: none; }
            .header-banner p { font-size: 13px; color: #64748b; margin: 0; font-weight: 600; }
            .pdf-h1 { color: #4338ca; font-size: 22px; font-weight: 800; border-bottom: 2px solid #e0e7ff; padding-bottom: 6px; margin-top: 28px; margin-bottom: 12px; }
            .pdf-h2 { color: #1e1b4b; font-size: 16px; font-weight: 700; border-bottom: 1px solid #f1f5f9; padding-bottom: 4px; margin-top: 22px; margin-bottom: 10px; }
            .pdf-h3 { color: #7e22ce; font-size: 14px; font-weight: 700; margin-top: 16px; margin-bottom: 6px; }
            .pdf-code { background: #0f172a; color: #a5b4fc; padding: 16px; border-radius: 12px; font-family: 'Fira Code', monospace; font-size: 11px; overflow-x: auto; white-space: pre-wrap; margin: 14px 0; border: 1px solid #334155; }
            code { background: #eef2ff; color: #4338ca; padding: 2px 6px; border-radius: 4px; font-family: 'Fira Code', monospace; font-size: 11px; border: 1px solid #c7d2fe; }
            strong { color: #0f172a; font-weight: 700; }
            .pdf-bullet { margin-left: 16px; margin-bottom: 6px; font-size: 12px; color: #334155; }
            .footer { margin-top: 50px; font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 16px; }
          </style>
        </head>
        <body>
          <div class="header-banner">
            <h1>${selectedTech} Complete Study Book</h1>
            <p>Target Project: ${project?.title || 'Hospital Management System'}</p>
          </div>
          
          <div>${combinedHTML}</div>

          <div class="footer">
            LearnBuild AI — Project-Based Adaptive Learning & Development Platform • Complete Study Book
          </div>

          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const isCompleted = completedModules.includes(selectedTech);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-400">Step 6: Must-Learn Topic Study Docs</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Elaborated Study Guides (PDF Download)</h2>
          <p className="text-xs text-gray-400 mt-1">
            Comprehensive textbook-level study guides (5+ pages) for ONLY the essential topics required for {project?.title}.
          </p>
        </div>
        <button
          onClick={onNext}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-500/20"
        >
          Check Knowledge Verification <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Tech Tabs Selector & Download PDF Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-3 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {availableTechs.map((tech) => {
            const done = completedModules.includes(tech);
            return (
              <button
                key={tech}
                onClick={() => {
                  setSelectedTech(tech);
                  setExercisePassed(false);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 border ${
                  selectedTech === tech
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                    : 'bg-slate-900/80 border-gray-800 text-gray-400 hover:border-gray-700 hover:text-white'
                }`}
              >
                {done && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
                <span>{tech}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleDownloadAllStudyPDF}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-500/20 shrink-0"
        >
          <Download className="h-4 w-4" /> Download {selectedTech} PDF Book
        </button>
      </div>

      {/* Main Content Area */}
      {currentResource && (
        <div className="space-y-6">
          
          {/* Header Card */}
          <div className="glass-panel rounded-2xl p-6 border border-gray-800 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-white">{currentResource.title}</h3>
                {isCompleted && (
                  <span className="px-2 py-0.5 text-[10px] bg-emerald-500/20 text-emerald-300 rounded font-mono">
                    VERIFIED COMPLETED
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-300 mt-1 max-w-2xl leading-relaxed">{currentResource.summary}</p>
            </div>
          </div>

          {/* Must-Learn Topic Study Docs Cards */}
          {currentResource.mustLearnTopicDocs && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-indigo-400" /> Must-Learn Topics — 5-Page Study Guides ({currentResource.mustLearnTopicDocs.length} Topics)
                </h3>
                <span className="text-[11px] text-purple-400 font-mono font-bold">PDF Export Ready</span>
              </div>

              {currentResource.mustLearnTopicDocs.map((doc, idx) => (
                <div
                  key={idx}
                  className="glass-panel rounded-2xl p-6 border border-gray-800 hover:border-indigo-500/50 transition-all bg-slate-900/60"
                >
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-800">
                    <div className="flex items-center gap-2.5">
                      <span className="h-7 w-7 rounded-lg bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 flex items-center justify-center font-mono font-bold text-xs">
                        #{doc.topicNumber}
                      </span>
                      <h4 className="text-base font-bold text-white">{doc.topicName}</h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedDocForModal(doc)}
                        className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-500/20"
                      >
                        <Maximize2 className="h-3.5 w-3.5" /> Read Full Formatted Doc
                      </button>

                      <button
                        onClick={() => handleDownloadSingleTopicPDF(doc)}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-200 text-xs font-bold border border-gray-700 flex items-center gap-1.5"
                        title="Download PDF Document"
                      >
                        <Download className="h-3.5 w-3.5 text-indigo-400" /> PDF
                      </button>
                    </div>
                  </div>

                  {/* 1. Core Concept */}
                  <div className="mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                      1. Core Concept
                    </span>
                    <p className="text-xs text-gray-200 leading-relaxed">{doc.conceptSummary}</p>
                  </div>

                  {/* 2. Code Snippet */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300 block">
                        2. Code Snippet Used in {project?.title}
                      </span>
                      <button
                        onClick={() => handleCopy(doc.codeSnippet, idx)}
                        className="text-gray-400 hover:text-white text-xs flex items-center gap-1"
                      >
                        {copiedIndex === idx ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                        <span>{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <div className="rounded-xl bg-slate-950 border border-gray-800 p-3.5">
                      <pre className="text-xs font-mono text-indigo-200 overflow-x-auto whitespace-pre">
                        {doc.codeSnippet}
                      </pre>
                    </div>
                  </div>

                  {/* 3. Why Required & Debugging Tip */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/30">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5 mb-1">
                        <HelpCircle className="h-3.5 w-3.5 text-purple-400" /> Why Needed in {project?.title}
                      </span>
                      <p className="text-[11px] text-gray-300 leading-normal">{doc.whyRequiredInProject}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5 mb-1">
                        <Wrench className="h-3.5 w-3.5 text-amber-400" /> Debugging Tip
                      </span>
                      <p className="text-[11px] text-gray-300 leading-normal">{doc.debugTip}</p>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

          {/* Curated Short Duration YouTube Videos */}
          {currentResource.youtubeVideos && (
            <div className="glass-panel rounded-2xl p-6 border border-gray-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 mb-4 flex items-center gap-2">
                <Video className="h-4 w-4 text-red-400" /> Optional Short Video Guides (&lt; 10 Mins)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentResource.youtubeVideos.map((vid, vIdx) => (
                  <div key={vIdx} className="p-4 rounded-xl bg-slate-950 border border-gray-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-gray-200 line-clamp-1">{vid.title}</span>
                        <span className="px-2 py-0.5 text-[10px] bg-red-500/10 text-red-400 rounded font-mono font-bold shrink-0">
                          {vid.duration}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 mb-3">{vid.description}</p>
                    </div>

                    <a
                      href={vid.youtubeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 rounded-lg text-xs font-semibold text-center flex items-center justify-center gap-1.5"
                    >
                      Watch Focused Tutorial <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mini Coding Sandbox */}
          {currentResource.miniExercise && (
            <div className="glass-panel rounded-2xl p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Play className="h-4 w-4" /> Practical Mini Exercise
                </h4>
                <span className="text-xs text-gray-400">Complete exercise to verify module</span>
              </div>
              <p className="text-xs text-gray-300 mb-3">{currentResource.miniExercise.instructions}</p>

              <div className="rounded-xl bg-slate-950 border border-gray-800 p-4 mb-4">
                <textarea
                  rows={4}
                  defaultValue={currentResource.miniExercise.initialCode}
                  className="w-full bg-transparent font-mono text-xs text-indigo-200 focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={handleVerifyExercise}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-500/20"
                >
                  <Check className="h-4 w-4" /> Run & Mark Module Complete
                </button>

                {exercisePassed && (
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <Sparkles className="h-4 w-4" /> Module Verified Complete!
                  </span>
                )}
              </div>
            </div>
          )}

        </div>
      )}

      {/* Topic Reader Modal */}
      {selectedDocForModal && (
        <TopicDocReaderModal
          doc={selectedDocForModal}
          selectedTech={selectedTech}
          project={project}
          onClose={() => setSelectedDocForModal(null)}
        />
      )}
    </div>
  );
}
