import React, { useState } from 'react';
import { Code2, Check, Copy, BookOpen, AlertTriangle, Lightbulb, FileCode, ArrowRight, HelpCircle, RefreshCw, Cpu, Zap } from 'lucide-react';
import { generateModularCodeFiles } from '../../services/codeGenerator';

export default function CodeStudio({ project, onOpenCustomizer, onNext }) {
  const files = generateModularCodeFiles(project);
  const [selectedFileIdx, setSelectedFileIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeAction, setActiveAction] = useState('explain');

  const currentFile = files[selectedFileIdx] || files[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">Step 10: Modular Code Studio</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Step-by-Step Modular Code Generator</h2>
          <p className="text-xs text-gray-400 mt-1">
            Generated modular codebase for {project.title} with 4 interactive educational actions.
          </p>
        </div>
        <button
          onClick={onNext}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-500/20"
        >
          View Testing & Docker Configs <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* File Browser Tabs */}
      <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {files.map((file, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedFileIdx(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-2 border ${
                selectedFileIdx === idx
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                  : 'bg-slate-900/80 border-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              <FileCode className="h-4 w-4" />
              <span>{file.filename}</span>
            </button>
          ))}
        </div>

        <button
          onClick={onOpenCustomizer}
          className="px-3.5 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-semibold flex items-center gap-1.5 shrink-0"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Swap Tech Stack
        </button>
      </div>

      {/* 4 Interactive Educational Action Toolbar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        <button
          onClick={() => setActiveAction('explain')}
          className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeAction === 'explain'
              ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
              : 'bg-slate-900/80 border-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          <BookOpen className="h-4 w-4" /> 1. Explain Logic
        </button>

        <button
          onClick={() => setActiveAction('why')}
          className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeAction === 'why'
              ? 'bg-purple-600 border-purple-500 text-white shadow-md'
              : 'bg-slate-900/80 border-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          <HelpCircle className="h-4 w-4" /> 2. Why This Tech?
        </button>

        <button
          onClick={() => setActiveAction('how')}
          className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeAction === 'how'
              ? 'bg-emerald-600 border-emerald-500 text-white shadow-md'
              : 'bg-slate-900/80 border-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          <Zap className="h-4 w-4" /> 3. How It Works?
        </button>

        <button
          onClick={onOpenCustomizer}
          className="p-3 rounded-xl border border-amber-500/40 bg-amber-950/20 hover:bg-amber-950/40 text-amber-300 text-xs font-bold transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw className="h-4 w-4" /> 4. Modify / Swap Tech
        </button>
      </div>

      {/* Main Code View & Explanation Sidebar Grid */}
      {currentFile && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left 2 Cols: Code Window */}
          <div className="lg:col-span-2 rounded-2xl bg-slate-950 border border-gray-800 overflow-hidden shadow-2xl">
            <div className="px-4 py-3 bg-slate-900 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-gray-400 ml-2">{currentFile.filename}</span>
              </div>
              <button
                onClick={handleCopy}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-gray-300 text-xs rounded font-semibold flex items-center gap-1.5 border border-gray-700 transition-colors"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied Code' : 'Copy Code'}</span>
              </button>
            </div>

            <div className="p-4 overflow-x-auto max-h-[550px]">
              <pre className="text-xs font-mono text-indigo-100 leading-relaxed whitespace-pre">
                {currentFile.code}
              </pre>
            </div>
          </div>

          {/* Right 1 Col: Active Educational Action View */}
          <div className="space-y-4">
            
            {activeAction === 'explain' && (
              <>
                <div className="glass-panel p-4 rounded-xl border border-gray-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1 flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4" /> Purpose & Role
                  </h4>
                  <p className="text-xs text-gray-300">{currentFile.description}</p>
                </div>

                <div className="glass-panel p-4 rounded-xl border border-gray-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-3 flex items-center gap-1.5">
                    <Code2 className="h-4 w-4" /> Line-by-Line Breakdown
                  </h4>
                  <div className="space-y-3">
                    {currentFile.explanations?.map((exp, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-slate-900/80 border border-gray-800">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded">
                            Lines {exp.lines}
                          </span>
                          <span className="text-xs font-bold text-gray-200">{exp.label}</span>
                        </div>
                        <p className="text-[11px] text-gray-400 leading-normal">{exp.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeAction === 'why' && (
              <div className="glass-panel p-5 rounded-2xl border border-purple-500/30 bg-purple-950/20">
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-2 flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-purple-400" /> Why This Technology?
                </h4>
                <p className="text-xs text-gray-200 leading-relaxed mb-4">
                  {currentFile.whyThisTech || `Selected for high productivity, type safety, and seamless integration with ${project.title}.`}
                </p>

                <h5 className="text-[11px] font-bold text-emerald-400 uppercase mb-1">Best Practices</h5>
                <ul className="space-y-1 text-xs text-gray-300">
                  {currentFile.bestPractices?.map((bp, i) => (
                    <li key={i}>• {bp}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeAction === 'how' && (
              <div className="glass-panel p-5 rounded-2xl border border-emerald-500/30 bg-emerald-950/20">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-2 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-emerald-400" /> How It Works Under the Hood
                </h4>
                <p className="text-xs text-gray-200 leading-relaxed mb-4">
                  {currentFile.howItWorks || `Executes asynchronous requests, validates schemas, and updates state without blocking browser main loop.`}
                </p>

                <h5 className="text-[11px] font-bold text-amber-400 uppercase mb-1">Common Pitfalls to Avoid</h5>
                <ul className="space-y-1 text-xs text-gray-300">
                  {currentFile.commonMistakes?.map((cm, i) => (
                    <li key={i}>• {cm}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>

        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-800 mt-8">
        <p className="text-xs text-gray-500">Every line of code is linked directly to your Viva exam questions.</p>
        <button
          onClick={onNext}
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-500/25"
        >
          Testing & Docker Setup <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
