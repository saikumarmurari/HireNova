import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Sparkles,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  RefreshCw,
  Target,
  Layers,
  ExternalLink,
  Briefcase,
} from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { analyzeSkillGapWithAI } from '../services/aiService';
import { SkillGapAnalysis } from '../types';

const TARGET_ROLES = [
  'Senior Frontend Engineer',
  'Full Stack Engineer',
  'AI / Machine Learning Engineer',
  'Cloud Infrastructure Architect',
];

export const SkillGapPage: React.FC = () => {
  const { resume } = useResume();
  const [selectedRole, setSelectedRole] = useState(TARGET_ROLES[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [gapAnalysis, setGapAnalysis] = useState<SkillGapAnalysis | null>(null);

  // Extract all user skills from active resume
  const userSkillsList = resume.skills.flatMap((s) => s.items);

  const runAnalysis = async (role: string) => {
    setIsAnalyzing(true);
    try {
      const res = await analyzeSkillGapWithAI(userSkillsList, role);
      setGapAnalysis(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    runAnalysis(selectedRole);
  }, [selectedRole]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs text-zinc-400">
            <span className="font-semibold text-indigo-400">Career Trajectory</span>
            <span>·</span>
            <span>Market Benchmark & Learning Milestones</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Skill Gap Analyzer</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Compare your active skillset against top market expectations, discover deficiencies, and get a weekly learning roadmap.
          </p>
        </div>

        {/* Target Role Selector */}
        <div className="flex items-center gap-2 bg-[#12131b] border border-[#212330] p-1.5 rounded-xl">
          <span className="text-xs text-zinc-400 px-2 font-medium flex items-center gap-1">
            <Target className="w-3.5 h-3.5 text-indigo-400" />
            Target:
          </span>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="bg-[#0b0c10] text-white border border-[#212330] rounded-lg px-3 py-1.5 text-xs font-semibold focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            {TARGET_ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      {gapAnalysis && (
        <div className="space-y-8">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Readiness Card */}
            <div className="p-6 bg-[#12131b] border border-[#212330] rounded-2xl shadow-sm flex items-center gap-5">
              <div className="relative w-20 h-20 rounded-2xl bg-[#0b0c10] border border-[#212330] flex flex-col items-center justify-center">
                <span className="text-2xl font-extrabold text-indigo-400">
                  {gapAnalysis.readinessPercentage}%
                </span>
                <span className="text-[9px] uppercase font-bold text-zinc-400">Ready</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                  Market Fit Rating
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {gapAnalysis.readinessPercentage >= 80 ? 'Highly Qualified' : 'Upskilling Needed'}
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Based on current hiring trends for {gapAnalysis.targetRole}
                </p>
              </div>
            </div>

            {/* Time to Close Gap */}
            <div className="p-6 bg-[#12131b] border border-[#212330] rounded-2xl shadow-sm flex items-center gap-5">
              <div className="p-4 rounded-xl bg-violet-950/60 border border-violet-800/80 text-violet-400">
                <Clock className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400">
                  Estimated Timeline
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  ~{gapAnalysis.weeksToJobReady} Weeks to Close Gaps
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  At 8-10 hours/week dedicated study & building
                </p>
              </div>
            </div>

            {/* Skills Analyzed */}
            <div className="p-6 bg-[#12131b] border border-[#212330] rounded-2xl shadow-sm flex items-center gap-5">
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  Candidate Inventory
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {userSkillsList.length} Skills in Resume
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Across languages, libraries, databases & cloud
                </p>
              </div>
            </div>
          </div>

          {/* Skill Breakdown Table / Bars */}
          <div className="p-6 sm:p-8 bg-[#12131b] border border-[#212330] rounded-2xl shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-400" />
                Required Competency Matrix vs Your Resume
              </h3>
              <span className="text-xs text-zinc-400">
                Grey bar: Target expectation · Indigo fill: Your current level
              </span>
            </div>

            <div className="space-y-4">
              {gapAnalysis.requiredSkills.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#0b0c10] border border-[#212330] rounded-xl space-y-2.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{item.name}</span>
                      <span
                        className={`text-[10px] font-medium ${
                          item.importance === 'Essential'
                            ? 'text-rose-400'
                            : item.importance === 'Important'
                            ? 'text-amber-400'
                            : 'text-indigo-400'
                        }`}
                      >
                        · {item.importance}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-zinc-400 font-mono text-[11px]">
                      <span>You: {item.userProficiency}%</span>
                      <span>Target: {item.targetProficiency}%</span>
                      <span
                        className={`font-semibold ${
                          item.gap === 0 ? 'text-emerald-400' : 'text-amber-400'
                        }`}
                      >
                        {item.gap === 0 ? '✓ Aligned' : `-${item.gap}% Gap`}
                      </span>
                    </div>
                  </div>

                  {/* Progress Comparison Bar */}
                  <div className="relative w-full bg-[#1b1d28] h-2 rounded-full overflow-hidden">
                    {/* Target marker */}
                    <div
                      className="absolute top-0 bottom-0 bg-zinc-700 rounded-full opacity-60"
                      style={{ width: `${item.targetProficiency}%` }}
                    />
                    {/* User bar */}
                    <div
                      className="relative h-full rounded-full transition-all duration-700 bg-gradient-to-r from-indigo-500 to-indigo-600"
                      style={{ width: `${item.userProficiency}%` }}
                    />
                  </div>

                  {/* Curated Resource Recommendation */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-[11px] text-zinc-400 border-t border-[#212330]">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Recommended: <strong className="text-zinc-200">{item.recommendedResource}</strong></span>
                      <span className="px-1.5 py-0.5 rounded bg-[#161826] border border-[#212330] text-zinc-400 text-[10px]">
                        {item.resourceType}
                      </span>
                    </span>
                    <span className="text-zinc-400">~{item.estHoursToLearn} hrs study required</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3-Phase Structured Learning Roadmap */}
          <div className="p-6 sm:p-8 bg-[#12131b] border border-[#212330] rounded-2xl shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Tailored Career Acceleration Roadmap
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {gapAnalysis.learningRoadmap.map((phase, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-[#0b0c10] border border-[#212330] rounded-xl space-y-3 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-violet-500" />
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                      {phase.timeline}
                    </span>
                    <span className="text-xs font-semibold text-zinc-400">Phase 0{idx + 1}</span>
                  </div>

                  <h4 className="text-sm font-bold text-white">{phase.phase}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">{phase.focus}</p>

                  <div className="pt-2 border-t border-[#212330] space-y-2">
                    <span className="text-[10px] font-bold uppercase text-zinc-400 block tracking-wider">
                      Target Milestones
                    </span>
                    {phase.milestones.map((m, mIdx) => (
                      <div key={mIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
