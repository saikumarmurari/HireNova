import React, { useState } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  Award,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Send,
  BookOpen,
  ChevronRight,
  TrendingUp,
  BrainCircuit,
  MessageSquare,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { evaluateInterviewAnswerWithAI } from '../services/aiService';
import { InterviewQuestion, InterviewEvaluation } from '../types';

const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'q1',
    role: 'Senior Software Engineer',
    category: 'behavioral',
    difficulty: 'Senior',
    question:
      'Tell me about a time you had to make a high-stakes technical architectural decision with incomplete information and tight deadlines. How did you handle it and what was the outcome?',
    idealAnswerGuidelines: [
      'Set clear context with business stakes and time pressure.',
      'Explain how you evaluated trade-offs (e.g. latency vs consistency, build vs buy).',
      'Describe cross-functional communication and risk mitigation.',
      'Quantify the business result (uptime, scale, cost saved).',
    ],
    sampleStarResponse: {
      situation:
        'At Apex Cloud, our legacy database was choking on peak traffic with query latency spiking to 3 seconds during Black Friday sales.',
      task:
        'I had 3 weeks to choose and roll out an edge caching tier without risking transaction consistency or introducing downtime.',
      action:
        'I conducted rapid synthetic benchmarks between Redis cluster and DynamoDB, selected Redis for our read-heavy access patterns, and architected an automated dual-write fallback proxy with circuit-breaking in Go.',
      result:
        'We achieved a 99.99% cache hit rate, trimmed p99 query latency by 85%, and scaled through the holiday spike without a single outage, saving $40,000 in database compute costs.',
    },
  },
  {
    id: 'q2',
    role: 'Senior Software Engineer',
    category: 'technical',
    difficulty: 'Senior',
    question:
      'How do you design a real-time collaborative application (like Google Docs or Figma) to handle network latency, concurrent edits, and offline conflict resolution?',
    idealAnswerGuidelines: [
      'Compare Operational Transformation (OT) vs CRDTs (Conflict-free Replicated Data Types).',
      'Detail WebSocket connection state and heartbeat reconnection.',
      'Explain optimistic UI updates with local undo/redo stacks.',
      'Address server-authoritative persistence and snapshot compression.',
    ],
    sampleStarResponse: {
      situation:
        'Our product team required synchronous real-time canvas whiteboard collaboration for up to 50 active users per session.',
      task: 'Design the distributed synchronization protocol with sub-50ms latency.',
      action:
        'Implemented state-based CRDTs using Yjs over binary WebSockets with an immutable event log. Local changes rendered immediately while background delta vectors resolved concurrent mutations deterministically without locks.',
      result:
        'Successfully delivered zero-data-loss collaboration with p95 sync times under 35ms across global nodes.',
    },
  },
  {
    id: 'q3',
    role: 'Senior Software Engineer',
    category: 'situational',
    difficulty: 'Mid',
    question:
      'A Product Manager wants to ship an urgent feature tomorrow, but the engineering team believes the technical debt will cause severe production regressions. How do you resolve this conflict?',
    idealAnswerGuidelines: [
      'Empathize with the product/business goal behind the urgency.',
      'Quantify technical risk into concrete business consequences (customer impact, downtime risk).',
      'Propose a pragmatic compromise (phased rollout, feature flag, MVP scope reduction).',
      'Schedule dedicated technical debt repayment in the immediate next sprint.',
    ],
    sampleStarResponse: {
      situation:
        'A partner requested an enterprise export feature for a critical contract signature within 48 hours.',
      task: 'The direct patch risked locking the main reporting database.',
      action:
        'I sat down with the PM, mapped out the customer\'s true minimal requirement, and proposed an asynchronous email delivery flow behind a feature flag. This decoupled the load from the synchronous API.',
      result:
        'We signed the client on time while avoiding database spikes, and refactored the pipeline cleanly the following sprint without emergency hotfixes.',
    },
  },
  {
    id: 'q4',
    role: 'Full Stack Engineer',
    category: 'technical',
    difficulty: 'Mid',
    question:
      'Walk me through the lifecycle of a web request from the moment a user presses Enter in the browser address bar until the page finishes rendering.',
    idealAnswerGuidelines: [
      'Cover DNS resolution (browser cache, OS, recursive resolver).',
      'Explain TCP three-way handshake and TLS 1.3 cryptographic negotiation.',
      'Describe HTTP request headers, server routing, and reverse proxy caching.',
      'Explain browser critical rendering path (DOM tree, CSSOM, Render tree, Layout, Paint, Compositing).',
    ],
    sampleStarResponse: {
      situation: 'Explaining end-to-end full stack architecture for systems diagnosis.',
      task: 'Provide an accurate technical explanation across networking, transport, and browser rendering engines.',
      action:
        'I systematically trace DNS resolution, TLS certificate verification, HTTP/2 multiplexing, server middleware pipelines, and DOM/CSSOM construction with GPU layer compositing.',
      result:
        'Demonstrates holistic systems thinking from network sockets to 60fps frame budgets.',
    },
  },
];

