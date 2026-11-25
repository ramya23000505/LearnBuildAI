import React, { useState } from 'react';
import { X, RefreshCw, CheckCircle2, ArrowRight, Layers, Cpu, Database, Code, AlertTriangle } from 'lucide-react';

export default function TechStackCustomizerModal({ project, onSwapTech, onClose }) {
  const [selectedBackend, setSelectedBackend] = useState(project.techStack.backend);
  const [selectedFrontend, setSelectedFrontend] = useState(project.techStack.frontend);
  const [selectedDatabase, setSelectedDatabase] = useState(project.techStack.database);
  const [selectedAI, setSelectedAI] = useState(project.techStack.aiModels);

  const backendOptions = ['FastAPI', 'Express.js', 'Flask', 'Django'];
  const frontendOptions = ['React + Tailwind', 'Angular + TypeScript', 'Vue.js', 'Next.js'];
  const databaseOptions = ['PostgreSQL', 'MongoDB', 'SQLite', 'MySQL'];
  const aiOptions = ['LangChain + FAISS Vector DB', 'TensorFlow / Keras + OpenCV', 'Scikit-Learn (TF-IDF)', 'N/A'];

  const handleApplySwaps = () => {
    let updated = { ...project };
    if (selectedBackend !== project.techStack.backend) {
      updated = onSwapTech('backend', selectedBackend);
    }
    if (selectedFrontend !== project.techStack.frontend) {
      updated = onSwapTech('frontend', selectedFrontend);
    }
    if (selectedDatabase !== project.techStack.database) {
      updated = onSwapTech('database', selectedDatabase);
    }
    if (selectedAI !== project.techStack.aiModels) {
      updated = onSwapTech('aiModels', selectedAI);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="glass-panel w-full max-w-2xl rounded-3xl p-6 sm:p-8 border border-gray-800 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white">
              <RefreshCw className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Adaptive Tech Stack Customizer</h3>
              <p className="text-xs text-gray-400">Swap technologies anytime. AI will recalculate roadmap & code.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Warning Banner */}
        <div className="my-4 p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>Changing technologies will update your essential concepts, study timetable, assessment questions, and code!</span>
        </div>

        {/* Grid of Choices */}
        <div className="space-y-4 my-6">
          
          {/* Frontend */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-indigo-400" /> Frontend Framework
            </label>
            <div className="grid grid-cols-2 gap-2">
              {frontendOptions.map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSelectedFrontend(opt)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                    selectedFrontend === opt
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                      : 'bg-slate-900/60 border-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Backend */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
              <Code className="h-3.5 w-3.5 text-emerald-400" /> Backend Framework
            </label>
            <div className="grid grid-cols-2 gap-2">
              {backendOptions.map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSelectedBackend(opt)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                    selectedBackend === opt
                      ? 'bg-emerald-600 border-emerald-500 text-white shadow-md'
                      : 'bg-slate-900/60 border-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Database */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
              <Database className="h-3.5 w-3.5 text-amber-400" /> Database & Storage
            </label>
            <div className="grid grid-cols-2 gap-2">
              {databaseOptions.map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSelectedDatabase(opt)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                    selectedDatabase === opt
                      ? 'bg-amber-600 border-amber-500 text-white shadow-md'
                      : 'bg-slate-900/60 border-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* AI / ML Models */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
              <Cpu className="h-3.5 w-3.5 text-purple-400" /> AI / ML Component
            </label>
            <div className="grid grid-cols-2 gap-2">
              {aiOptions.map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSelectedAI(opt)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                    selectedAI === opt
                      ? 'bg-purple-600 border-purple-500 text-white shadow-md'
                      : 'bg-slate-900/60 border-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer controls */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-800">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-gray-800 text-xs font-semibold text-gray-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleApplySwaps}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-500/20"
          >
            <CheckCircle2 className="h-4 w-4" /> Recalculate Adaptive Plan
          </button>
        </div>

      </div>
    </div>
  );
}
