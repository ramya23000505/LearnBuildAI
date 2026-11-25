import React from 'react';
import { CheckCircle2, ShieldCheck, ArrowRight, RefreshCw, Award } from 'lucide-react';

export default function KnowledgeVerification({ project, completedModules = [], onNext }) {
  const allModules = ['FastAPI', 'LangChain & Vector DB', 'React', 'Docker'];
  const safeCompleted = completedModules || [];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-400">Step 7: Knowledge Verification</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Module Verification Status</h2>
          <p className="text-xs text-gray-400 mt-1">Verify practical exercise completions for {project?.title}.</p>
        </div>
        <button
          onClick={onNext}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-500/20"
        >
          View Project Readiness Score <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Verification Matrix Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {allModules.map((mod, idx) => {
          const isDone = safeCompleted.includes(mod);
          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl border transition-all ${
                isDone
                  ? 'bg-emerald-950/20 border-emerald-500/40 shadow-lg shadow-emerald-500/10'
                  : 'bg-slate-900/60 border-gray-800'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-white">{mod}</h3>
                <span className={`px-2 py-0.5 text-[10px] rounded font-mono font-bold ${
                  isDone ? 'bg-emerald-500/20 text-emerald-300' : 'bg-gray-800 text-gray-400'
                }`}>
                  {isDone ? 'VERIFIED PASSED' : 'PENDING EXERCISE'}
                </span>
              </div>
              <p className="text-xs text-gray-400">
                {isDone
                  ? 'Practical exercise and short notes verification completed successfully.'
                  : 'Complete mini coding challenge in Step 6 to verify this technology module.'}
              </p>
            </div>
          );
        })}
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-gray-800 text-center">
        <h4 className="text-sm font-bold text-white mb-2">Verification Progress Summary</h4>
        <p className="text-xs text-gray-400 mb-4">
          {safeCompleted.length} of {allModules.length} essential tech modules verified.
        </p>
        <button
          onClick={onNext}
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-bold text-sm inline-flex items-center gap-2 shadow-lg shadow-indigo-500/25"
        >
          Calculate Project Readiness Score <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
