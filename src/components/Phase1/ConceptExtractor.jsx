import React from 'react';
import { CheckCircle2, XCircle, Sparkles, Zap, ArrowRight, BookOpen, Clock } from 'lucide-react';

export default function ConceptExtractor({ project, onNext }) {
  if (!project) return null;

  const essentialList = project.essentialConcepts || [];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-fadeIn">
      {/* Top Banner Innovation Highlight */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/60 border border-emerald-500/30 mb-8 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
            <Zap className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-white">Minimum Essential Concept Extraction Engine</h3>
              <span className="px-2 py-0.5 text-[10px] bg-emerald-500/20 text-emerald-300 rounded font-mono font-bold">
                Key Platform Innovation
              </span>
            </div>
            <p className="text-xs text-gray-300 mt-0.5">
              Instead of 40-hour lengthy courses, we filtered out non-essential topics to save you ~65% learning time!
            </p>
          </div>
        </div>
        <div className="hidden sm:block text-right">
          <span className="text-2xl font-black text-emerald-400">~65%</span>
          <p className="text-[10px] text-gray-400 uppercase font-semibold">Time Saved</p>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-400">Step 3: Essential Concept Extraction</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Project Concept Filter Matrix</h2>
          <p className="text-xs text-gray-400 mt-1">Learn only what you need for {project.title}.</p>
        </div>
        <button
          onClick={onNext}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-500/20"
        >
          Start Knowledge Diagnostic <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Must Learn vs Skipped Matrix Cards */}
      <div className="space-y-6 mb-8">
        {essentialList.map((item, idx) => (
          <div key={idx} className="glass-panel rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                <h3 className="text-base font-bold text-white">{item.tech}</h3>
              </div>
              <span className="text-xs text-gray-400 font-mono">
                {item.mustLearn.length} Must-Learn Concepts
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Must Learn Side */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                    MUST LEARN (Essential for this Project)
                  </h4>
                </div>
                <ul className="space-y-2">
                  {item.mustLearn.map((m, mIdx) => (
                    <li key={mIdx} className="text-xs text-gray-200 flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skipped Side */}
              <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
                <div className="flex items-center gap-2 mb-3">
                  <XCircle className="h-4 w-4 text-gray-500 shrink-0" />
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    SKIPPED FOR NOW (Not Required)
                  </h4>
                </div>
                <ul className="space-y-2">
                  {item.skipped.map((s, sIdx) => (
                    <li key={sIdx} className="text-xs text-gray-500 flex items-start gap-2 line-through decoration-gray-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-gray-600 mt-1.5 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <p className="text-xs text-gray-400">
          Next: Take a quick 3-minute diagnostic test to assess your baseline knowledge.
        </p>
        <button
          onClick={onNext}
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-500/25"
        >
          Begin Baseline Diagnostic <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
