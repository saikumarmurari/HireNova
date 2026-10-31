import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';
import { JobProvider } from './context/JobContext';
import { Navbar, NavTab } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { OverviewPage } from './pages/OverviewPage';
import { ResumeBuilderPage } from './pages/ResumeBuilderPage';
import { ResumeAnalyzerPage } from './pages/ResumeAnalyzerPage';
import { JobMatcherPage } from './pages/JobMatcherPage';
import { CoverLetterPage } from './pages/CoverLetterPage';
import { JobTrackerPage } from './pages/JobTrackerPage';
import { InterviewPrepPage } from './pages/InterviewPrepPage';
import { SkillGapPage } from './pages/SkillGapPage';
import { ProfilePage } from './pages/ProfilePage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { Sparkles, Mail, User, Shield, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('overview');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTab = (tab: NavTab) => {
    setActiveTab(tab);
    scrollToTop();
  };

  return (
    <AuthProvider>
      <ResumeProvider>
        <JobProvider>
          <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
            {/* Top Navigation */}
            <Navbar activeTab={activeTab} onSelectTab={handleSelectTab} />

            {/* Main Application Body */}
            <main className="flex-1">
              {activeTab === 'overview' && (
                <OverviewPage onSelectTab={handleSelectTab} />
              )}
              {activeTab === 'builder' && (
                <ResumeBuilderPage />
              )}
              {activeTab === 'analyzer' && (
                <ResumeAnalyzerPage onNavigateToBuilder={() => handleSelectTab('builder')} />
              )}
              {activeTab === 'matcher' && (
                <JobMatcherPage onApplySummaryToResume={() => handleSelectTab('builder')} />
              )}
              {activeTab === 'cover-letter' && (
                <CoverLetterPage />
              )}
              {activeTab === 'tracker' && (
                <JobTrackerPage />
              )}
              {activeTab === 'interview' && (
                <InterviewPrepPage />
              )}
              {activeTab === 'skill-gap' && (
                <SkillGapPage />
              )}
              {activeTab === 'profile' && (
                <ProfilePage />
              )}
              {activeTab === 'about' && (
                <AboutUsPage onNavigate={handleSelectTab} />
              )}
              {activeTab === 'contact' && (
                <ContactUsPage />
              )}
              {activeTab === 'privacy' && (
                <PrivacyPolicyPage />
              )}
              {activeTab === 'terms' && (
                <TermsPage />
              )}
              {activeTab === 'disclaimer' && (
                <DisclaimerPage />
              )}
            </main>

            {/* Auth / Login & Signin Modal */}
            <AuthModal />

            {/* Cookie Consent Banner for Google AdSense & Privacy */}
            <CookieConsentBanner onNavigateToPrivacy={() => handleSelectTab('privacy')} />

            {/* Comprehensive Google AdSense Compliant Footer */}
            <footer className="mt-auto border-t border-[#1d1f2b] bg-[#0b0c10] pt-12 pb-8 text-xs text-zinc-400 print:hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Upper Footer Columns */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {/* Brand & Founder Identity */}
                  <div className="space-y-3 md:col-span-1">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-sm text-white tracking-tight">HireNove</span>
                      <span className="text-[10px] text-zinc-500 font-mono">v2026</span>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Autonomous AI job application platform empowering candidates with ATS resume generation, semantic JD matching, cover letter creation, and real-time mock interviews.
                    </p>

                    <div className="p-3.5 bg-[#12131b] rounded-xl border border-[#20222f] space-y-1">
                      <span className="text-[10px] uppercase font-bold text-zinc-500 block tracking-wider">Founder & Publisher</span>
                      <p className="text-xs font-semibold text-white flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Pavana Naga Sai Kumar Murari</span>
                      </p>
                      <a
                        href="mailto:saikumarfriendship4@gmail.com"
                        className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 transition-colors"
                      >
                        <Mail className="w-3 h-3 text-zinc-500" />
                        <span className="truncate">saikumarfriendship4@gmail.com</span>
                      </a>
                    </div>
                  </div>

                  {/* AI Career Tools */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
                      7 AI Career Tools
                    </h4>
                    <ul className="space-y-2 text-xs text-zinc-400">
                      <li>
                        <button
                          onClick={() => handleSelectTab('builder')}
                          className="hover:text-indigo-400 transition-colors cursor-pointer text-left"
                        >
                          AI Resume Builder
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleSelectTab('analyzer')}
                          className="hover:text-indigo-400 transition-colors cursor-pointer text-left"
                        >
                          Resume ATS Analyzer
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleSelectTab('matcher')}
                          className="hover:text-indigo-400 transition-colors cursor-pointer text-left"
                        >
                          Job Description Matcher
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleSelectTab('cover-letter')}
                          className="hover:text-indigo-400 transition-colors cursor-pointer text-left"
                        >
                          Cover Letter Generator
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleSelectTab('tracker')}
                          className="hover:text-indigo-400 transition-colors cursor-pointer text-left"
                        >
                          Job Application Tracker
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleSelectTab('interview')}
                          className="hover:text-indigo-400 transition-colors cursor-pointer text-left"
                        >
                          AI Interview Simulator
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleSelectTab('skill-gap')}
                          className="hover:text-indigo-400 transition-colors cursor-pointer text-left"
                        >
                          Skill Gap Analyzer
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Company & Trust (AdSense Compliance) */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
                      About & Trust Center
                    </h4>
                    <ul className="space-y-2 text-xs text-zinc-400">
                      <li>
                        <button
                          onClick={() => handleSelectTab('about')}
                          className="hover:text-indigo-400 transition-colors cursor-pointer text-left"
                        >
                          About Us & Mission
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleSelectTab('contact')}
                          className="hover:text-indigo-400 transition-colors cursor-pointer text-left"
                        >
                          Contact Founder & Support
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleSelectTab('profile')}
                          className="hover:text-indigo-400 transition-colors cursor-pointer text-left"
                        >
                          My Candidate Profile
                        </button>
                      </li>
                      <li>
                        <a
                          href="mailto:saikumarfriendship4@gmail.com"
                          className="hover:text-indigo-400 transition-colors block text-left"
                        >
                          Partnerships & Ad Inquiries
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Legal & Regulatory Policies (AdSense Mandatory) */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
                      Legal & Policies
                    </h4>
                    <ul className="space-y-2 text-xs text-zinc-400">
                      <li>
                        <button
                          onClick={() => handleSelectTab('privacy')}
                          className="hover:text-indigo-400 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                        >
                          <Shield className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Privacy Policy (GDPR/CCPA)</span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleSelectTab('terms')}
                          className="hover:text-indigo-400 transition-colors cursor-pointer text-left"
                        >
                          Terms of Service
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleSelectTab('disclaimer')}
                          className="hover:text-indigo-400 transition-colors cursor-pointer text-left"
                        >
                          Disclaimer & Ad Disclosure
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleSelectTab('privacy')}
                          className="hover:text-indigo-400 transition-colors cursor-pointer text-left"
                        >
                          Google AdSense Cookie Policy
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Bottom Copyright & Disclosure Strip */}
                <div className="pt-8 border-t border-[#1d1f2b] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
                  <p>
                    © 2026 HireNove. Founded by <strong className="text-zinc-300">Pavana Naga Sai Kumar Murari</strong>. All rights reserved.
                  </p>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleSelectTab('privacy')}
                      className="hover:text-zinc-300 transition-colors"
                    >
                      Privacy
                    </button>
                    <span>•</span>
                    <button
                      onClick={() => handleSelectTab('terms')}
                      className="hover:text-zinc-300 transition-colors"
                    >
                      Terms
                    </button>
                    <span>•</span>
                    <button
                      onClick={() => handleSelectTab('disclaimer')}
                      className="hover:text-zinc-300 transition-colors"
                    >
                      Disclaimer
                    </button>
                    <span>•</span>
                    <button
                      onClick={() => handleSelectTab('contact')}
                      className="hover:text-zinc-300 transition-colors"
                    >
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </JobProvider>
      </ResumeProvider>
    </AuthProvider>
  );
}
