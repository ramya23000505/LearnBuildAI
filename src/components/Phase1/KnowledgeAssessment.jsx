import React, { useState } from 'react';
import { Award, RefreshCw, CheckCircle2, XCircle, ArrowRight, AlertTriangle, Sparkles, HelpCircle, ShieldCheck, Lock } from 'lucide-react';
import { generateDynamicAssessmentQuestions } from '../../services/aiEngine';

export default function KnowledgeAssessment({ project, onSaveAnswers, attemptHistory = [], onNext }) {
  const [attemptNumber, setAttemptNumber] = useState((attemptHistory.length || 0) + 1);
  const [questions, setQuestions] = useState(() => generateDynamicAssessmentQuestions(project, attemptNumber));
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resultSummary, setResultSummary] = useState(null);

  // Safe Fallback Safeguards to prevent runtime crashes
  const questionsList = questions && questions.length > 0 ? questions : generateDynamicAssessmentQuestions(project, attemptNumber);
  const safeIdx = Math.min(Math.max(0, currentIdx), questionsList.length - 1);
  const currentQ = questionsList[safeIdx] || {
    id: `q-${attemptNumber}-1`,
    category: 'General',
    question: 'Loading diagnostic question...',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    answer: 0,
    skill: 'General',
    explanation: 'Explanation'
  };

  // Determine current Question Set Number (1 to 5)
  const currentSetNumber = ((attemptNumber - 1) % 5) + 1;

  const handleSelectOption = (optIdx) => {
    if (isSubmitted) return;
    setUserAnswers({ ...userAnswers, [currentQ.id]: optIdx });
  };

  const handleSubmit = () => {
    let score = 0;
    const categoryResults = {};

    questionsList.forEach((q) => {
      const selected = userAnswers[q.id];
      const isCorrect = selected === q.answer;
      if (isCorrect) score++;

      if (!categoryResults[q.category]) {
        categoryResults[q.category] = [];
      }
      categoryResults[q.category].push({
        questionId: q.id,
        isCorrect,
        skill: q.skill
      });
    });

    // Student score out of 10
    const totalMarks = questionsList.length; // 10 marks
    const passed = score >= 8; // Must score 8 or higher out of 10 to pass!

    let grade = 'F';
    if (score >= 9) grade = 'A+';
    else if (score === 8) grade = 'A';
    else if (score >= 6) grade = 'B';
    else if (score >= 4) grade = 'C';

    // AI Tutor Knowledge Depth Evaluation
    let aiTutorEvaluation = '';
    if (score >= 9) {
      aiTutorEvaluation = `Mastery Level: Exceptional (Depth 95%). Demonstrates comprehensive understanding of ${project?.title}'s architecture, REST endpoints, and DB schemas. Verified ready for development.`;
    } else if (score === 8) {
      aiTutorEvaluation = `Mastery Level: Strong (Depth 80%). Solid comprehension of core stack requirements for ${project?.title}. Passed requirement achieved.`;
    } else {
      aiTutorEvaluation = `Mastery Level: Needs Improvement (Depth ${score * 10}%). Failed threshold (scored ${score}/10, minimum 8/10 needed). AI Tutor recommends reviewing weak modules in Step 6 before retaking.`;
    }

    const summary = {
      attemptNumber,
      setNumber: currentSetNumber,
      totalQuestions: totalMarks,
      score,
      percentage: Math.round((score / totalMarks) * 100),
      passed,
      grade,
      aiTutorEvaluation,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setResultSummary(summary);
    setIsSubmitted(true);
    if (onSaveAnswers) {
      onSaveAnswers(categoryResults, summary);
    }
  };

  const handleRetakeDiagnostic = () => {
    const nextAttempt = attemptNumber + 1;
    setAttemptNumber(nextAttempt);
    setQuestions(generateDynamicAssessmentQuestions(project, nextAttempt));
    setCurrentIdx(0);
    setUserAnswers({});
    setIsSubmitted(false);
    setResultSummary(null);
  };

  // Check if student has passed ANY attempt with >= 8/10
  const hasPassedAnyAttempt = (attemptHistory || []).some(a => a.passed) || (resultSummary && resultSummary.passed);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400">Step 4: Knowledge Assessment</span>
            <span className="px-2.5 py-0.5 text-[10px] bg-purple-500/20 text-purple-300 rounded font-mono font-bold">
              Set #{currentSetNumber} of 5 ({attemptNumber > 5 ? 'Shuffled Pool' : '50 Questions Pool'})
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Project-Specific Skill Diagnostic</h2>
          <p className="text-xs text-gray-400 mt-1">
            Dynamic 10-question assessment tailored specifically for {project?.title}. Attempt #{attemptNumber}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-slate-900 border border-gray-800 rounded-full text-xs font-mono text-indigo-300">
            Attempt #{attemptNumber}
          </span>
          {hasPassedAnyAttempt ? (
            <button
              onClick={onNext}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              Step Unlocked: Personalized Roadmap <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              disabled
              className="px-5 py-2.5 bg-gray-800 text-gray-500 rounded-xl font-semibold text-xs flex items-center gap-2 cursor-not-allowed opacity-60"
            >
              <Lock className="h-4 w-4" /> Locked (Score 8/10 to Unlock)
            </button>
          )}
        </div>
      </div>

      {/* Main Diagnostic Container */}
      {!isSubmitted ? (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-gray-800 shadow-2xl">
          {/* Progress Bar & Counter */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
              <span>Question {safeIdx + 1} of {questionsList.length} (10 Questions Total)</span>
              <span className="px-2.5 py-0.5 rounded-md bg-indigo-950 text-indigo-300 font-mono text-[11px]">
                Category: {currentQ.category}
              </span>
            </div>
            <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-gray-800">
              <div
                className="h-full bg-indigo-500 transition-all duration-300"
                style={{ width: `${((safeIdx + 1) / questionsList.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="mb-6">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">
              Skill: {currentQ.skill}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
              {currentQ.question}
            </h3>
          </div>

          {/* Shuffled Options List */}
          <div className="space-y-3 mb-8">
            {(currentQ.options || []).map((optionText, optIdx) => {
              const isSelected = userAnswers[currentQ.id] === optIdx;
              const optionLetters = ['A', 'B', 'C', 'D'];

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                      : 'bg-slate-900/70 border-gray-800 text-gray-300 hover:border-gray-700 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`h-8 w-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-800 text-gray-400'
                      }`}
                    >
                      {optionLetters[optIdx]}
                    </span>
                    <span className="text-xs font-medium leading-relaxed">{optionText}</span>
                  </div>
                  {isSelected && <CheckCircle2 className="h-5 w-5 text-indigo-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-800">
            <button
              onClick={() => setCurrentIdx(Math.max(0, safeIdx - 1))}
              disabled={safeIdx === 0}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-gray-300 rounded-xl text-xs font-bold border border-gray-800"
            >
              Previous Question
            </button>

            {safeIdx < questionsList.length - 1 ? (
              <button
                onClick={() => setCurrentIdx(safeIdx + 1)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20"
              >
                Next Question ({safeIdx + 2} of 10)
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-500/20 flex items-center gap-2"
              >
                <Award className="h-4 w-4" /> Submit Diagnostic (10 Marks)
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Diagnostic Results & AI Tutor Scorecard Screen */
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-gray-800 shadow-2xl space-y-6">
          
          {/* Result Banner */}
          <div className={`p-6 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
            resultSummary?.passed
              ? 'bg-emerald-950/30 border-emerald-500/40'
              : 'bg-red-950/30 border-red-500/40'
          }`}>
            <div className="flex items-center gap-4">
              <div className={`h-14 w-14 rounded-2xl flex items-center justify-center font-extrabold text-2xl ${
                resultSummary?.passed ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
              }`}>
                {resultSummary?.score}/10
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                    resultSummary?.passed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                  }`}>
                    {resultSummary?.passed ? 'PASSED (Target Score Achieved)' : 'FAILED (Retake Required)'}
                  </span>
                  <span className="text-xs font-mono text-gray-400">Grade: {resultSummary?.grade}</span>
                </div>
                <h3 className="text-xl font-black text-white mt-1">
                  {resultSummary?.passed
                    ? 'Congratulations! You Passed the Diagnostic!'
                    : 'Score Below Threshold (Minimum 8/10 Required to Pass)'}
                </h3>
                <p className="text-xs text-gray-300 mt-0.5">
                  You scored {resultSummary?.score} out of 10 marks ({resultSummary?.percentage}%).
                  {!resultSummary?.passed && ' You must score at least 8/10 marks to unlock Step 5.'}
                </p>
              </div>
            </div>

            <button
              onClick={handleRetakeDiagnostic}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shrink-0 shadow-lg shadow-indigo-500/20"
            >
              <RefreshCw className="h-4 w-4" /> Retake Diagnostic (Next Set)
            </button>
          </div>

          {/* AI Tutor Knowledge Depth Evaluation Card */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-purple-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-purple-400" />
              <h4 className="text-sm font-extrabold text-white">AI Tutor Diagnostic Assessment of Knowledge Depth</h4>
            </div>
            <p className="text-xs text-purple-200 leading-relaxed font-mono bg-purple-950/40 p-3 rounded-xl border border-purple-500/20">
              {resultSummary?.aiTutorEvaluation}
            </p>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-800">
            <span className="text-xs text-gray-400">
              Set #{currentSetNumber} Completed • {attemptNumber > 5 ? 'Shuffled 50 Questions Pool Active' : '50 Questions Pool Active'}
            </span>

            {hasPassedAnyAttempt ? (
              <button
                onClick={onNext}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                Proceed to Step 5: Personalized Roadmap <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleRetakeDiagnostic}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-red-500/20"
              >
                <RefreshCw className="h-4 w-4" /> Retake Set #{((attemptNumber) % 5) + 1} (Must Score 8/10)
              </button>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