export const InterviewPrepPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'behavioral' | 'technical' | 'situational'>('all');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<InterviewEvaluation | null>(null);
  const [showIdealAnswer, setShowIdealAnswer] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeakingQuestion, setIsSpeakingQuestion] = useState(false);

  const filteredQuestions = INTERVIEW_QUESTIONS.filter(
    (q) => selectedCategory === 'all' || q.category === selectedCategory
  );
  const activeQuestion = filteredQuestions[currentQuestionIndex] || filteredQuestions[0];

  const handleEvaluateAnswer = async () => {
    if (!userAnswer.trim()) return;
    setIsEvaluating(true);
    try {
      const result = await evaluateInterviewAnswerWithAI(
        activeQuestion.question,
        userAnswer,
        activeQuestion.role
      );
      setEvaluation(result);

      if (result.score >= 85) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsEvaluating(false);
    }
  };

  const speakQuestion = () => {
    if ('speechSynthesis' in window) {
      if (isSpeakingQuestion) {
        window.speechSynthesis.cancel();
        setIsSpeakingQuestion(false);
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(activeQuestion.question);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeakingQuestion(false);
      utterance.onerror = () => setIsSpeakingQuestion(false);
      setIsSpeakingQuestion(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleSpeechRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please type your answer.');
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsRecording(true);
      recognition.onerror = () => setIsRecording(false);
      recognition.onend = () => setIsRecording(false);

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setUserAnswer((prev) => (prev ? `${prev} ${transcript}` : transcript));
      };

      recognition.start();
    } catch (e) {
      console.error(e);
      setIsRecording(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Feature 6</span>
            <span className="px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-[10px] text-cyan-300 font-semibold">
              Live AI Mock Interviewer
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">AI Interview Preparation</h1>
          <p className="text-sm text-slate-400 mt-1">
            Practice real behavioral and technical interview questions with instant STAR evaluation, scoring, and voice support.
          </p>
        </div>

        {/* Category Controls */}
        <div className="flex items-center gap-1 bg-[#12131b] border border-[#212330] p-1 rounded-xl">
          {(['all', 'behavioral', 'technical', 'situational'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentQuestionIndex(0);
                setEvaluation(null);
                setShowIdealAnswer(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white/[0.1] text-white font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Question Drawer & Answer Studio */}
        <div className="lg:col-span-7 space-y-6">
          {/* Question Card */}
          <div className="p-6 sm:p-7 bg-[#12131b] border border-[#212330] rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
                <span className="text-indigo-400 font-sans font-medium capitalize">{activeQuestion.category}</span>
                <span aria-hidden="true">·</span>
                <span>{activeQuestion.difficulty} Level</span>
              </div>

              {/* TTS Read Aloud Button */}
              <button
                onClick={speakQuestion}
                className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isSpeakingQuestion
                    ? 'bg-indigo-950 border-indigo-500 text-indigo-300 animate-pulse'
                    : 'bg-[#161822] border-[#252838] text-zinc-300 hover:text-white'
                }`}
                title="Listen to interviewer"
              >
                <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>{isSpeakingQuestion ? 'Speaking...' : 'Listen'}</span>
              </button>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
              "{activeQuestion.question}"
            </h3>

            {/* Answer Guidelines Checklist */}
            <div className="p-3.5 bg-[#0b0c10] rounded-xl border border-[#1e202c] space-y-1.5">
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block">
                Target Evaluation Rubric
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-zinc-300">
                {activeQuestion.idealAnswerGuidelines.map((g, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span className="leading-tight">{g}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* User Answer Input Box */}
          <div className="p-6 bg-[#12131b] border border-[#212330] rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-indigo-400" />
                Your Spoken / Written Response
              </label>

              {/* Microphone Speech-to-Text Button */}
              <button
                type="button"
                onClick={toggleSpeechRecognition}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                  isRecording
                    ? 'bg-rose-950 border-rose-600 text-rose-300 animate-pulse'
                    : 'bg-[#161822] border-[#252838] text-zinc-300 hover:text-white'
                }`}
              >
                {isRecording ? <MicOff className="w-3.5 h-3.5 text-rose-400" /> : <Mic className="w-3.5 h-3.5 text-indigo-400" />}
                <span>{isRecording ? 'Listening (Click to Stop)' : 'Voice Mic Input'}</span>
              </button>
            </div>

            <textarea
              rows={8}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Structure your answer using the STAR method: Situation (1-2 sentences), Task (what was needed), Action (specific tools, decisions, leadership), Result (quantified business impact)..."
              className="w-full p-4 bg-[#0b0c10] border border-[#212330] rounded-xl text-xs sm:text-sm text-zinc-100 leading-relaxed focus:outline-none focus:border-indigo-500"
            />

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowIdealAnswer(!showIdealAnswer)}
                  className="px-3 py-1.5 rounded-lg bg-[#0b0c10] border border-[#212330] hover:border-[#303346] text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  {showIdealAnswer ? 'Hide Model STAR Answer' : 'View Sample Model Answer'}
                </button>

                {filteredQuestions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentQuestionIndex((prev) => (prev + 1) % filteredQuestions.length);
                      setUserAnswer('');
                      setEvaluation(null);
                      setShowIdealAnswer(false);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#0b0c10] border border-[#212330] hover:border-[#303346] text-xs text-zinc-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Next Question</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <button
                onClick={handleEvaluateAnswer}
                disabled={isEvaluating || !userAnswer.trim()}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 disabled:opacity-50 text-white text-xs font-semibold rounded-xl shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
              >
                {isEvaluating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Scoring Answer...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Evaluate with AI</span>
                  </>
                )}
              </button>
            </div>

            {/* Model Answer Drawer */}
            {showIdealAnswer && (
              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/60 space-y-2.5 animate-in fade-in">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
                  Model STAR Response Reference
                </span>
                <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                  <p>
                    <strong className="text-cyan-400">Situation: </strong>
                    {activeQuestion.sampleStarResponse.situation}
                  </p>
                  <p>
                    <strong className="text-cyan-400">Task: </strong>
                    {activeQuestion.sampleStarResponse.task}
                  </p>
                  <p>
                    <strong className="text-cyan-400">Action: </strong>
                    {activeQuestion.sampleStarResponse.action}
                  </p>
                  <p>
                    <strong className="text-emerald-400">Result: </strong>
                    {activeQuestion.sampleStarResponse.result}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: AI Feedback & Scoring Report */}
        <div className="lg:col-span-5 space-y-6">
          {evaluation ? (
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl space-y-6">
              {/* Score Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center shadow-inner">
                    <span className="text-2xl font-extrabold text-cyan-400">{evaluation.score}</span>
                    <span className="text-[9px] uppercase font-bold text-slate-500">/ 100</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                      STAR Performance
                    </span>
                    <h4 className="text-base font-bold text-white">
                      {evaluation.score >= 85
                        ? 'Strong Hire Rating'
                        : evaluation.score >= 70
                        ? 'Hire with Polish'
                        : 'Needs More Concrete Details'}
                    </h4>
                  </div>
                </div>

                <div className="p-2.5 rounded-2xl bg-cyan-950 border border-cyan-800 text-cyan-400">
                  <Award className="w-6 h-6" />
                </div>
              </div>

              {/* Feedback Summary */}
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Interviewer Verdict
                </span>
                <p className="text-xs text-slate-200 leading-relaxed bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                  {evaluation.feedback}
                </p>
              </div>

              {/* STAR Assessment Breakdown */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  STAR Component Breakdown
                </span>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
                  <span className="font-bold text-cyan-400">1. Situation & Task Framing</span>
                  <p className="text-slate-300">{evaluation.starAssessment.situationTask}</p>
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
                  <span className="font-bold text-indigo-400">2. Action & Decision Rigor</span>
                  <p className="text-slate-300">{evaluation.starAssessment.actionDetail}</p>
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
                  <span className="font-bold text-emerald-400">3. Measurable Result & Takeaways</span>
                  <p className="text-slate-300">{evaluation.starAssessment.measurableResult}</p>
                </div>
              </div>

              {/* Strengths & Improvements */}
              <div className="grid grid-cols-1 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-900/60 space-y-1.5">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Key Strengths
                  </span>
                  <ul className="text-xs text-emerald-200/90 space-y-1">
                    {evaluation.strengths.map((s, idx) => (
                      <li key={idx}>• {s}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-900/60 space-y-1.5">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    Suggested Improvements
                  </span>
                  <ul className="text-xs text-amber-200/90 space-y-1">
                    {evaluation.improvements.map((imp, idx) => (
                      <li key={idx}>• {imp}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Better Phrasing Tip */}
              {evaluation.betterPhrasingTip && (
                <div className="p-3.5 bg-gradient-to-r from-slate-950 to-indigo-950/60 border border-indigo-800/80 rounded-2xl space-y-1">
                  <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    Pro Punchline Tip
                  </span>
                  <p className="text-xs text-slate-300 italic">
                    "{evaluation.betterPhrasingTip}"
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-10 text-center bg-slate-900 border border-slate-800 rounded-3xl text-slate-400 space-y-3">
              <BrainCircuit className="w-12 h-12 text-cyan-400 mx-auto" />
              <h4 className="text-sm font-bold text-white">Ready for Mock Interview</h4>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                Type or speak your answer to receive an instant STAR framework evaluation and hireability score.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
