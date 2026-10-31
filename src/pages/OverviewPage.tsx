import React from 'react';
import {
  FileText,
  SearchCode,
  GitCompare,
  Mail,
  Kanban,
  Mic,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Box,
  Compass,
  Zap,
} from 'lucide-react';
import { ThreeCareerNexus } from '../components/ThreeCareerNexus';
import { NavTab } from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useJobs } from '../context/JobContext';
import { useResume } from '../context/ResumeContext';

interface OverviewPageProps {
  onSelectTab: (tab: NavTab) => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({ onSelectTab }) => {
  const { user } = useAuth();
  const { stats } = useJobs();
  const { resume } = useResume();

  const features = [
    {
      id: 'builder' as NavTab,
      index: '01',
      title: 'AI Resume Builder',
      teluguDesc: 'Professional resumes create cheyyadam',
      desc: 'Architect ATS-compliant executive resumes with quantified metrics, live document preview, and instant print/PDF export.',
      icon: <FileText className="w-5 h-5 text-blue-400" />,
      tag: 'Studio',
      accentGlow: 'hover:border-blue-500/50 hover:shadow-blue-500/5',
    },
    {
      id: 'analyzer' as NavTab,
      index: '02',
      title: 'Resume Analyzer',
      teluguDesc: 'Resume-lo mistakes, missing skills identify cheyyadam',
      desc: 'Deep diagnostic audit scanning ATS score (0–100), readability, impact verbs, and missing high-value domain keywords.',
      icon: <SearchCode className="w-5 h-5 text-indigo-400" />,
      tag: 'Diagnostics',
      accentGlow: 'hover:border-indigo-500/50 hover:shadow-indigo-500/5',
    },
    {
      id: 'matcher' as NavTab,
      index: '03',
      title: 'Job Description Matcher',
      teluguDesc: 'Job description ki resume entha match avuthundo analyze cheyyadam',
      desc: 'Compare candidate resume against target job postings to calculate match score %, uncover missing skills, and tailor summaries.',
      icon: <GitCompare className="w-5 h-5 text-sky-400" />,
      tag: 'Semantic Match',
      accentGlow: 'hover:border-sky-500/50 hover:shadow-sky-500/5',
    },
    {
      id: 'cover-letter' as NavTab,
      index: '04',
      title: 'Cover Letter Generator',
      teluguDesc: 'Job ki suitable cover letter create cheyyadam',
      desc: 'Generate tailored, persuasive cover letters matching your desired tone (confident, executive, passionate) with inline live editing.',
      icon: <Mail className="w-5 h-5 text-violet-400" />,
      tag: 'Copywriter',
      accentGlow: 'hover:border-violet-500/50 hover:shadow-violet-500/5',
    },
    {
      id: 'tracker' as NavTab,
      index: '05',
      title: 'Job Application Tracker',
      teluguDesc: 'Applied, Interview, Rejected, Selected statuses track cheyyadam',
      desc: 'Visual Kanban pipeline tracking opportunities through Applied, Interview, Offer, Selected, and Rejected with salary metrics.',
      icon: <Kanban className="w-5 h-5 text-emerald-400" />,
      tag: 'Pipeline',
      accentGlow: 'hover:border-emerald-500/50 hover:shadow-emerald-500/5',
    },
    {
      id: 'interview' as NavTab,
      index: '06',
      title: 'AI Interview Simulator',
      teluguDesc: 'Questions, answers, mock interviews',
      desc: 'Practice role-specific behavioral and technical questions with audio voice readouts, microphone input, and instant STAR scoring.',
      icon: <Mic className="w-5 h-5 text-amber-400" />,
      tag: 'STAR Practice',
      accentGlow: 'hover:border-amber-500/50 hover:shadow-amber-500/5',
    },
    {
      id: 'skill-gap' as NavTab,
      index: '07',
      title: 'Skill Gap Analyzer',
      teluguDesc: 'Job ki kavalsina skills, user daggara unna skills compare cheyyadam',
      desc: 'Benchmark your skillset against industry standards, estimate study timelines, and unlock a customized 3-phase learning roadmap.',
      icon: <TrendingUp className="w-5 h-5 text-rose-400" />,
      tag: 'Roadmap',
      accentGlow: 'hover:border-rose-500/50 hover:shadow-rose-500/5',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
      {/* Editorial Hero Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4">
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
            <span className="text-indigo-400">HireNove Career Intelligence</span>
            <span aria-hidden="true">·</span>
            <span>Founder: Pavana Naga Sai Kumar Murari</span>
            <span aria-hidden="true">·</span>
            <span>Version 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            Land high-impact roles with clarity & precision.
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Welcome back, <strong className="text-zinc-200">{user?.name || 'Candidate'}</strong>. A unified, human-crafted career suite engineered for serious job seekers—combining ATS resume building, semantic JD alignment, mock interview coaching, and pipeline tracking.
          </p>
        </div>

        {/* Quick Action Links */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onSelectTab('builder')}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Open Resume Studio</span>
          </button>
          <button
            onClick={() => onSelectTab('interview')}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#161822] hover:bg-[#1e202d] border border-[#27293a] text-zinc-200 hover:text-white text-xs font-medium rounded-xl transition-all cursor-pointer"
          >
            <Mic className="w-4 h-4 text-indigo-400" />
            <span>Mock Interview Session</span>
          </button>
        </div>
      </div>

      {/* 3D Career Intelligence Nexus Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-zinc-300 font-semibold">
            <Box className="w-4 h-4 text-indigo-400" />
            <span>Interactive 3D Career Nexus</span>
            <span className="text-zinc-600">·</span>
            <span className="text-[11px] text-zinc-500 font-normal">Spatial Career Visualizer</span>
          </div>
          <span className="text-[11px] text-zinc-500 hidden sm:inline">
            Drag to rotate • Scroll to zoom • Collapsible dock
          </span>
        </div>

        {/* 3D Canvas Mount */}
        <ThreeCareerNexus onSelectFeature={(id) => onSelectTab(id as NavTab)} />
      </section>

      {/* Live Pipeline Metrics Overview */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-[#12131b] border border-[#212330] rounded-2xl space-y-1.5 transition-all hover:border-[#2f3245]">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Tracked Pipeline</span>
            <Kanban className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">{stats.total}</div>
          <p className="text-[11px] text-zinc-500">{stats.interview} currently in interviews</p>
        </div>

        <div className="p-5 bg-[#12131b] border border-[#212330] rounded-2xl space-y-1.5 transition-all hover:border-[#2f3245]">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Offers Received</span>
            <Sparkles className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-3xl font-extrabold text-violet-400 tracking-tight">{stats.offer}</div>
          <p className="text-[11px] text-zinc-500">{stats.offerRate}% conversion rate</p>
        </div>

        <div className="p-5 bg-[#12131b] border border-[#212330] rounded-2xl space-y-1.5 transition-all hover:border-[#2f3245]">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Resume ATS Score</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 tracking-tight">92 / 100</div>
          <p className="text-[11px] text-zinc-500">Optimized for enterprise screeners</p>
        </div>

        <div className="p-5 bg-[#12131b] border border-[#212330] rounded-2xl space-y-1.5 transition-all hover:border-[#2f3245]">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Interview Readiness</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-amber-400 tracking-tight">88%</div>
          <p className="text-[11px] text-zinc-500">STAR framework calibrated</p>
        </div>
      </section>

      {/* 7 Core Features Showcase Grid */}
      <section className="space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium mb-1">
            <span>Modular Workspace</span>
            <span aria-hidden="true">·</span>
            <span>7 Core Intelligence Systems</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Complete Career Operating Suite
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl leading-relaxed">
            Every step of your career acceleration engineered with dedicated precision tools:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.id}
              onClick={() => onSelectTab(f.id)}
              className={`p-6 bg-[#12131b] border border-[#212330] ${f.accentGlow} rounded-2xl transition-all duration-200 cursor-pointer flex flex-col justify-between group shadow-sm hover:shadow-xl hover:-translate-y-0.5`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-[#181a24] border border-[#282a3b] text-white">
                    {f.icon}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
                    <span>{f.index}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-zinc-400 font-sans font-medium text-[11px]">{f.tag}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-[11px] font-medium text-zinc-400 mt-0.5">
                    {f.teluguDesc}
                  </p>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-2.5">
                    {f.desc}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-5 border-t border-[#1d1f2a] flex items-center justify-between text-xs font-medium text-zinc-400 group-hover:text-white transition-colors">
                <span>Open Tool</span>
                <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
