import React, { useState } from 'react';
import { Box, Server, CheckCircle2, ArrowRight, ShieldCheck, Terminal, Copy, Check } from 'lucide-react';
import { generateTestingAndDeployment } from '../../services/codeGenerator';

export default function TestDeployCenter({ project, onNext }) {
  const configs = generateTestingAndDeployment(project);
  const [activeTab, setActiveTab] = useState('docker');
  const [copiedTab, setCopiedTab] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(true);
    setTimeout(() => setCopiedTab(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">Step 11: Testing & Deployment</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Testing & Containerization Studio</h2>
          <p className="text-xs text-gray-400 mt-1">
            Automated unit tests, Docker Compose setup, and cloud deployment guides for {project.title}.
          </p>
        </div>
        <button
          onClick={onNext}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-500/20"
        >
          Generate SRS & Documentation <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-800 pb-3 mb-6 overflow-x-auto no-scrollbar">
        {[
          { id: 'docker', label: 'Dockerfile & Compose', icon: Box },
          { id: 'tests', label: 'PyTest Unit Tests', icon: ShieldCheck },
          { id: 'cloud', label: 'Cloud Deployment Steps', icon: Server }
        ].map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                activeTab === t.id
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                  : 'bg-slate-900/80 border-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      {activeTab === 'docker' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-slate-950 border border-gray-800 p-4">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-800">
              <span className="text-xs font-bold text-gray-300 font-mono">Dockerfile (Backend)</span>
              <button
                onClick={() => handleCopy(configs.dockerfile)}
                className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
              >
                <Copy className="h-3.5 w-3.5" /> Copy
              </button>
            </div>
            <pre className="text-xs font-mono text-indigo-300 overflow-x-auto">{configs.dockerfile}</pre>
          </div>

          <div className="rounded-2xl bg-slate-950 border border-gray-800 p-4">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-800">
              <span className="text-xs font-bold text-gray-300 font-mono">docker-compose.yml</span>
              <button
                onClick={() => handleCopy(configs.dockerCompose)}
                className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
              >
                <Copy className="h-3.5 w-3.5" /> Copy
              </button>
            </div>
            <pre className="text-xs font-mono text-purple-300 overflow-x-auto">{configs.dockerCompose}</pre>
          </div>
        </div>
      )}

      {activeTab === 'tests' && (
        <div className="rounded-2xl bg-slate-950 border border-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" /> PyTest Unit Coverage Suite (`test_main.py`)
            </h3>
            <button
              onClick={() => handleCopy(configs.unitTestCode)}
              className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
            >
              <Copy className="h-3.5 w-3.5" /> Copy Test Suite
            </button>
          </div>
          <pre className="text-xs font-mono text-emerald-300 overflow-x-auto">{configs.unitTestCode}</pre>
        </div>
      )}

      {activeTab === 'cloud' && (
        <div className="glass-panel rounded-2xl p-6 border border-gray-800 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
            <Terminal className="h-4 w-4" /> Recommended Production Deployment Commands
          </h3>

          <div className="space-y-3">
            {configs.deploymentGuide.map((g, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-gray-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-gray-200">{g.step}</h4>
                  <p className="text-xs font-mono text-indigo-300 mt-1">{g.command}</p>
                </div>
                <button
                  onClick={() => handleCopy(g.command)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-gray-300 hover:text-white border border-gray-700"
                >
                  Copy Command
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-800 mt-8">
        <p className="text-xs text-gray-500">Container configurations ready for local testing & cloud deployment.</p>
        <button
          onClick={onNext}
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-500/25"
        >
          Generate SRS & PPT Deck <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
