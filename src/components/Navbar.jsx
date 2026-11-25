import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Brain, Boxes, ChevronDown, Bot, Sliders, User, LogOut, LogIn, UserPlus, Sun, Moon, RefreshCw, CheckCircle2, Code, Cpu, FileText, BarChart, Layers } from 'lucide-react';
import { DOMAINS, REUSABLE_CONCEPT_BLOCKS } from '../data/sampleProjects';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ activeProject, onSelectPreset, currentPhase, currentStep, onReset, onOpenTutor, onOpenCustomizer }) {
  const { user, isLoggedIn, openLogin, openSignup, logout } = useAuth();
  const { toggleTheme, isDark } = useTheme();

  const [blocksDropdownOpen, setBlocksDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [selectedDomainId, setSelectedDomainId] = useState('swe');

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setBlocksDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeBlocksForDomain = REUSABLE_CONCEPT_BLOCKS.filter(b => b.domainId === selectedDomainId);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-800 bg-slate-950/85 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo & Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={onReset}>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent">
                LearnBuild AI
              </span>
              <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                v2.5 Full-Stack
              </span>
            </div>
            <p className="text-xs text-gray-400 font-medium">Project-Based Adaptive Learning Platform</p>
          </div>
        </div>

        {/* SINGLE NAVIGATOR BAR: Reusable Concept Blocks Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setBlocksDropdownOpen(!blocksDropdownOpen)}
            className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md ${
              blocksDropdownOpen
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-indigo-500/25 ring-2 ring-indigo-400/30'
                : 'bg-slate-900 hover:bg-slate-800 text-gray-200 border-gray-800 hover:border-gray-700'
            }`}
          >
            <Boxes className="h-4 w-4 text-indigo-400" />
            <span className="font-extrabold">Reusable Concept Blocks</span>
            <span className="px-2 py-0.5 text-[10px] rounded-md bg-indigo-500/20 text-indigo-300 font-mono hidden sm:inline">
              30 Blocks
            </span>
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${blocksDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Reusable Concept Blocks Categorized Dropdown Panel */}
          {blocksDropdownOpen && (
            <div className="absolute left-0 sm:left-auto right-0 mt-2 w-[340px] sm:w-[620px] bg-slate-900 border border-gray-800 rounded-2xl p-4 shadow-2xl z-50 animate-fadeIn backdrop-blur-xl">
              
              <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-indigo-400" />
                  <span className="text-xs font-extrabold text-white">Select a Reusable Concept Block</span>
                </div>
                <span className="text-[11px] text-gray-400 font-mono">Categorized by Domain</span>
              </div>

              {/* 6 Domain Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-gray-850 mb-4">
                {DOMAINS.map(d => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDomainId(d.id)}
                    className={`py-1.5 px-2 text-[11px] font-bold rounded-lg transition-all text-left flex items-center gap-1.5 cursor-pointer ${
                      selectedDomainId === d.id
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-gray-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <span>{d.name}</span>
                  </button>
                ))}
              </div>

              {/* 5 Concept Blocks List for Selected Domain */}
              <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
                {activeBlocksForDomain.map(block => {
                  const isCurrent = activeProject?.id === block.id || activeProject?.title?.toLowerCase() === block.title.toLowerCase();

                  return (
                    <button
                      key={block.id}
                      onClick={() => {
                        onSelectPreset(block);
                        setBlocksDropdownOpen(false);
                      }}
                      className={`w-full p-2.5 rounded-xl text-left transition-all border flex items-center justify-between group cursor-pointer ${
                        isCurrent
                          ? 'bg-indigo-600/20 border-indigo-500/60 text-white shadow-md'
                          : 'bg-slate-950/60 hover:bg-slate-800 border-gray-800 text-gray-300 hover:text-white'
                      }`}
                    >
                      <div className="flex-1 pr-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold group-hover:text-indigo-300 transition-colors">
                            {block.title}
                          </span>
                          {isCurrent && (
                            <span className="px-1.5 py-0.2 text-[9px] bg-indigo-500 text-white rounded font-mono font-bold">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-gray-400 line-clamp-1 mt-0.5">{block.description}</p>
                      </div>
                      <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-md border border-indigo-500/20 shrink-0">
                        {block.difficulty}
                      </span>
                    </button>
                  );
                })}
              </div>

            </div>
          )}
        </div>

        {/* Action Controls, Theme Toggle & User Profile */}
        <div className="flex items-center gap-2">
          
          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-gray-800 text-amber-400 hover:text-amber-300 transition-all cursor-pointer shadow-sm flex items-center justify-center"
          >
            {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-400" />}
          </button>

          {/* Swap Tech Customizer Trigger */}
          <button
            onClick={onOpenCustomizer}
            className="px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Sliders className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Swap Tech</span>
          </button>

          {/* AI Tutor Trigger */}
          <button
            onClick={onOpenTutor}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
          >
            <Bot className="h-4 w-4" />
            <span className="hidden sm:inline">AI Tutor</span>
          </button>

          {/* User Auth Profile Trigger */}
          <div className="relative">
            {isLoggedIn ? (
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="px-3 py-1.5 rounded-xl bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-500/40 text-indigo-200 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
              >
                <div className="h-6 w-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black uppercase">
                  {user?.name ? user.name[0] : 'S'}
                </div>
                <span className="hidden md:inline line-clamp-1 max-w-[100px]">{user?.name || user?.email}</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={openLogin}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-gray-800 text-gray-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <LogIn className="h-3.5 w-3.5 text-indigo-400" />
                  <span>Log In</span>
                </button>
                <button
                  onClick={openSignup}
                  className="hidden sm:flex px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold items-center gap-1.5 shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  <span>Sign Up</span>
                </button>
              </div>
            )}

            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && isLoggedIn && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-gray-800 rounded-2xl p-2 shadow-2xl z-50 animate-fadeIn">
                <div className="px-3 py-2 border-b border-gray-800 mb-1">
                  <p className="text-xs font-bold text-white leading-tight">{user?.name}</p>
                  <p className="text-[11px] text-gray-400 truncate">{user?.email}</p>
                </div>
                <button
                  onClick={() => { logout(); setProfileDropdownOpen(false); }}
                  className="w-full px-3 py-2 text-left text-xs text-red-400 hover:bg-red-950/40 rounded-xl flex items-center gap-2 font-semibold transition-colors cursor-pointer"
                >
                  <LogOut className="h-4 w-4" /> Log Out
                </button>
              </div>
            )}
          </div>

          <button
            onClick={onReset}
            title="Start New Project Idea"
            className="p-2 rounded-xl bg-slate-900 border border-gray-800 hover:bg-gray-800 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
