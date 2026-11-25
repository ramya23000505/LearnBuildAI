import React, { useState } from 'react';
import { Layers, FolderTree, Database, Server, ArrowRight, FileText, CheckCircle } from 'lucide-react';
import { generateProjectArchitecture } from '../../services/codeGenerator';

export default function ArchitectureView({ project, onNext }) {
  const arch = generateProjectArchitecture(project);
  const [activeTab, setActiveTab] = useState('structure');

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">Step 9: Architecture Blueprint</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">System Architecture & Folder Design</h2>
          <p className="text-xs text-gray-400 mt-1">Generated specifically for {project.title}.</p>
        </div>
        <button
          onClick={onNext}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-500/20"
        >
          Open Modular Code Studio <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-800 pb-3 mb-6 overflow-x-auto no-scrollbar">
        {[
          { id: 'structure', label: 'Folder Tree Structure', icon: FolderTree },
          { id: 'er', label: 'Database ER Schema', icon: Database },
          { id: 'api', label: 'REST API Specs', icon: Server }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                activeTab === tab.id
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                  : 'bg-slate-900/80 border-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Tab Content */}
      {activeTab === 'structure' && (
        <div className="space-y-6">
          {/* Problem & Objectives */}
          <div className="glass-panel rounded-2xl p-6 border border-gray-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">Problem Statement</h3>
            <p className="text-xs text-gray-300 leading-relaxed">{arch.problemStatement}</p>
            
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mt-4 mb-2">Key Engineering Objectives</h4>
            <ul className="space-y-1.5">
              {arch.objectives.map((obj, idx) => (
                <li key={idx} className="text-xs text-gray-300 flex items-center gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Folder Tree Code view */}
          <div className="glass-panel rounded-2xl p-6 border border-gray-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-3 flex items-center gap-2">
              <FolderTree className="h-4 w-4" /> Modular Project Folder Tree Structure
            </h3>
            <pre className="p-4 rounded-xl bg-slate-950 border border-gray-800 text-xs font-mono text-indigo-300 overflow-x-auto">
              {arch.folderStructure}
            </pre>
          </div>
        </div>
      )}

      {activeTab === 'er' && (
        <div className="glass-panel rounded-2xl p-6 border border-gray-800 space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4 flex items-center gap-2">
            <Database className="h-4 w-4" /> Entity-Relationship (ER) Schema Tables
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {arch.erDiagram.map((tbl, idx) => (
              <div key={idx} className="rounded-xl bg-slate-950 border border-gray-800 p-4">
                <div className="px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold text-xs mb-3 border border-indigo-500/30">
                  Table: {tbl.table}
                </div>
                <ul className="space-y-1.5 text-xs text-gray-300 font-mono">
                  {tbl.columns.map((col, cIdx) => (
                    <li key={cIdx} className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                      <span>{col}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'api' && (
        <div className="glass-panel rounded-2xl p-6 border border-gray-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4 flex items-center gap-2">
            <Server className="h-4 w-4" /> REST API Endpoint Specification Matrix
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-gray-400 uppercase font-mono">
                <tr>
                  <th className="p-3">Method</th>
                  <th className="p-3">Endpoint Path</th>
                  <th className="p-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {arch.apiEndpoints.map((ep, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/50">
                    <td className="p-3 font-mono font-bold text-indigo-400">{ep.method}</td>
                    <td className="p-3 font-mono text-gray-200">{ep.path}</td>
                    <td className="p-3 text-gray-400">{ep.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-800 mt-8">
        <p className="text-xs text-gray-500">Architecture design matches production standards.</p>
        <button
          onClick={onNext}
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-500/25"
        >
          Open Step-by-Step Code Studio <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
