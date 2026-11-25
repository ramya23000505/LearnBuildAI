import React, { useState } from 'react';
import { FileText, Download, Copy, Check, Presentation, BookOpen, ArrowRight } from 'lucide-react';
import { generateDocumentation } from '../../services/codeGenerator';

export default function DocGenerator({ project, onNext }) {
  const docs = generateDocumentation(project);
  const [activeTab, setActiveTab] = useState('srs');
  const [copied, setCopied] = useState(false);

  const getContentToCopy = () => {
    if (activeTab === 'srs') return docs.srsDocument;
    if (activeTab === 'readme') return docs.readmeMarkdown;
    return JSON.stringify(docs.pptOutline, null, 2);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getContentToCopy());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([getContentToCopy()], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${project.id}-${activeTab}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">Step 12: Documentation & PPT</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Automated Project Documentation</h2>
          <p className="text-xs text-gray-400 mt-1">One-click SRS, README, and PPT slides outline generator for {project.title}.</p>
        </div>
        <button
          onClick={onNext}
          className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-500/20"
        >
          Enter Virtual AI Viva Examiner <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-800 pb-3 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto">
          {[
            { id: 'srs', label: 'SRS Document', icon: FileText },
            { id: 'readme', label: 'README.md', icon: BookOpen },
            { id: 'ppt', label: 'PPT Deck Outline', icon: Presentation }
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

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-gray-800 text-xs font-semibold text-gray-200 flex items-center gap-1.5"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? 'Copied Document' : 'Copy'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white flex items-center gap-1.5 shadow-md shadow-indigo-500/20"
          >
            <Download className="h-4 w-4" /> Download Markdown
          </button>
        </div>
      </div>

      {/* Main Document Content Preview */}
      {activeTab === 'srs' && (
        <div className="glass-panel rounded-2xl p-6 border border-gray-800">
          <pre className="text-xs font-mono text-gray-200 leading-relaxed overflow-x-auto whitespace-pre-wrap">
            {docs.srsDocument}
          </pre>
        </div>
      )}

      {activeTab === 'readme' && (
        <div className="glass-panel rounded-2xl p-6 border border-gray-800">
          <pre className="text-xs font-mono text-emerald-300 leading-relaxed overflow-x-auto whitespace-pre-wrap">
            {docs.readmeMarkdown}
          </pre>
        </div>
      )}

      {activeTab === 'ppt' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {docs.pptOutline.map((slide) => (
            <div key={slide.slide} className="glass-panel rounded-2xl p-5 border border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded font-bold">
                  Slide {slide.slide}
                </span>
                <span className="text-xs font-bold text-white">{slide.title}</span>
              </div>
              <ul className="space-y-1.5 mt-3">
                {slide.points.map((pt, pIdx) => (
                  <li key={pIdx} className="text-xs text-gray-300 flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-800 mt-8">
        <p className="text-xs text-gray-500">Documentation ready for final submission and viva exam review.</p>
        <button
          onClick={onNext}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-purple-500/25"
        >
          Proceed to Virtual AI Viva Examiner <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
