import React, { useState } from 'react';
import {
  GitCompare,
  Sparkles,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  RefreshCw,
  Building,
  Briefcase,
  Layers,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { matchJobDescriptionWithAI } from '../services/aiService';
import { JobMatchResult } from '../types';

const SAMPLE_JDS = [
  {
    title: 'Senior Full Stack Infrastructure Engineer',
    company: 'Stripe',
    text: `About Stripe:
Stripe builds economic infrastructure for the internet. Millions of businesses of every size use Stripe's software to accept payments and manage their businesses online.

The Role:
We are seeking a Senior Full Stack Infrastructure Engineer to build next-generation internal tools and customer-facing cloud infrastructure.

Key Requirements:
• 5+ years building distributed web applications with TypeScript, React 19, and Node.js.
• Experience architecting high-scale REST & GraphQL APIs and relational databases (PostgreSQL).
• Proven track record with containerization (Docker, Kubernetes) and cloud deployments (AWS / GCP).
• Strong focus on latency, observability, CI/CD automated deployment pipelines, and microservices.
• Background mentoring engineers, championing unit test coverage, and driving system resilience.`,
  },
  {
    title: 'Staff AI Systems Engineer',
    company: 'Anthropic',
    text: `About Anthropic:
Anthropic is an AI safety and research company working to build reliable, beneficial artificial intelligence systems.

The Role:
We are looking for a Staff AI Systems Engineer to architect large-scale model evaluation infrastructure and full-stack developer interfaces.

Key Qualifications:
• Deep fluency with modern TypeScript, Python, and asynchronous web services.
• Experience scaling high-throughput distributed message queues (Kafka, Redis) and real-time streaming interfaces.
• Familiarity with modern AI model APIs (Gemini, Claude, LLM inference tooling) and RAG workflows.
• Demonstrated leadership driving cross-functional alignment across research and product teams.`,
  },
];

export const JobMatcherPage: React.FC<{ onApplySummaryToResume?: () => void }> = () => {
  const { resume, getRawResumeText, updatePersonalInfo } = useResume();
  const [roleTitle, setRoleTitle] = useState('Senior Full Stack Engineer');
  const [companyName, setCompanyName] = useState('Stripe');
  const [jobDescription, setJobDescription] = useState(SAMPLE_JDS[0].text);
  const [isMatching, setIsMatching] = useState(false);
  const [matchResult, setMatchResult] = useState<JobMatchResult | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [appliedNotice, setAppliedNotice] = useState(false);

  const handleMatch = async () => {
    setIsMatching(true);
    try {
      const resumeText = getRawResumeText();
      const res = await matchJobDescriptionWithAI(
        resumeText,
        jobDescription,
        roleTitle,
        companyName
      );
      setMatchResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsMatching(false);
    }
  };

  const handleLoadSample = (sample: (typeof SAMPLE_JDS)[0]) => {
    setRoleTitle(sample.title);
    setCompanyName(sample.company);
    setJobDescription(sample.text);
  };

  const handleApplySummary = () => {
    if (matchResult?.optimizedSummarySuggestion) {
      updatePersonalInfo({ summary: matchResult.optimizedSummarySuggestion });
      setAppliedNotice(true);
      setTimeout(() => setAppliedNotice(false), 3000);
    }
  };

  const copySummaryText = () => {
    if (matchResult?.optimizedSummarySuggestion) {
      navigator.clipboard.writeText(matchResult.optimizedSummarySuggestion);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs text-zinc-400">
            <span className="font-semibold text-indigo-400">Semantic Engine</span>
            <span>·</span>
            <span>Resume vs Job Posting Alignment</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Job Description Matcher</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Check how closely your resume aligns with any target job posting, uncover missing keywords, and tailor your profile.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#12131b] border border-[#212330] rounded-xl p-1 text-xs text-zinc-300">
            <span className="px-2 text-[11px] text-zinc-400 font-medium">Quick Preset:</span>
            {SAMPLE_JDS.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleLoadSample(s)}
                className="px-2.5 py-1 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors cursor-pointer"
              >
                {s.company}
              </button>
            ))}
          </div>

          <button
            onClick={handleMatch}
            disabled={isMatching}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-semibold rounded-xl shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            {isMatching ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Computing Semantic Intersections...</span>
              </>
            ) : (
              <>
                <GitCompare className="w-4 h-4" />
                <span>Match Resume to JD</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input Job Description Form */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 bg-[#12131b] border border-[#212330] rounded-2xl shadow-sm space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                  Target Role Title
                </label>
                <input
                  type="text"
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  placeholder="e.g. Senior Full Stack Engineer"
                  className="w-full px-3 py-2 bg-[#0b0c10] border border-[#212330] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-violet-400" />
                  Hiring Company
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Stripe, Google, Linear"
                  className="w-full px-3 py-2 bg-[#0b0c10] border border-[#212330] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-zinc-300">
                  Target Job Description Text
                </label>
                <span className="text-[11px] text-zinc-400 font-mono">
                  {jobDescription.split(/\s+/).filter(Boolean).length} words
                </span>
              </div>
              <textarea
                rows={14}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the full job requirements & responsibilities from LinkedIn, Indeed, or company careers page..."
                className="w-full p-3.5 bg-[#0b0c10] border border-[#212330] rounded-xl text-xs text-zinc-200 font-sans leading-relaxed focus:outline-none focus:border-indigo-500 resize-y"
              />
            </div>

            <div className="p-3 bg-[#0b0c10] rounded-xl border border-[#212330] text-xs text-zinc-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              <span>Comparing against active resume: <strong className="text-zinc-200">{resume.personalInfo.fullName}</strong></span>
            </div>
          </div>
        </div>

        {/* Right: Match Results */}
        <div className="lg:col-span-7 space-y-6">
          {matchResult ? (
            <>
              {/* Score Header Card */}
              <div className="p-6 bg-[#12131b] border border-[#212330] rounded-2xl shadow-sm">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-[#212330]">
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-2xl bg-[#0b0c10] border border-[#212330] flex flex-col items-center justify-center">
                      <span className="text-3xl font-extrabold text-indigo-400 tracking-tight">
                        {matchResult.matchScore}%
                      </span>
                      <span className="text-[10px] uppercase font-bold text-zinc-400 mt-0.5">Match</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-xs text-zinc-400">
                        <span className="font-semibold text-indigo-400">
                          {matchResult.companyName}
                        </span>
                        <span>·</span>
                        <span className="text-zinc-300 font-medium">
                          {matchResult.matchGrade} Compatibility
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white mt-1">{matchResult.roleTitle}</h3>
                      <p className="text-xs text-zinc-400 mt-1">
                        {matchResult.matchScore >= 80
                          ? 'Outstanding resume alignment. You meet all primary criteria.'
                          : matchResult.matchScore >= 65
                          ? 'Solid base. Adding the missing technical terms below will elevate your application.'
                          : 'Moderate overlap. Recommended tailoring before sending application.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Matched vs Missing Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                  {/* Matched Skills */}
                  <div className="p-4 bg-[#0b0c10] rounded-xl border border-emerald-950/80 space-y-2">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4" />
                      Matched Skills ({matchResult.matchedSkills.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {matchResult.matchedSkills.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-emerald-950/70 border border-emerald-800/80 text-emerald-300 text-xs font-medium"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Missing Critical Skills */}
                  <div className="p-4 bg-[#0b0c10] rounded-xl border border-rose-950/80 space-y-2">
                    <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5 uppercase tracking-wider">
                      <XCircle className="w-4 h-4" />
                      Missing High-Impact Skills ({matchResult.missingSkills.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {matchResult.missingSkills.length > 0 ? (
                        matchResult.missingSkills.map((s, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-rose-950/70 border border-rose-800/80 text-rose-300 text-xs font-medium"
                          >
                            {s}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-zinc-400 italic">No missing core skills detected!</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* ATS Compatibility Checklist */}
              <div className="p-6 bg-[#12131b] border border-[#212330] rounded-2xl shadow-sm space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-400" />
                  ATS Automated Filter Checklist
                </h3>

                <div className="space-y-2.5">
                  {matchResult.atsCompatibilityChecklist.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-[#0b0c10] rounded-xl border border-[#212330] flex items-start justify-between gap-3"
                    >
                      <div className="flex items-start gap-2.5">
                        {item.passed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className="text-xs font-semibold text-white">{item.criterion}</p>
                          <p className="text-xs text-zinc-400 mt-0.5">{item.notes}</p>
                        </div>
                      </div>
                      <span
                        className={`text-[11px] font-semibold shrink-0 ${
                          item.passed
                            ? 'text-emerald-400'
                            : 'text-amber-400'
                        }`}
                      >
                        {item.passed ? 'PASSED' : 'CHECK'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tailoring Recommendations */}
              <div className="p-6 bg-[#12131b] border border-[#212330] rounded-2xl shadow-sm space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                  Tailoring Recommendations to Reach 95%+
                </h3>

                <ul className="space-y-2">
                  {matchResult.tailoringRecommendations.map((rec, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-zinc-300 bg-[#0b0c10] p-3 rounded-xl border border-[#212330] flex items-start gap-2.5"
                    >
                      <span className="text-indigo-400 font-bold">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* AI Tailored Executive Summary Suggestion */}
              {matchResult.optimizedSummarySuggestion && (
                <div className="p-6 bg-[#12131b] border border-indigo-700/50 rounded-2xl shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-400" />
                      JD-Tailored Summary Suggestion
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={copySummaryText}
                        className="px-2.5 py-1.5 rounded-lg bg-[#0b0c10] border border-[#212330] text-zinc-300 hover:text-white text-xs flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedSummary ? 'Copied' : 'Copy'}</span>
                      </button>

                      <button
                        onClick={handleApplySummary}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-sm transition-all cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Apply to Active Resume</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-200 leading-relaxed bg-[#0b0c10] p-3.5 rounded-xl border border-[#212330]">
                    "{matchResult.optimizedSummarySuggestion}"
                  </p>

                  {appliedNotice && (
                    <p className="text-xs text-emerald-400 font-semibold animate-in fade-in">
                      ✓ Summary updated in your active resume!
                    </p>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="p-12 text-center bg-[#12131b] border border-[#212330] rounded-2xl text-zinc-400">
              <GitCompare className="w-12 h-12 text-indigo-400 mx-auto mb-3 animate-pulse" />
              <p className="text-sm font-semibold text-white">Click "Match Resume to JD" to compare</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
