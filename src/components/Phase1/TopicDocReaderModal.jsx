import React from 'react';
import { X, Download, Copy, Check, BookOpen, Wrench, FileCode2, HelpCircle, Sparkles, Printer, FileText } from 'lucide-react';
import { generateElaboratedStudyDoc } from '../../services/elaboratedDocGenerator';

export default function TopicDocReaderModal({ doc, selectedTech, project, onClose }) {
  const [copied, setCopied] = React.useState(false);

  if (!doc) return null;

  // Generate full 5-Page Study Doc
  const full5PageDocText = generateElaboratedStudyDoc(
    doc.topicName,
    selectedTech || 'Express.js',
    project?.title || 'Hospital Management System'
  );

  const handleCopyCode = () => {
    navigator.clipboard.writeText(doc.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Direct PDF Download / Print Handler (Formatted HTML with 0 Hashtags)
  const handleDownloadPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Convert Markdown into Clean PDF HTML
    let formattedHTML = full5PageDocText
      .replace(/# (.*)/g, '<h1 class="pdf-h1">$1</h1>')
      .replace(/## (.*)/g, '<h2 class="pdf-h2">$1</h2>')
      .replace(/### (.*)/g, '<h3 class="pdf-h3">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/```javascript([\s\S]*?)```/g, '<pre class="pdf-code">$1</pre>')
      .replace(/```([\s\S]*?)```/g, '<pre class="pdf-code">$1</pre>')
      .replace(/- (.*)/g, '<div class="pdf-bullet">• $1</div>')
      .replace(/\n\n/g, '<br/><br/>');

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
            @media print {
              body { padding: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="header-banner">
            <h1>${doc.topicName}</h1>
            <p>Target Project: ${project?.title || 'Hospital Management System'} | Technology: ${selectedTech}</p>
          </div>
          
          <div>${formattedHTML}</div>

          <div class="footer">
            LearnBuild AI — Project-Based Adaptive Learning & Development Platform • Confidential Study Guide
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

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="glass-panel w-full max-w-5xl h-[92vh] rounded-3xl p-6 sm:p-8 border border-indigo-500/40 shadow-2xl flex flex-col overflow-hidden bg-slate-950">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 flex items-center justify-center font-mono font-bold text-sm">
              #{doc.topicNumber}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-white">{doc.topicName}</h3>
                <span className="px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Full 5-Page Study Doc
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">Project: {project?.title || 'Hospital Management System'} ({selectedTech})</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPDF}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-indigo-500/20"
            >
              <Download className="h-4 w-4" /> Download PDF Document
            </button>

            <button onClick={onClose} className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Reader Body with Rich Parsed HTML (Zero Hashtags!) */}
        <div className="flex-1 overflow-y-auto py-6 space-y-6 text-left pr-2 no-scrollbar">
          
          {/* Quick Summary Banner */}
          <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
            <div className="text-xs text-indigo-200">
              <strong>Formatted Reading Reader:</strong> All raw markdown hashtags (<code className="text-indigo-300 font-mono">#</code>) have been rendered into clean titles, subheadings, and syntax-highlighted code blocks!
            </div>
          </div>

          {/* Quick Code Reference Box */}
          <div className="glass-panel rounded-2xl p-5 border border-gray-800 bg-slate-900/80">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-2">
                <FileCode2 className="h-4 w-4 text-indigo-400" /> Quick Reference Code Implementation for {project?.title || 'Hospital Management System'}
              </h4>
              <button
                onClick={handleCopyCode}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-gray-300 text-xs font-semibold flex items-center gap-1 border border-gray-700"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Snippet'}</span>
              </button>
            </div>

            <div className="rounded-xl bg-slate-950 border border-gray-800 p-4">
              <pre className="text-xs font-mono text-indigo-200 overflow-x-auto whitespace-pre">
                {doc.codeSnippet}
              </pre>
            </div>
          </div>

          {/* Parsed 5-Page Document Component (Zero Raw Hashtags Visible!) */}
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-gray-800 bg-slate-900/50">
            <MarkdownRenderer content={full5PageDocText} />
          </div>

        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-gray-800 flex items-center justify-between shrink-0">
          <span className="text-xs text-gray-500">Read this formatted guide or click "Download PDF Document" to save/print as PDF.</span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-500/20"
          >
            Close Study Reader
          </button>
        </div>

      </div>
    </div>
  );
}

/**
 * Clean Markdown Renderer Component — Eliminates raw # hashtags & ** asterisks completely
 */
function MarkdownRenderer({ content }) {
  if (!content) return null;

  // Split by code blocks first
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-4 font-sans text-xs text-gray-200 leading-relaxed text-left">
      {parts.map((part, pIdx) => {
        if (part.startsWith('```')) {
          const firstLineEnd = part.indexOf('\n');
          const lang = part.slice(3, firstLineEnd).trim();
          const code = part.slice(firstLineEnd + 1, -3).trim();

          return (
            <div key={pIdx} className="my-4 rounded-xl bg-slate-950 border border-gray-800 p-4 font-mono text-xs overflow-x-auto text-indigo-200">
              <div className="text-[10px] text-gray-500 font-mono mb-2 uppercase tracking-wider">{lang || 'code'}</div>
              <pre className="whitespace-pre">{code}</pre>
            </div>
          );
        }

        // Parse regular text lines
        const lines = part.split('\n');
        return lines.map((line, lIdx) => {
          const trimmed = line.trim();

          if (!trimmed) return null;

          // H1 (# Title)
          if (trimmed.startsWith('# ')) {
            return (
              <h1 key={lIdx} className="text-xl sm:text-2xl font-black text-white border-b border-indigo-500/40 pb-2.5 mt-6 mb-4 flex items-center gap-2">
                {parseInlineFormatting(trimmed.slice(2))}
              </h1>
            );
          }

          // H2 (## Title)
          if (trimmed.startsWith('## ')) {
            return (
              <h2 key={lIdx} className="text-base font-bold text-indigo-300 border-b border-gray-800 pb-1.5 mt-5 mb-3">
                {parseInlineFormatting(trimmed.slice(3))}
              </h2>
            );
          }

          // H3 (### Title)
          if (trimmed.startsWith('### ')) {
            return (
              <h3 key={lIdx} className="text-xs font-extrabold text-purple-300 mt-4 mb-1">
                {parseInlineFormatting(trimmed.slice(4))}
              </h3>
            );
          }

          // Horizontal divider (---)
          if (trimmed === '---') {
            return <hr key={lIdx} className="border-gray-800 my-4" />;
          }

          // Bullet List Item (- Item)
          if (trimmed.startsWith('- ')) {
            return (
              <div key={lIdx} className="flex items-start gap-2.5 ml-2 my-1 text-gray-300">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                <span>{parseInlineFormatting(trimmed.slice(2))}</span>
              </div>
            );
          }

          // Regular Paragraph
          return (
            <p key={lIdx} className="my-2 text-gray-300 leading-relaxed">
              {parseInlineFormatting(trimmed)}
            </p>
          );
        });
      })}
    </div>
  );
}

function parseInlineFormatting(str) {
  const parts = str.split(/(\*\*[\s\S]*?\*\*|`[\s\S]*?`)/g);

  return parts.map((chunk, i) => {
    if (chunk.startsWith('**') && chunk.endsWith('**')) {
      return <strong key={i} className="font-bold text-white">{chunk.slice(2, -2)}</strong>;
    }
    if (chunk.startsWith('`') && chunk.endsWith('`')) {
      return <code key={i} className="px-1.5 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-500/30 font-mono text-[11px]">{chunk.slice(1, -1)}</code>;
    }
    return chunk;
  });
}
