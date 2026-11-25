import React from 'react';
import { Award, CheckCircle2, ShieldCheck, ArrowRight, Sparkles, Lock, Unlock, Rocket } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ReadinessDashboard({ project, readiness, onUnlockPhase2, phase2Unlocked }) {
  const safeReadiness = readiness || {
    overallScore: 0,
    verdict: 'Needs Preparation',
    recommendation: 'Complete baseline diagnostics and essential learning modules.',
    breakdown: []
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Ignore if confetti fails
    }
    onUnlockPhase2();
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-fadeIn">
      {/* Top Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
          <Award className="h-4 w-4" /> Phase 1 Readiness Verification Gate
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white">Project Readiness Scorecard</h2>
        <p className="text-xs text-gray-400 mt-2 max-w-xl mx-auto">
          Calculated dynamically from baseline diagnostics, completed learning modules, and mini exercises.
        </p>
      </div>

      {/* Main Scorecard Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-gray-800 shadow-2xl mb-8 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-gray-800">
          
          {/* Big Score Gauge */}
          <div className="flex items-center gap-6">
            <div className="relative flex items-center justify-center">
              <div className="h-28 w-28 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-1 shadow-xl shadow-indigo-500/20">
                <div className="h-full w-full rounded-full bg-slate-950 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-white">{safeReadiness.overallScore}%</span>
                  <span className="text-[10px] text-gray-400 uppercase font-semibold">Readiness</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">Verdict</span>
                <span className="px-2.5 py-0.5 text-xs bg-emerald-500/20 text-emerald-300 font-bold rounded-full border border-emerald-500/30">
                  {safeReadiness.verdict}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">{project?.title}</h3>
              <p className="text-xs text-gray-400 mt-1 max-w-md">{safeReadiness.recommendation}</p>
            </div>
          </div>

          {/* Gate Status Badge */}
          <div className="text-right shrink-0">
            <div className={`p-4 rounded-2xl border text-center ${
              phase2Unlocked
                ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300'
                : 'bg-amber-950/30 border-amber-500/50 text-amber-300'
            }`}>
              {phase2Unlocked ? (
                <>
                  <Unlock className="h-6 w-6 mx-auto mb-1 text-emerald-400" />
                  <span className="text-xs font-extrabold block">Phase 2 Unlocked</span>
                </>
              ) : (
                <>
                  <Lock className="h-6 w-6 mx-auto mb-1 text-amber-400" />
                  <span className="text-xs font-extrabold block">Phase 2 Locked</span>
                </>
              )}
            </div>
          </div>

        </div>

        {/* Technology Breakdown Bars */}
        <div className="mt-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-4">
            Technology Readiness Breakdown
          </h4>

          <div className="space-y-4">
            {(safeReadiness.breakdown || []).map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-gray-200">{item.tech}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 font-mono">{item.score}%</span>
                    <span className={`px-2 py-0.2 text-[10px] rounded font-mono ${
                      item.score >= 80 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 border border-gray-800">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      item.score >= 80 ? 'bg-emerald-500' : item.score >= 60 ? 'bg-indigo-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Unlock Call to Action */}
      <div className="text-center">
        {!phase2Unlocked ? (
          <button
            onClick={triggerConfetti}
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 via-teal-600 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-white rounded-2xl font-black text-base inline-flex items-center gap-3 shadow-2xl shadow-emerald-500/30 transform hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <Rocket className="h-6 w-6 animate-bounce" /> Unlock Phase 2 Development Studio
          </button>
        ) : (
          <button
            onClick={onUnlockPhase2}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl font-black text-base inline-flex items-center gap-3 shadow-2xl shadow-indigo-500/30 transition-all cursor-pointer"
          >
            Proceed to System Architecture & Blueprint <ArrowRight className="h-6 w-6" />
          </button>
        )}
      </div>
    </div>
  );
}
