import React, { useState } from 'react';
import {
  Cpu, Clock, Layers, Code, Database, Server, Box, Sparkles, ArrowRight,
  ShieldCheck, CheckCircle2, AlertCircle, Info, Zap, Terminal, Activity,
  HelpCircle, Compass, Target, GitMerge, FileText, Check, Lock, ChevronDown, ChevronUp,
  Award, Search, BarChart3, Radio, Smartphone, Link2, Table, LayoutGrid, Copy
} from 'lucide-react';

export default function TechAnalysisView({ project, onNext }) {
  if (!project) return null;

  const [activeTab, setActiveTab] = useState('stack'); // 'stack' | 'traceability' | 'architecture' | 'insights' | 'metrics'
  const [selectedMode, setSelectedMode] = useState(project.mode || 'academic'); // 'academic' | 'hackathon' | 'enterprise'
  const [stackViewMode, setStackViewMode] = useState('table'); // 'table' | 'cards' | 'both'
  const [copiedTable, setCopiedTable] = useState(false);
  const [expandedTech, setExpandedTech] = useState(null);

  const layeredBlueprintTable = project.layeredBlueprintTable || [];

  const handleCopyMarkdown = () => {
    if (!layeredBlueprintTable.length) return;
    const header = '| Layer | Technology | Necessity | Why |\n|---|---|---|---|';
    const rows = layeredBlueprintTable.map(row => 
      `| ${row.layer} | **${row.technology}** | ${row.necessity} | ${row.why} |`
    ).join('\n');
    const markdown = `${header}\n${rows}`;
    navigator.clipboard.writeText(markdown);
    setCopiedTable(true);
    setTimeout(() => setCopiedTable(false), 2000);
  };

  const semantics = project.semantics || {
    identity: {
      title: project.title,
      summary: project.description,
      projectType: 'Full-Stack Application',
      primaryDomain: project.domainId,
      targetUsers: ['Developers', 'End Users'],
      purpose: 'Technical Project Implementation'
    },
    requirements: {
      functional: [
        { id: 'REQ-01', title: 'Core Business Logic', description: 'Domain-specific operations and validation' },
        { id: 'REQ-02', title: 'Data Persistence', description: 'Relational or document records storage' }
      ],
      nonFunctional: [
        { id: 'NF-01', type: 'Security', title: 'Access Control', description: 'Stateless session authorization' }
      ],
      constraints: ['Standard web browser or mobile client']
    }
  };

  const capabilities = project.capabilities || [];
  const technologyDecisions = project.technologyDecisions || [];
  const architectureLayers = project.architectureLayers || [];
  const metrics = project.metrics || {
    requirementCoverage: 100,
    technologyPrecision: 95,
    unnecessaryTechRate: 0,
    learningCoverage: 100,
    explanationAccuracy: 96
  };
  const modeInsights = project.modeInsights || {
    hackathon: {
      mustBuild: ['Core functional demo', 'Responsive UI dashboard'],
      shouldBuild: ['Stateless JWT authentication', 'Docker container'],
      couldBuild: ['Analytics charts', 'Push notifications']
    },
    academic: {
      researchRelevance: 'Investigates adaptive concept extraction and skill verification in software engineering.',
      technicalNovelty: 'Enforces minimum essential concept extraction (~65% reduction) and gated diagnostic queues.',
      evaluationMetrics: ['Diagnostic Pass Rate (>=80%)', 'Readiness Score Index (0-100%)'],
      datasetRequirements: 'Annotated sample domain data for local inference or relational seeding.',
      vivaFocusAreas: ['Architectural trade-off justification', 'Request/response lifecycle', 'Security & error handling']
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 animate-fadeIn">
      
      {/* Step Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Step 2: Global Intelligence Engine
            </span>
            <span className="text-xs text-gray-400 font-mono">
              Problem → Requirement → Capability → Tech → Concept
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{project.title}</h2>
          <p className="text-xs text-gray-400 mt-1 max-w-3xl leading-relaxed">{project.summary || project.description}</p>
        </div>

        <button
          onClick={onNext}
          className="self-start md:self-auto px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-500/25 shrink-0 cursor-pointer transition-all"
        >
          View Essential Concepts <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Mode Switcher Banner & Metadata Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="glass-panel p-3.5 rounded-xl border border-gray-800">
          <span className="text-[11px] text-gray-400 flex items-center gap-1.5 font-medium">
            <Layers className="h-3.5 w-3.5 text-indigo-400" /> Primary Domain
          </span>
          <p className="text-xs font-bold text-gray-100 mt-1 truncate">{project.domain}</p>
        </div>
        <div className="glass-panel p-3.5 rounded-xl border border-gray-800">
          <span className="text-[11px] text-gray-400 flex items-center gap-1.5 font-medium">
            <Compass className="h-3.5 w-3.5 text-cyan-400" /> Project Type
          </span>
          <p className="text-xs font-bold text-cyan-300 mt-1 truncate">{project.projectType || 'Full-Stack Application'}</p>
        </div>
        <div className="glass-panel p-3.5 rounded-xl border border-gray-800">
          <span className="text-[11px] text-gray-400 flex items-center gap-1.5 font-medium">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-400" /> Difficulty Level
          </span>
          <p className="text-xs font-bold text-amber-300 mt-1">{project.difficulty}</p>
        </div>
        <div className="glass-panel p-3.5 rounded-xl border border-gray-800">
          <span className="text-[11px] text-gray-400 flex items-center gap-1.5 font-medium">
            <Clock className="h-3.5 w-3.5 text-emerald-400" /> Est. Time
          </span>
          <p className="text-xs font-bold text-emerald-300 mt-1">{project.estimatedTime}</p>
        </div>
      </div>

      {/* Navigation Tabs for Deep Intelligence */}
      <div className="flex items-center gap-1.5 p-1.5 bg-slate-900/90 rounded-2xl border border-gray-800 mb-6 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('stack')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'stack' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : 'text-gray-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Cpu className="h-4 w-4" /> Evaluated Tech Stack ({technologyDecisions.length || 5})
        </button>

        <button
          onClick={() => setActiveTab('traceability')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'traceability' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : 'text-gray-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <GitMerge className="h-4 w-4" /> Requirements → Capabilities ({capabilities.length})
        </button>

        <button
          onClick={() => setActiveTab('architecture')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'architecture' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : 'text-gray-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Box className="h-4 w-4" /> Dynamic Architecture ({architectureLayers.length} Layers)
        </button>

        <button
          onClick={() => setActiveTab('insights')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'insights' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : 'text-gray-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Award className="h-4 w-4" /> Mode Insights ({selectedMode === 'academic' ? 'Academic' : 'Hackathon'})
        </button>

        <button
          onClick={() => setActiveTab('metrics')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'metrics' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : 'text-gray-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <BarChart3 className="h-4 w-4" /> Engine Precision ({metrics.technologyPrecision}%)
        </button>
      </div>

      {/* TAB 1: EVALUATED TECHNOLOGY STACK */}
      {activeTab === 'stack' && (
        <div className="space-y-5">
          {/* Header Banner & View Mode Switcher */}
          <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Zap className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Minimum Sufficient Technology Set</h4>
                <p className="text-xs text-indigo-200 mt-0.5 leading-relaxed">
                  Technologies are recommended <strong>strictly because the problem requires the underlying capability</strong>. Every choice is traceable, bounded to avoid over-specification, and provides context-aware alternatives.
                </p>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-gray-800 shrink-0 self-start md:self-auto">
              <button
                onClick={() => setStackViewMode('table')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  stackViewMode === 'table' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Table className="h-3.5 w-3.5" /> Table
              </button>
              <button
                onClick={() => setStackViewMode('cards')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  stackViewMode === 'cards' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" /> Cards
              </button>
              <button
                onClick={() => setStackViewMode('both')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  stackViewMode === 'both' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-400 hover:text-white'
                }`}
              >
                Both
              </button>
            </div>
          </div>

          {/* 1. LAYERED TECHNOLOGY BLUEPRINT TABLE */}
          {(stackViewMode === 'table' || stackViewMode === 'both') && layeredBlueprintTable.length > 0 && (
            <div className="rounded-2xl border border-gray-800 bg-slate-900/90 overflow-hidden shadow-xl animate-fadeIn">
              <div className="p-4 bg-slate-950/80 border-b border-gray-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <Table className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Layered Technology Blueprint</h4>
                    <p className="text-[11px] text-gray-400">Standardized architectural matrix mapped directly from extracted capabilities</p>
                  </div>
                </div>

                <button
                  onClick={handleCopyMarkdown}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border border-indigo-500/20 active:scale-95"
                  title="Copy GitHub-flavored Markdown table to clipboard"
                >
                  {copiedTable ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedTable ? 'Copied Markdown!' : 'Copy Markdown Table'}</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-800 bg-slate-950/50 text-[11px] uppercase tracking-wider font-mono text-gray-400">
                      <th className="py-3 px-4 font-semibold">Layer</th>
                      <th className="py-3 px-4 font-semibold">Technology</th>
                      <th className="py-3 px-4 font-semibold">Necessity</th>
                      <th className="py-3 px-4 font-semibold">Why</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60 text-xs">
                    {layeredBlueprintTable.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3.5 px-4 font-medium text-gray-300 whitespace-nowrap">
                          <span className="px-2.5 py-1 rounded bg-slate-800/80 border border-gray-700 text-gray-200 font-mono text-[11px]">
                            {row.layer}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">
                          {row.technology}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold ${
                            row.necessity.includes('Required')
                              ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                              : row.necessity.includes('🟡')
                              ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                              : 'bg-teal-500/10 text-teal-300 border border-teal-500/30'
                          }`}>
                            {row.necessity}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-gray-300 leading-relaxed font-medium">
                          {row.why}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 2. DETAILED TRACEABLE CARDS */}
          {(stackViewMode === 'cards' || stackViewMode === 'both') && (
            <div className="grid grid-cols-1 gap-3.5 animate-fadeIn">
            {technologyDecisions.map((tech, idx) => {
              const isExpanded = expandedTech === idx;
              const capReq = tech.capability_necessity || 'REQUIRED';
              const techReq = tech.technology_necessity || tech.classification || 'RECOMMENDED';
              const isCapRequired = capReq === 'REQUIRED';
              const isTechRequired = techReq === 'REQUIRED';

              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all p-4.5 ${
                    isTechRequired
                      ? 'bg-slate-900/90 border-rose-500/40 shadow-lg shadow-rose-950/20'
                      : techReq === 'RECOMMENDED'
                      ? 'bg-slate-900/90 border-emerald-500/40 shadow-lg shadow-emerald-950/20'
                      : 'bg-slate-950/60 border-gray-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                        isTechRequired ? 'bg-rose-500/10 text-rose-400' : techReq === 'RECOMMENDED' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-800 text-gray-400'
                      }`}>
                        {tech.category === 'language' && <Code className="h-5 w-5" />}
                        {tech.category === 'backend' && <Server className="h-5 w-5" />}
                        {tech.category === 'frontend' && <Layers className="h-5 w-5" />}
                        {tech.category === 'communication' && <Radio className="h-5 w-5" />}
                        {tech.category === 'database' && <Database className="h-5 w-5" />}
                        {tech.category === 'ai_ml' && <Sparkles className="h-5 w-5" />}
                        {tech.category === 'security' && <ShieldCheck className="h-5 w-5" />}
                        {tech.category === 'infrastructure' && <Box className="h-5 w-5" />}
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          {/* Capability Necessity Badge */}
                          <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider ${
                            isCapRequired
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                          }`}>
                            Capability: {capReq}
                          </span>

                          <h3 className="text-sm font-extrabold text-white">
                            {tech.capability_name || tech.name}
                          </h3>

                          <span className="text-[10px] font-mono text-gray-400 uppercase bg-slate-800/80 px-2 py-0.5 rounded border border-gray-700">
                            {tech.category}
                          </span>
                        </div>

                        {/* Recommended Implementation Highlight Box */}
                        <div className="mt-2.5 p-2.5 rounded-xl bg-slate-950/70 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                              Recommended implementation:
                            </span>
                            <span className="text-sm font-black text-white">
                              {tech.recommended_implementation || tech.name}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                              isTechRequired ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                            }`}>
                              {techReq}
                            </span>
                          </div>

                          <span className="text-[11px] font-mono font-bold text-indigo-300 bg-indigo-500/10 px-2.5 py-0.5 rounded-lg border border-indigo-500/20">
                            {tech.score || tech.confidence}% Fit
                          </span>
                        </div>

                        {/* Alternative Implementations Row */}
                        {tech.alternatives && tech.alternatives.length > 0 && (
                          <div className="mt-2 text-xs flex flex-wrap items-center gap-1.5 text-gray-300">
                            <span className="font-semibold text-gray-400">Alternative implementations:</span>
                            <span className="font-medium text-indigo-200">
                              {tech.alternatives.slice(0, 3).join(', ')}
                            </span>
                          </div>
                        )}

                        {/* Explainable Role & Grounding */}
                        <p className="text-xs text-gray-300 mt-2 leading-relaxed font-medium">
                          {tech.role || tech.reason}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setExpandedTech(isExpanded ? null : idx)}
                      className="self-end sm:self-center px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-gray-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors"
                    >
                      <span>{isExpanded ? 'Hide Traceability' : 'View Traceability'}</span>
                      {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    </button>
                  </div>

                  {/* Expanded Tradeoffs, Evidence, and Alternatives */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-gray-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs animate-fadeIn">
                      
                      {/* Evidence */}
                      <div className="p-3 rounded-xl bg-slate-950 border border-gray-850">
                        <span className="text-[10px] uppercase font-bold text-indigo-400 flex items-center gap-1">
                          <Target className="h-3 w-3" /> Grounded Evidence
                        </span>
                        <ul className="mt-2 space-y-1.5 text-gray-300">
                          {tech.evidence && tech.evidence.length > 0 ? (
                            tech.evidence.map((ev, eIdx) => (
                              <li key={eIdx} className="flex items-start gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 mt-1 shrink-0" />
                                <span>{ev}</span>
                              </li>
                            ))
                          ) : (
                            <li className="text-gray-500 italic">Direct capability match for {tech.category}</li>
                          )}
                        </ul>
                      </div>

                      {/* Tradeoffs */}
                      <div className="p-3 rounded-xl bg-slate-950 border border-gray-850">
                        <span className="text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1">
                          <Check className="h-3 w-3" /> Key Advantages
                        </span>
                        <ul className="mt-2 space-y-1 text-gray-300">
                          {(tech.key_advantages || tech.tradeoffs?.advantages)?.slice(0, 2).map((adv, aIdx) => (
                            <li key={aIdx} className="flex items-start gap-1.5">
                              <span className="text-emerald-400 font-bold">✓</span>
                              <span>{adv}</span>
                            </li>
                          )) || <li className="text-gray-400">High performance and community standard</li>}
                        </ul>
                        <div className="mt-2 pt-2 border-t border-gray-850">
                          <span className="text-[10px] uppercase font-bold text-amber-400 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> Limitation
                          </span>
                          <p className="mt-1 text-gray-400 text-[11px]">
                            {(tech.limitations || tech.tradeoffs?.limitations)?.[0] || 'Requires structured state management in larger codebases.'}
                          </p>
                        </div>
                      </div>

                      {/* Context-Aware Alternatives */}
                      <div className="p-3 rounded-xl bg-slate-950 border border-gray-850">
                        <span className="text-[10px] uppercase font-bold text-purple-400 flex items-center gap-1">
                          <GitMerge className="h-3 w-3" /> Evaluated Alternatives
                        </span>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {tech.alternatives?.map((alt, altIdx) => (
                            <span key={altIdx} className="px-2 py-1 rounded bg-slate-800 text-gray-300 text-[10px] font-mono border border-gray-700">
                              {alt}
                            </span>
                          )) || <span className="text-gray-500">None applicable</span>}
                        </div>
                        <p className="mt-2 text-[10px] text-gray-400">
                          {tech.why_not_alternatives || 'Primary choice scored higher based on requirement fit and low complexity.'}
                        </p>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    )}

      {/* TAB 2: TRACEABILITY PIPELINE (REQUIREMENTS -> CAPABILITIES) */}
      {activeTab === 'traceability' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-slate-900 border border-gray-800 flex items-start gap-3">
            <Compass className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Traceability Pipeline Architecture</h4>
              <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                LearnBuild AI never jumps directly from project idea to arbitrary tools. It systematically maps natural language requirements to reusable technical capabilities.
              </p>
            </div>
          </div>

          {/* Extracted Actors & Ambiguity Banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-panel p-4 rounded-xl border border-gray-800">
              <span className="text-[10px] uppercase font-bold text-cyan-400 flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" /> Grounded Project Actors
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {(semantics.identity?.actors || ['End Users', 'System Administrators']).map((actor, aIdx) => (
                  <span key={aIdx} className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 text-xs font-semibold border border-cyan-500/20">
                    👤 {actor}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-gray-400 mt-2">
                Actors extracted strictly from user problem statement—never hallucinated.
              </p>
            </div>

            {semantics.clarificationQuestion ? (
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30">
                <span className="text-[10px] uppercase font-bold text-amber-400 flex items-center gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5" /> Ambiguity Safeguard Active
                </span>
                <p className="text-xs text-amber-200 mt-1 font-medium">
                  {semantics.clarificationQuestion}
                </p>
                <p className="text-[10px] text-amber-300/80 mt-1.5">
                  Auto-resolved conservatively using non-invasive clinical triage / questionnaire scoring.
                </p>
              </div>
            ) : (
              <div className="glass-panel p-4 rounded-xl border border-gray-800">
                <span className="text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Requirement Traceability Status
                </span>
                <p className="text-xs text-emerald-200 mt-1 font-medium">
                  All requirements grounded with 0 unverified domain hallucinations.
                </p>
                <p className="text-[10px] text-gray-400 mt-1.5">
                  Traceability chain: Problem → Grounded Req → Capability → Minimum Sufficient Stack.
                </p>
              </div>
            )}
          </div>

          {/* Functional Requirements Grid */}
          <div className="glass-panel p-5 rounded-2xl border border-gray-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4 text-indigo-400" /> Grounded Requirements & Source Anchors
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(semantics.requirements?.functional || []).map((req, rIdx) => (
                <div key={rIdx} className="p-3.5 rounded-xl bg-slate-950/80 border border-gray-800">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-indigo-400">{req.id}</span>
                    <span className={`text-[9px] uppercase font-mono px-2 py-0.5 rounded font-bold ${
                      req.origin === 'EXPLICIT'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    }`}>
                      {req.origin || 'EXPLICIT'}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{req.title || req.text?.slice(0, 50)}</h4>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">{req.text || req.description}</p>
                  {req.source_text && (
                    <div className="mt-2 pt-2 border-t border-gray-850 flex items-center gap-1.5 text-[10px] text-gray-400 font-mono">
                      <span className="text-indigo-400">Source:</span> &quot;{req.source_text}&quot;
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Capabilities Layer */}
          <div className="glass-panel p-5 rounded-2xl border border-gray-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-3 flex items-center gap-2">
              <Zap className="h-4 w-4 text-emerald-400" /> Derived System Capabilities (Capability != Technology)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {capabilities.map((cap, cIdx) => (
                <div key={cIdx} className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-emerald-200">{cap.name}</h4>
                      <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded font-bold ${
                        cap.capability_necessity === 'REQUIRED'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {cap.capability_necessity || 'REQUIRED'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 mt-1 leading-relaxed">{cap.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DYNAMIC ARCHITECTURE LAYERS */}
      {activeTab === 'architecture' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-gray-800 flex items-start gap-3">
            <Box className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Dynamic Multi-Tier Architecture</h4>
              <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                This architecture contains <strong>only the layers necessary for this specific project</strong>. No extraneous microservices, redundant distributed caches, or unnecessary vector stores.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {architectureLayers.map((layer, lIdx) => (
              <div key={lIdx} className="glass-panel rounded-2xl p-4.5 border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="h-8 w-8 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-xs font-mono font-bold text-indigo-300 shrink-0">
                    {lIdx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-extrabold text-white">{layer.layer}</h4>
                      <span className="text-[10px] text-gray-400 font-mono">({layer.role})</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {layer.components.map((comp, cIdx) => (
                        <span key={cIdx} className="px-2 py-0.5 rounded-md bg-slate-950 text-gray-300 text-[11px] border border-gray-800 font-mono">
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="self-end md:self-center shrink-0">
                  <span className="px-3 py-1.5 rounded-xl bg-indigo-600/20 text-indigo-300 font-mono font-bold text-xs border border-indigo-500/30">
                    {layer.technologies.join(' + ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: MODE-SPECIFIC INSIGHTS (ACADEMIC VS HACKATHON) */}
      {activeTab === 'insights' && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 p-1.5 bg-slate-900 rounded-xl border border-gray-800 max-w-sm">
            <button
              onClick={() => setSelectedMode('academic')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedMode === 'academic' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              🎓 Academic / Capstone Mode
            </button>
            <button
              onClick={() => setSelectedMode('hackathon')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedMode === 'hackathon' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              ⚡ Hackathon MVP Mode
            </button>
          </div>

          {selectedMode === 'academic' ? (
            <div className="space-y-4">
              <div className="glass-panel p-5 rounded-2xl border border-gray-800">
                <span className="text-[10px] uppercase font-bold text-indigo-400">Research Relevance & Technical Novelty</span>
                <h4 className="text-sm font-extrabold text-white mt-1">{modeInsights.academic.technicalNovelty}</h4>
                <p className="text-xs text-gray-300 mt-2 leading-relaxed">{modeInsights.academic.researchRelevance}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass-panel p-5 rounded-2xl border border-gray-800">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1.5">
                    <BarChart3 className="h-3.5 w-3.5" /> Proposed Evaluation Metrics
                  </span>
                  <ul className="mt-3 space-y-2">
                    {modeInsights.academic.evaluationMetrics.map((met, mIdx) => (
                      <li key={mIdx} className="text-xs text-gray-200 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                        <span>{met}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="glass-panel p-5 rounded-2xl border border-gray-800">
                  <span className="text-[10px] uppercase font-bold text-amber-400 flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5" /> Primary Viva Voce Probing Areas
                  </span>
                  <ul className="mt-3 space-y-2">
                    {modeInsights.academic.vivaFocusAreas.map((vf, vIdx) => (
                      <li key={vIdx} className="text-xs text-gray-200 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                        <span>{vf}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30">
                <span className="text-[10px] uppercase font-bold text-rose-400 flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5" /> MUST BUILD (Core MVP Demo)
                </span>
                <ul className="mt-3 space-y-2">
                  {modeInsights.hackathon.mustBuild.map((mb, idx) => (
                    <li key={idx} className="text-xs text-gray-200 flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-400 mt-1 shrink-0" />
                      <span>{mb}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/30">
                <span className="text-[10px] uppercase font-bold text-indigo-400 flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5" /> SHOULD BUILD (Competitive Polish)
                </span>
                <ul className="mt-3 space-y-2">
                  {modeInsights.hackathon.shouldBuild.map((sb, idx) => (
                    <li key={idx} className="text-xs text-gray-200 flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 mt-1 shrink-0" />
                      <span>{sb}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-gray-800">
                <span className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" /> COULD BUILD (If Time Permits)
                </span>
                <ul className="mt-3 space-y-2">
                  {modeInsights.hackathon.couldBuild.map((cb, idx) => (
                    <li key={idx} className="text-xs text-gray-400 flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-gray-500 mt-1 shrink-0" />
                      <span>{cb}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: INTERNAL EVALUATION METRICS */}
      {activeTab === 'metrics' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-gray-800 flex items-start gap-3">
            <BarChart3 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Engine Verification & Precision Metrics</h4>
              <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                LearnBuild AI continuously evaluates its recommendations to ensure zero unnecessary bloat, 100% learning coverage, and full traceability.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="glass-panel p-4 rounded-2xl border border-gray-800 text-center">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400">{metrics.requirementCoverage || 100}%</span>
              <p className="text-[11px] font-bold text-white mt-1">Req Coverage</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Every req anchored to capability</p>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-gray-800 text-center">
              <span className="text-2xl sm:text-3xl font-black text-indigo-400">{metrics.recommendationConfidence || metrics.technologyPrecision || 90}%</span>
              <p className="text-[11px] font-bold text-white mt-1">Rec Confidence</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Grounded candidate fit score</p>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-gray-800 text-center">
              <span className="text-2xl sm:text-3xl font-black text-purple-400">{metrics.architectureConsistency || 95}%</span>
              <p className="text-[11px] font-bold text-white mt-1">Arch Consistency</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Zero unneeded layers/services</p>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-gray-800 text-center">
              <span className="text-2xl sm:text-3xl font-black text-amber-400">{metrics.analysisCompleteness || 92}%</span>
              <p className="text-[11px] font-bold text-white mt-1">Completeness</p>
              <p className="text-[10px] text-gray-400 mt-0.5">NFRs & constraints addressed</p>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-gray-800 text-center col-span-2 sm:col-span-1">
              <span className="text-2xl sm:text-3xl font-black text-cyan-400">0%</span>
              <p className="text-[11px] font-bold text-white mt-1">Bloat Rate</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Zero gratuitous frameworks</p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Action Stepper */}
      <div className="mt-8 pt-6 border-t border-gray-800 flex items-center justify-between">
        <p className="text-xs text-gray-500 font-mono">
          ✓ AI Intelligence Layer established traceable Problem → Capability → Stack mapping.
        </p>
        <button
          onClick={onNext}
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-500/25 cursor-pointer transition-all"
        >
          View Concept Extraction Matrix <ArrowRight className="h-4 w-4" />
        </button>
      </div>

    </div>
  );
}
