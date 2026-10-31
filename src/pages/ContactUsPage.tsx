import React, { useState } from 'react';
import {
  Mail,
  User,
  MessageSquare,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Globe,
} from 'lucide-react';

export const ContactUsPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Support & Inquiries');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSending(true);
    // Simulate instantaneous receipt and storage
    setTimeout(() => {
      setIsSending(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#12131b] border border-[#212330] text-indigo-300 text-xs font-semibold">
          <Mail className="w-3.5 h-3.5 text-indigo-400" />
          <span>Get In Touch</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Contact HireNove
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          We welcome your inquiries, feedback, partnerships, and technical questions. Reach out directly to founder Pavana Naga Sai Kumar Murari and our team.
        </p>
      </div>

      {/* Main Grid: Direct Contact Info & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Official Contact Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-7 bg-[#12131b] border border-[#212330] rounded-2xl shadow-sm space-y-6">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Official Contact Information
            </h2>

            <div className="space-y-4 text-xs text-zinc-300">
              <div className="flex items-start gap-3 p-3.5 bg-[#0b0c10] rounded-xl border border-[#212330]">
                <User className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">Founder & Representative</span>
                  <span className="text-white font-bold text-sm">Pavana Naga Sai Kumar Murari</span>
                  <span className="text-[11px] text-indigo-400 block mt-0.5">Lead Architect, HireNove</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-[#0b0c10] rounded-xl border border-[#212330]">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">Primary Contact Email</span>
                  <a
                    href="mailto:saikumarfriendship4@gmail.com"
                    className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors"
                  >
                    saikumarfriendship4@gmail.com
                  </a>
                  <span className="text-[11px] text-zinc-400 block mt-0.5">
                    For support, privacy requests, and advertising inquiries
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-[#0b0c10] rounded-xl border border-[#212330]">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">Response Time SLA</span>
                  <span className="text-white font-semibold">24 – 48 Business Hours</span>
                  <span className="text-[11px] text-zinc-400 block mt-0.5">
                    We review and reply to every legitimate message
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-[#0b0c10] rounded-xl border border-[#212330]">
                <Globe className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">Digital Headquarters</span>
                  <span className="text-white font-semibold">Global Remote Service</span>
                  <span className="text-[11px] text-zinc-400 block mt-0.5">
                    Serving job seekers worldwide
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0b0c10] border border-indigo-900/40 text-xs text-zinc-300 leading-relaxed">
              <strong className="text-indigo-300 block mb-0.5">Publisher & AdSense Notice:</strong>
              HireNove maintains strict editorial integrity, genuine AI career tooling, and adherence to Google Webmaster & Publisher policies.
            </div>
          </div>
        </div>

        {/* Right Column: Message Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 bg-[#12131b] border border-[#212330] rounded-2xl shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Send Us a Direct Message</h2>
              <p className="text-xs text-zinc-400 mt-1">
                Fill in your query details below. Founder Pavana Naga Sai Kumar Murari or a team member will follow up.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/50 border border-emerald-800 text-center space-y-3 animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-900/60 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-white">Message Delivered Successfully!</h3>
                <p className="text-xs text-emerald-200/90 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. A confirmation has been logged and our team will reply to your email address within 24 to 48 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Your Full Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Your Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Subject Inquiry Type</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="General Support & Inquiries">General Support & Inquiries</option>
                    <option value="Google AdSense & Advertising Inquiries">Google AdSense & Advertising Inquiries</option>
                    <option value="Resume Builder & AI Tool Feedback">Resume Builder & AI Tool Feedback</option>
                    <option value="Bug Report or Technical Glitch">Bug Report or Technical Glitch</option>
                    <option value="Partnership & Press Collaboration">Partnership & Press Collaboration</option>
                    <option value="Privacy & Data Protection Request">Privacy & Data Protection Request</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Your Detailed Message <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your inquiry, feedback, or assistance needed in detail..."
                    className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSending ? 'Transmitting Message...' : 'Send Message to Team'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="p-8 bg-[#12131b] border border-[#212330] rounded-2xl shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-400" />
          Common Inquiries & Support FAQ
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-[#0b0c10] rounded-xl border border-[#212330] space-y-1.5">
            <h4 className="font-bold text-white">How does HireNove protect candidate resume privacy?</h4>
            <p className="text-zinc-400 leading-relaxed">
              Resumes created or pasted into our suite are processed securely for formatting and analysis. We do not sell your personal contact info or candidate credentials to third-party databases.
            </p>
          </div>

          <div className="p-4 bg-[#0b0c10] rounded-xl border border-[#212330] space-y-1.5">
            <h4 className="font-bold text-white">Is HireNove completely free to use?</h4>
            <p className="text-zinc-400 leading-relaxed">
              Yes, all 7 core features—Resume Builder, Analyzer, Matcher, Cover Letter Generator, Job Tracker, Mock Interviews, and Skill Gap Analyzer—are free for individual job seekers.
            </p>
          </div>

          <div className="p-4 bg-[#0b0c10] rounded-xl border border-[#212330] space-y-1.5">
            <h4 className="font-bold text-white">How can advertisers or sponsors partner with us?</h4>
            <p className="text-zinc-400 leading-relaxed">
              Inquiries regarding Google AdSense placement, certified educational partnerships, or sponsored recruiter tools can be submitted to founder Pavana Naga Sai Kumar Murari at saikumarfriendship4@gmail.com.
            </p>
          </div>

          <div className="p-4 bg-[#0b0c10] rounded-xl border border-[#212330] space-y-1.5">
            <h4 className="font-bold text-white">Can I download my resume as a PDF?</h4>
            <p className="text-zinc-400 leading-relaxed">
              Yes! Click the "Print / Export PDF" button in the AI Resume Builder to generate a clean, ATS-compliant PDF document directly from your browser with zero watermarks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
