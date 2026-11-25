import React, { useState } from 'react';
import { X, Send, Bot, User, Sparkles, HelpCircle, Code2, BookOpen } from 'lucide-react';
import { storageService } from '../services/storageService';

export default function AITutorDrawer({ isOpen, onClose, project, currentStep }) {
  const [messages, setMessages] = useState(() => {
    try {
      const saved = storageService.loadChatHistory ? storageService.loadChatHistory() : [];
      return (saved && saved.length > 0) ? saved : [
        {
          sender: 'ai',
          text: `Hello! I am your LearnBuild AI Tutor. I am tracking your project "${project?.title || 'Project'}". Ask me anything about your tech stack, architecture, or code!`
        }
      ];
    } catch (e) {
      return [
        {
          sender: 'ai',
          text: `Hello! I am your LearnBuild AI Tutor. Ask me anything about your tech stack!`
        }
      ];
    }
  });

  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');

    // Generate context-aware AI tutor response
    setTimeout(() => {
      let aiText = `Great question regarding ${project?.title}! `;
      const query = input.toLowerCase();

      if (query.includes('why') || query.includes('reason')) {
        aiText += `We chose ${project?.techStack?.backend} and ${project?.techStack?.frontend} because they provide the ideal balance of productivity, speed, and clean separation of concerns for ${project?.domain}.`;
      } else if (query.includes('swap') || query.includes('change')) {
        aiText += `You can swap technologies anytime! Click the "Customizer / Swap Tech" button in the top navigation bar to change frontend, backend, or database frameworks.`;
      } else if (query.includes('code') || query.includes('file')) {
        aiText += `In Step 10 (Modular Code Studio), every file includes 4 interactive tools: "Explain Logic", "Why This Tech?", "How It Works?", and "Modify".`;
      } else {
        aiText += `Based on your current learning step (${currentStep}), you are focusing on essential concepts for ${project?.techStack?.language} & ${project?.techStack?.backend}. Keeping your study focused on minimum concepts saves ~65% of study time!`;
      }

      const finalMsgs = [...updated, { sender: 'ai', text: aiText }];
      setMessages(finalMsgs);
      if (storageService.saveChatHistory) {
        storageService.saveChatHistory(finalMsgs);
      }
    }, 600);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-slate-950 border-l border-gray-800 shadow-2xl flex flex-col animate-slideLeft">
      
      {/* Drawer Header */}
      <div className="p-4 bg-slate-900 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white">AI Project Tutor</h3>
            <p className="text-[10px] text-gray-400">Contextual assistant for {project?.title}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="p-3 bg-slate-900/50 border-b border-gray-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {[
          'Why this backend tech?',
          'How do I swap frameworks?',
          'Explain RAG architecture'
        ].map((q, idx) => (
          <button
            key={idx}
            onClick={() => setInput(q)}
            className="px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-[10px] border border-indigo-500/20 whitespace-nowrap hover:bg-indigo-500/20"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Message History */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2 text-xs ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.sender === 'ai' && (
              <div className="h-6 w-6 rounded-md bg-purple-600 flex items-center justify-center text-white shrink-0 font-bold text-[10px]">
                AI
              </div>
            )}
            <div
              className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-slate-900 text-gray-200 border border-gray-800 rounded-tl-none'
              }`}
            >
              {m.text}
            </div>
            {m.sender === 'user' && (
              <div className="h-6 w-6 rounded-md bg-indigo-500 flex items-center justify-center text-white shrink-0 font-bold text-[10px]">
                U
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Footer */}
      <form onSubmit={handleSend} className="p-3 bg-slate-900 border-t border-gray-800 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI Tutor a question..."
          className="flex-1 bg-slate-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>

    </div>
  );
}
