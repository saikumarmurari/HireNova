import React, { useState } from 'react';
import {
  SearchCode,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  FileText,
  RefreshCw,
  Zap,
  ArrowRight,
  ShieldCheck,
  Target,
} from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { analyzeResumeWithAI } from '../services/aiService';
import { ResumeAnalysisScore } from '../types';

export const ResumeAnalyzerPage: React.FC<{ onNavigateToBuilder?: () => void }> = ({
  onNavigateToBuilder,
}) => {
  const { resume, getRawResumeText } = useResume();
  const [inputText, setInputText] = useState(getRawResumeText());
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<ResumeAnalysisScore | null>(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeResumeWithAI(inputText, resume.personalInfo.headline);
      setReport(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLoadActiveResume = () => {
    const raw = getRawResumeText();
    setInputText(raw);
  };

  // Run initial analysis automatically on mount if no report
  React.useEffect(() => {
    if (!report) {
      handleAnalyze();
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs text-zinc-400">
            <span className="font-semibold text-indigo-400">Diagnostic Suite</span>
            <span>·</span>
            <span>Deep ATS Scoring & Keyword Gap Scanner</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Resume Analyzer</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Identify critical weaknesses, missing industry keywords, and ATS formatting flaws before recruiters do.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleLoadActiveResume}
            className="px-3.5 py-2.5 rounded-xl bg-[#12131b] hover:bg-[#1a1c27] text-xs font-medium text-zinc-200 border border-[#212330] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span>Sync Active Resume</span>
          </button>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-semibold rounded-xl shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Scanning ATS Rules...</span>
              </>
            ) : (
              <>
                <SearchCode className="w-4 h-4" />
                <span>Run Full AI Scan</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: Input Form vs Report */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input text area / Source inspect */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 bg-[#12131b] border border-[#212330] rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                Resume Plaintext Payload
              </h3>
              <span className="text-[11px] text-zinc-400 font-mono">
                {inputText.split(/\s+/).filter(Boolean).length} words
              </span>
            </div>

            <textarea
              rows={16}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste any resume text here for instant diagnostic parsing..."
              className="w-full p-3.5 bg-[#0b0c10] border border-[#212330] rounded-xl text-xs text-zinc-200 font-mono leading-relaxed focus:outline-none focus:border-indigo-500 resize-y"
            />

            <p className="text-[11px] text-zinc-400 mt-2">
              Tip: You can modify or paste any candidate resume to stress-test how top ATS algorithms evaluate it.
            </p>
          </div>
        </div>

        {/* Right Column: AI Analysis Report */}
        <div className="lg:col-span-7 space-y-6">
          {report ? (
            <>
              {/* Score Badges Summary Grid */}
              <div className="p-6 bg-[#12131b] border border-[#212330] rounded-2xl shadow-sm">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-[#212330]">
                  <div className="flex items-center gap-4">
                    <div className="relative w-24 h-24 rounded-2xl bg-[#0b0c10] border border-[#212330] flex flex-col items-center justify-center">
                      <span className="text-3xl font-extrabold text-indigo-400 tracking-tight">
                        {report.overallScore}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-zinc-400 mt-0.5">Overall</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-xs text-zinc-400">
                        <span className="font-semibold text-emerald-400">Diagnostic Result</span>
                        <span>·</span>
                        <span className="text-zinc-300 font-medium">
                          {report.overallScore >= 80 ? 'Interview Ready' : 'Optimization Needed'}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white mt-1">
                        {report.overallScore >= 85
                          ? 'Top 10% ATS Score'
                          : report.overallScore >= 70
                          ? 'Competitive Profile'
                          : 'Needs High-Impact Revision'}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1 max-w-md leading-relaxed">
                        {report.summaryFeedback}
                      </p>
                    </div>
                  </div>

                  {onNavigateToBuilder && (
                    <button
                      onClick={onNavigateToBuilder}
                      className="w-full sm:w-auto px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all cursor-pointer whitespace-nowrap"
                    >
                      <span>Fix in Builder</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Sub-Metric Bars */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
                  <div className="p-3 bg-[#0b0c10] rounded-xl border border-[#212330]">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-zinc-400">ATS Match</span>
                      <span className="font-bold text-indigo-400">{report.atsScore}%</span>
                    </div>
                    <div className="w-full bg-[#1b1d28] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${report.atsScore}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-[#0b0c10] rounded-xl border border-[#212330]">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-zinc-400">Impact Ratio</span>
                      <span className="font-bold text-violet-400">{report.impactScore}%</span>
                    </div>
                    <div className="w-full bg-[#1b1d28] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-violet-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${report.impactScore}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-[#0b0c10] rounded-xl border border-[#212330]">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-zinc-400">Readability</span>
                      <span className="font-bold text-emerald-400">{report.readabilityScore}%</span>
                    </div>
                    <div className="w-full bg-[#1b1d28] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${report.readabilityScore}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-[#0b0c10] rounded-xl border border-[#212330]">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-zinc-400">Grammar & Tone</span>
                      <span className="font-bold text-amber-400">{report.grammarScore}%</span>
                    </div>
                    <div className="w-full bg-[#1b1d28] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${report.grammarScore}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Quantitative Signals */}
                <div className="mt-4 pt-4 border-t border-[#212330] flex flex-wrap gap-4 text-xs text-zinc-300">
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-[#0b0c10] rounded-xl border border-[#212330]">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <strong>{report.actionVerbCount}</strong> Power Verbs Detected
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-[#0b0c10] rounded-xl border border-[#212330]">
                    <Target className="w-3.5 h-3.5 text-indigo-400" />
                    <strong>{report.metricsPresentCount}</strong> Quantified Results ($, %, #)
                  </span>
                </div>
              </div>

              {/* Critical Weaknesses & Recommendations */}
              <div className="p-6 bg-[#12131b] border border-[#212330] rounded-2xl shadow-sm space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  Identified Weaknesses & Actionable Fixes
                </h3>

                <div className="space-y-3">
                  {report.criticalIssues.map((issue, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-[#0b0c10] border border-[#212330] rounded-xl space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              issue.severity === 'high'
                                ? 'bg-rose-500'
                                : issue.severity === 'medium'
                                ? 'bg-amber-500'
                                : 'bg-blue-500'
                            }`}
                          />
                          {issue.section} Section
                        </span>
                        <span
                          className={`text-[11px] font-medium capitalize ${
                            issue.severity === 'high'
                              ? 'text-rose-400'
                              : issue.severity === 'medium'
                              ? 'text-amber-400'
                              : 'text-blue-400'
                          }`}
                        >
                          {issue.severity} Priority
                        </span>
                      </div>
                      <p className="text-xs text-zinc-300 font-medium">{issue.issue}</p>
                      <p className="text-xs text-zinc-400 bg-[#161826] p-2.5 rounded-lg border border-[#212330]">
                        <strong className="text-indigo-400">Recommendation: </strong>
                        {issue.recommendation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Missing High-Value Keywords */}
              <div className="p-6 bg-[#12131b] border border-[#212330] rounded-2xl shadow-sm">
                <h3 className="text-base font-bold text-white flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                  Recommended High-Value Keywords to Inject
                </h3>
                <p className="text-xs text-zinc-400 mb-4">
                  Recruiter algorithms search for these core terms in your target domain. Adding them improves ranking:
                </p>
                <div className="flex flex-wrap gap-2">
                  {report.missingKeywords.map((kw, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-[#0b0c10] border border-indigo-900/60 text-indigo-300 text-xs font-medium flex items-center gap-1.5"
                    >
                      <PlusIcon className="w-3 h-3 text-indigo-400" />
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Plan Checklist */}
              <div className="p-6 bg-[#12131b] border border-[#212330] rounded-2xl shadow-sm">
                <h3 className="text-base font-bold text-white flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  Your 4-Step Optimization Roadmap
                </h3>
                <div className="space-y-2.5">
                  {report.suggestedActionItems.map((action, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 bg-[#0b0c10] rounded-xl border border-[#212330]"
                    >
                      <div className="w-5 h-5 rounded-md bg-indigo-950 border border-indigo-800 text-indigo-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-xs text-zinc-200 leading-relaxed">{action}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="p-12 text-center bg-[#12131b] border border-[#212330] rounded-2xl text-zinc-400">
              <SearchCode className="w-12 h-12 text-indigo-400 mx-auto mb-3 animate-pulse" />
              <p className="text-sm font-semibold text-white">Click "Run Full AI Scan" to begin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
