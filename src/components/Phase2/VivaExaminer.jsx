import React, { useState } from 'react';
import { Award, Brain, CheckCircle2, MessageSquare, Mic, Play, RefreshCw, Send, Sparkles, Star, Trophy } from 'lucide-react';
import { VIVA_QUESTIONS } from '../../data/vivaQuestions';
import confetti from 'canvas-confetti';

export default function VivaExaminer({ project, onFinish }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [evaluations, setEvaluations] = useState({});
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [examComplete, setExamComplete] = useState(false);

  const currentQ = VIVA_QUESTIONS[currentIdx];

  const handleEvaluate = (e) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;

    setIsEvaluating(true);

    setTimeout(() => {
      // Evaluate based on expected keywords present in user text
      const text = userAnswer.toLowerCase();
      let matchedCount = 0;
      currentQ.expectedKeywords.forEach(kw => {
        if (text.includes(kw.toLowerCase())) matchedCount++;
      });

      const totalKw = currentQ.expectedKeywords.length;
      let scorePct = Math.round((matchedCount / (totalKw || 1)) * 100);
      scorePct = Math.min(98, Math.max(55, scorePct + 45)); // Scale to realistic student score range 55-98

      let feedback = "Good explanation! You covered the core architectural flow.";
      if (scorePct < 70) {
        feedback = `Decent attempt. Consider explicitly mentioning terms like ${currentQ.expectedKeywords.slice(0, 3).join(', ')}.`;
      } else if (scorePct >= 90) {
        feedback = "Exceptional response! Full technical clarity and keyword precision.";
      }

      setEvaluations(prev => ({
        ...prev,
        [currentIdx]: {
          answer: userAnswer,
          score: scorePct,
          feedback,
          matchedKeywords: matchedCount
        }
      }));

      setIsEvaluating(false);
    }, 800);
  };

  const handleNextQuestion = () => {
    setUserAnswer('');
    if (currentIdx < VIVA_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setExamComplete(true);
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.5 }
      });
    }
  };

  // Calculate average Viva score
  const evalList = Object.values(evaluations);
  const avgScore = evalList.length > 0
    ? Math.round(evalList.reduce((acc, curr) => acc + curr.score, 0) / evalList.length)
    : 85;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold mb-3">
          <Brain className="h-4 w-4" /> Steps 13-14: Virtual AI Viva Examiner Simulator
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white">Interactive Viva Defense Exam</h2>
        <p className="text-xs text-gray-400 mt-2 max-w-lg mx-auto">
          Test your ability to explain your project architecture, tech stack decisions, and implementation logic to a virtual examiner.
        </p>
      </div>

      {!examComplete ? (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-gray-800 shadow-2xl">
          
          {/* Progress header */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full font-bold border border-purple-500/20">
              Question {currentIdx + 1} of {VIVA_QUESTIONS.length}
            </span>
            <span className="text-xs text-gray-400 font-semibold">{currentQ.category}</span>
          </div>

          {/* Examiner Question Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 border border-purple-500/30 mb-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-purple-600 flex items-center justify-center text-white shrink-0 font-bold shadow-lg shadow-purple-500/20">
                AI
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  "{currentQ.question}"
                </h3>
                <p className="text-xs text-purple-300/80 mt-2 italic">
                  💡 Examiner Guidance: {currentQ.guidance}
                </p>
              </div>
            </div>
          </div>

          {/* Answer Input */}
          {!evaluations[currentIdx] ? (
            <form onSubmit={handleEvaluate} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Your Viva Answer Defense
                  </label>
                  <span className="text-[11px] text-indigo-400 flex items-center gap-1">
                    <Mic className="h-3.5 w-3.5" /> Voice / Text Response
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Explain your architectural decisions, endpoints, schemas, or models in your own words..."
                  className="w-full bg-slate-950 border border-gray-800 rounded-xl p-4 text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-sans"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-gray-500">Provide a clear explanation covering tech details.</span>
                <button
                  type="submit"
                  disabled={!userAnswer.trim() || isEvaluating}
                  className={`px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                    userAnswer.trim() && !isEvaluating
                      ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/25 cursor-pointer'
                      : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isEvaluating ? 'Evaluating Defense...' : 'Submit Viva Answer'} <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          ) : (
            /* Examiner Evaluation Result */
            <div className="p-6 rounded-2xl bg-slate-900 border border-gray-800 animate-fadeIn space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase">Examiner Evaluation Score</span>
                <span className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {evaluations[currentIdx].score} / 100
                </span>
              </div>

              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30">
                <h4 className="text-xs font-bold text-purple-300 uppercase mb-1">Feedback Critique</h4>
                <p className="text-xs text-gray-200">{evaluations[currentIdx].feedback}</p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-emerald-400 font-semibold">
                  ✓ Matched {evaluations[currentIdx].matchedKeywords} key technical concepts
                </span>
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-500/20"
                >
                  {currentIdx < VIVA_QUESTIONS.length - 1 ? 'Next Viva Question' : 'Complete Viva Exam'} <Play className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      ) : (
        /* Final Viva Certificate & Completion Screen */
        <div className="glass-panel rounded-3xl p-8 border border-gray-800 text-center animate-fadeIn">
          <div className="h-20 w-20 rounded-3xl bg-gradient-to-tr from-emerald-500 to-indigo-600 mx-auto flex items-center justify-center text-white mb-4 shadow-2xl shadow-emerald-500/30">
            <Trophy className="h-10 w-10" />
          </div>

          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-full font-mono text-xs font-bold uppercase">
            CERTIFICATION PASSED
          </span>

          <h3 className="text-3xl font-black text-white mt-3">Congratulations! Project & Viva Completed</h3>
          <p className="text-xs text-gray-400 mt-1 max-w-md mx-auto">
            You have successfully learned essential concepts, built, and defended {project?.title}!
          </p>

          <div className="my-8 p-6 rounded-2xl bg-slate-900 border border-gray-800 max-w-md mx-auto">
            <span className="text-xs text-gray-400 uppercase font-semibold">Final Combined Score</span>
            <div className="text-5xl font-extrabold bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent mt-1">
              {avgScore}%
            </div>
            <p className="text-xs text-emerald-400 font-bold mt-2">Certified Ready for Presentation & Viva Defense</p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={onFinish}
              className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-bold text-sm inline-flex items-center gap-2 shadow-lg shadow-indigo-500/25"
            >
              Start Another Project Idea <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
