import React, { useState } from 'react';
import { Calendar, Clock, Sliders, ArrowRight, CheckCircle2, BookOpen, ChevronDown, ChevronUp, RotateCcw, AlertTriangle } from 'lucide-react';
import { generateAdaptiveRoadmap } from '../../services/aiEngine';

export default function PersonalizedRoadmap({ project, onNext }) {
  const [hoursPerDay, setHoursPerDay] = useState(2);
  const [targetDays, setTargetDays] = useState(14);
  const [missedDays, setMissedDays] = useState(0);
  const [expandedWeek, setExpandedWeek] = useState(1);

  const roadmapData = generateAdaptiveRoadmap(project, hoursPerDay, targetDays, missedDays);

  const handleRecalculateMissed = () => {
    setMissedDays(prev => prev + 2); // Recalculate for 2 missed days
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-400">Step 5: Personalized Learning Roadmap</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Adaptive Study Timetable</h2>
          <p className="text-xs text-gray-400 mt-1">Tailored specifically for {project?.title}. Automatically recalculates if you miss a study day!</p>
        </div>
        <button
          onClick={onNext}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-500/20"
        >
          Open Learning Resources <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Recalculation Alert Banner if Missed Days exist */}
      {missedDays > 0 && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-amber-300">Schedule Auto-Recalculated ({missedDays} Missed Days)</h4>
              <p className="text-[11px] text-gray-300">AI compressed remaining modules into {roadmapData.targetDays} effective study days without dropping core prerequisites!</p>
            </div>
          </div>
          <button
            onClick={() => setMissedDays(0)}
            className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-lg text-xs font-semibold hover:bg-amber-500/30"
          >
            Reset
          </button>
        </div>
      )}

      {/* Adaptive Parameter Controls */}
      <div className="glass-panel rounded-2xl p-6 border border-gray-800 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
              <Clock className="h-4 w-4 text-indigo-400" /> Daily Study Commitment
            </label>
            <span className="text-sm font-extrabold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-md font-mono">
              {hoursPerDay} Hours / Day
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={6}
            step={1}
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(Number(e.target.value))}
            className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
          <div className="flex justify-between text-[10px] text-gray-500 mt-1">
            <span>1 hr (Light)</span>
            <span>2 hrs (Standard)</span>
            <span>4 hrs (Intensive)</span>
            <span>6 hrs (Bootcamp)</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-400" /> Target Deadline
            </label>
            <span className="text-sm font-extrabold text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-md font-mono">
              {roadmapData.targetDays} Days Target
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[7, 14, 21, 30].map((days) => (
              <button
                key={days}
                onClick={() => { setTargetDays(days); setMissedDays(0); }}
                className={`py-2 rounded-lg text-xs font-semibold border transition-all ${
                  targetDays === days
                    ? 'bg-purple-600/20 border-purple-500 text-purple-300'
                    : 'bg-slate-900/60 border-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                {days} Days
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-800">
            <span className="text-[10px] text-gray-500">
              Total Budget: <strong className="text-gray-300">{roadmapData.totalHours} Hours</strong>
            </span>
            <button
              onClick={handleRecalculateMissed}
              className="text-[10px] text-amber-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="h-3 w-3" /> Simulate Missed Days
            </button>
          </div>
        </div>
      </div>

      {/* Visual Timeline Schedule */}
      <div className="space-y-4 mb-8">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
          Generated Adaptive Schedule Roadmap ({roadmapData.weeklyPlan.length} Phases)
        </h3>

        {roadmapData.weeklyPlan.map((week, idx) => {
          const isExpanded = expandedWeek === week.week;
          return (
            <div
              key={idx}
              className="glass-panel rounded-2xl border border-gray-800 overflow-hidden transition-all"
            >
              <div
                onClick={() => setExpandedWeek(isExpanded ? null : week.week)}
                className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-900/60 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white shadow-md">
                    W{week.week}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{week.title}</h4>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {week.items.length} Modules • ~{week.hours} Total Hours
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-full font-mono">
                    Phase {week.week}
                  </span>
                  {isExpanded ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                </div>
              </div>

              {isExpanded && (
                <div className="p-5 bg-slate-950/60 border-t border-gray-800/80 space-y-3">
                  {week.items.map((item, iIdx) => (
                    <div key={iIdx} className="p-4 rounded-xl bg-slate-900/80 border border-gray-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-indigo-300">{item.technology}</span>
                        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono">
                          {item.dayRange}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 font-medium mb-2">Essential Target Learning Outcomes:</p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {item.mustLearn.map((ml, mlIdx) => (
                          <li key={mlIdx} className="text-xs text-gray-300 flex items-center gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                            <span>{ml}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer controls */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <p className="text-xs text-gray-400">
          Timetable updates dynamically as you complete learning verification tasks.
        </p>
        <button
          onClick={onNext}
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-500/25"
        >
          Explore Learning Resources <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
