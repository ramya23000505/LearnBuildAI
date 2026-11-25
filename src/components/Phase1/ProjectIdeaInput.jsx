import React, { useState, useRef } from 'react';
import { Sparkles, Code, Brain, Cpu, FileText, BarChart, ArrowRight, CheckCircle, Zap, Upload, File, Image, X, FileUp } from 'lucide-react';
import { DOMAINS, PRESET_PROJECTS } from '../../data/sampleProjects';

export default function ProjectIdeaInput({ onSubmitIdea, onSelectPreset }) {
  const [prompt, setPrompt] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('swe');
  const [inputMode, setInputMode] = useState('text'); // 'text' | 'pdf' | 'image'
  const [uploadedFile, setUploadedFile] = useState(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState(null);
  const [isExtractingFile, setIsExtractingFile] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadedFile(file);
    setIsExtractingFile(true);

    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setFilePreviewUrl(url);
    } else {
      setFilePreviewUrl(null);
    }

    // Simulate AI Document / Image OCR Extraction
    setTimeout(() => {
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      const extractedText = `[Extracted from ${file.name}]: High-level project specifications for "${cleanName}". System architecture includes RESTful endpoints, data pipeline, responsive frontend UI, and database persistence.`;
      
      setPrompt(prev => prev ? `${prev}\n\n${extractedText}` : extractedText);
      setIsExtractingFile(false);
    }, 800);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setFilePreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim() && !uploadedFile) return;
    
    const finalPrompt = prompt.trim() || (uploadedFile ? `Project proposal document ${uploadedFile.name}` : 'Custom Project Idea');
    onSubmitIdea(finalPrompt, selectedDomain);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-fadeIn">
      {/* Hero Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-4">
          <Sparkles className="h-3.5 w-3.5" /> Project-Based Adaptive Learning Framework
        </div>
        <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-white via-indigo-100 to-indigo-400 bg-clip-text text-transparent tracking-tight">
          Learn Essential Concepts First.<br />Build Your Project Next.
        </h1>
        <p className="mt-4 text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Stop generating black-box code you cannot explain in viva. Enter your project idea, upload your proposal PDF, or upload an architecture diagram image.
        </p>
      </div>

      {/* Main Input Card */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 shadow-2xl relative border border-gray-800">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Domain Selection Grid */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
              1. Select Project Domain
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {DOMAINS.map((d) => (
                <button
                  type="button"
                  key={d.id}
                  onClick={() => setSelectedDomain(d.id)}
                  className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                    selectedDomain === d.id
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500'
                      : 'bg-slate-900/60 border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-200'
                  }`}
                >
                  <div className={`h-8 w-8 rounded-lg bg-gradient-to-tr ${d.color} flex items-center justify-center text-white shrink-0`}>
                    {d.id === 'swe' && <Code className="h-4 w-4" />}
                    {d.id === 'ml' && <Brain className="h-4 w-4" />}
                    {d.id === 'dl' && <Cpu className="h-4 w-4" />}
                    {d.id === 'nlp' && <FileText className="h-4 w-4" />}
                    {d.id === 'ds' && <BarChart className="h-4 w-4" />}
                    {d.id === 'genai' && <Sparkles className="h-4 w-4" />}
                  </div>
                  <span className="text-xs font-medium truncate">{d.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Project Input Mode Selector (Text / PDF / Image) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                2. Describe Your Project Idea
              </label>

              {/* Input Mode Selector Tabs */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-gray-800">
                <button
                  type="button"
                  onClick={() => setInputMode('text')}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                    inputMode === 'text' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <FileText className="h-3.5 w-3.5" /> Type Idea
                </button>
                <button
                  type="button"
                  onClick={() => { setInputMode('pdf'); fileInputRef.current?.click(); }}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                    inputMode === 'pdf' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <FileUp className="h-3.5 w-3.5 text-amber-400" /> Upload PDF
                </button>
                <button
                  type="button"
                  onClick={() => { setInputMode('image'); fileInputRef.current?.click(); }}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                    inputMode === 'image' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Image className="h-3.5 w-3.5 text-purple-400" /> Upload Image
                </button>
              </div>
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept={inputMode === 'image' ? 'image/*' : '.pdf,.docx,.txt,image/*'}
              className="hidden"
            />

            {/* Drag & Drop File Upload Card */}
            {(inputMode === 'pdf' || inputMode === 'image' || uploadedFile) && (
              <div className="mb-4 p-5 rounded-2xl border-2 border-dashed border-indigo-500/40 bg-indigo-950/20 text-center relative hover:border-indigo-400 transition-all">
                {uploadedFile ? (
                  <div className="flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-gray-800 text-left">
                    <div className="flex items-center gap-3">
                      {filePreviewUrl ? (
                        <img src={filePreviewUrl} alt="Upload Preview" className="h-12 w-12 object-cover rounded-lg border border-gray-700" />
                      ) : (
                        <div className="h-10 w-10 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold">
                          <FileText className="h-5 w-5" />
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-bold text-white leading-tight truncate max-w-[220px] sm:max-w-[350px]">
                          {uploadedFile.name}
                        </p>
                        <p className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5 font-mono">
                          <CheckCircle className="h-3 w-3" /> {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB • {isExtractingFile ? 'AI Extracting Concepts...' : 'Analyzed & Extracted'}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="p-1.5 rounded-lg bg-slate-800 text-gray-400 hover:text-red-400 hover:bg-slate-700 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div onClick={() => fileInputRef.current?.click()} className="cursor-pointer py-3">
                    <Upload className="h-8 w-8 text-indigo-400 mx-auto mb-2 animate-bounce" />
                    <p className="text-xs font-bold text-gray-200">
                      Click to upload project proposal {inputMode === 'pdf' ? 'PDF / DOCX' : 'Architecture Diagram Image'}
                    </p>
                    <p className="text-[11px] text-gray-500 mt-1">Supports PDF, DOCX, TXT, PNG, JPG, WEBP</p>
                  </div>
                )}
              </div>
            )}

            {/* Project Prompt Textarea */}
            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. AI Resume Analyzer that extracts skills from PDFs, compares against job descriptions using LangChain RAG, and provides fit score with FastAPI and React."
              className="w-full bg-slate-950 border border-gray-800 rounded-xl p-4 text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <Zap className="h-4 w-4" /> Instant minimum concept extraction engine
            </div>
            <button
              type="submit"
              disabled={!prompt.trim() && !uploadedFile}
              className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg ${
                prompt.trim() || uploadedFile
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-500/25 cursor-pointer'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              Analyze & Extract Concepts <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </form>

        {/* Popular Presets Quick Selector */}
        <div className="mt-8 pt-6 border-t border-gray-800/80">
          <p className="text-xs text-gray-400 font-medium mb-3">Or choose a pre-analyzed benchmark project template:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PRESET_PROJECTS.slice(0, 4).map((p) => (
              <div
                key={p.id}
                onClick={() => onSelectPreset(p)}
                className="p-3.5 rounded-xl bg-slate-900/80 border border-gray-800/90 hover:border-indigo-500/50 hover:bg-slate-900 cursor-pointer transition-all flex items-start justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-gray-200 group-hover:text-indigo-300 transition-colors">
                      {p.title}
                    </h4>
                    <span className="px-2 py-0.5 text-[10px] rounded bg-indigo-500/10 text-indigo-400 font-mono">
                      {p.difficulty}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">{p.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-600 group-hover:text-indigo-400 shrink-0 transition-all group-hover:translate-x-1" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
