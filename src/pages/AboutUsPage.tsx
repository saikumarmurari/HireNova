import React from 'react';
import {
  Sparkles,
  User,
  Mail,
  Shield,
  Target,
  Rocket,
  CheckCircle2,
  Heart,
  Globe,
  Award,
  ArrowRight,
} from 'lucide-react';
import { NavTab } from '../components/Navbar';

interface AboutUsPageProps {
  onNavigate: (tab: NavTab) => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#12131b] border border-[#212330] text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>About HireNove</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Empowering Every Candidate to Achieve Their Potential
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          HireNove was founded to democratize executive-tier job preparation tools, leveling the playing field for ambitious engineers, product leaders, and creators worldwide.
        </p>
      </div>

      {/* Founder Spotlight Card */}
      <div className="p-8 sm:p-10 bg-[#12131b] border border-[#212330] rounded-2xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="relative">
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-700 p-1 shadow-lg shadow-indigo-600/20">
              <div className="w-full h-full bg-[#0b0c10] rounded-[14px] flex flex-col items-center justify-center text-indigo-400 font-bold">
                <User className="w-16 h-16 text-indigo-400" />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-md bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider">
              Founder
            </div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-3">
            <div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Pavana Naga Sai Kumar Murari
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-lg bg-indigo-950/80 border border-indigo-800 text-indigo-300 font-semibold">
                  Founder & Lead Architect
                </span>
              </div>
              <p className="text-xs text-indigo-400 font-medium mt-1">
                Product Engineer & AI Career Systems Innovator
              </p>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              "The modern job search has become an asymmetrical battle where automated applicant tracking systems reject 75% of qualified resumes before a human eye ever sees them. I created HireNove to put enterprise-grade intelligence, ATS diagnostics, and mock interview coaching directly into candidate hands—free, transparent, and built with integrity."
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1 text-xs text-zinc-400">
              <a
                href="mailto:saikumarfriendship4@gmail.com"
                className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
              >
                <Mail className="w-4 h-4" />
                <span>saikumarfriendship4@gmail.com</span>
              </a>
              <span className="text-zinc-600">•</span>
              <span className="flex items-center gap-1.5 text-zinc-400">
                <Globe className="w-4 h-4 text-zinc-500" />
                <span>Global Career Platform</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-[#12131b] border border-[#212330] rounded-2xl shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-950/70 border border-indigo-800/80 flex items-center justify-center text-indigo-400">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Our Mission</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Eliminate career ambiguity by pairing real-time algorithmic diagnostics with generative AI coaching, enabling candidates to land roles aligned with their true potential.
          </p>
        </div>

        <div className="p-6 bg-[#12131b] border border-[#212330] rounded-2xl shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-violet-950/70 border border-violet-800/80 flex items-center justify-center text-violet-400">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Candidate Privacy First</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Your career documents are your private property. We never monetize or sell personal candidate resumes to recruiters, third-party data brokers, or advertisers.
          </p>
        </div>

        <div className="p-6 bg-[#12131b] border border-[#212330] rounded-2xl shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-950/70 border border-emerald-800/80 flex items-center justify-center text-emerald-400">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Rigorous AI Quality</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Our AI prompts are engineered with executive recruiter rubrics and STAR frameworks (Situation, Task, Action, Result) to avoid generic buzzword outputs.
          </p>
        </div>
      </div>

      {/* What We Offer Overview */}
      <div className="p-8 bg-[#12131b] border border-[#212330] rounded-2xl shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-white">What You Can Accomplish on HireNove</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-300">
          <div className="flex items-start gap-3 p-3 bg-[#0b0c10] rounded-xl border border-[#212330]">
            <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block">AI Resume Builder:</strong>
              Format executive multi-section resumes with quantified accomplishment bullets and 1-click PDF export.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-[#0b0c10] rounded-xl border border-[#212330]">
            <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block">Resume Analyzer:</strong>
              Inspect 0–100 ATS scores, weak phrasing, readability indices, and missing high-value domain keywords.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-[#0b0c10] rounded-xl border border-[#212330]">
            <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block">Job Description Matcher:</strong>
              Compare your experience against job requirements to pinpoint gaps before applying.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-[#0b0c10] rounded-xl border border-[#212330]">
            <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block">AI Interview Prep:</strong>
              Simulated audio mock interviews with instant STAR scoring, strengths feedback, and model answers.
            </div>
          </div>
        </div>
      </div>

      {/* Contact Callout Banner */}
      <div className="p-6 rounded-2xl bg-[#12131b] border border-[#212330] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h4 className="text-sm font-bold text-white">Have questions, feedback, or partnership ideas?</h4>
          <p className="text-xs text-zinc-400 mt-0.5">
            Founder Pavana Naga Sai Kumar Murari personally reviews candidate feedback and feature requests.
          </p>
        </div>
        <button
          onClick={() => onNavigate('contact')}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all cursor-pointer whitespace-nowrap"
        >
          <span>Contact Founder & Team</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
