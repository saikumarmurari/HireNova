import React, { useState } from 'react';
import {
  Mail,
  Sparkles,
  Copy,
  Download,
  Check,
  RefreshCw,
  Building,
  Briefcase,
  User,
  Sliders,
  FileCheck,
} from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { generateCoverLetterWithAI } from '../services/aiService';

export const CoverLetterPage: React.FC = () => {
  const { resume, getRawResumeText } = useResume();
  const [jobTitle, setJobTitle] = useState('Staff Infrastructure Engineer');
  const [company, setCompanyName] = useState('Stripe');
  const [recipient, setRecipient] = useState('Sarah Jenkins & Hiring Team');
  const [tone, setTone] = useState<'professional' | 'confident' | 'enthusiastic' | 'concise'>('confident');
  const [highlights, setHighlights] = useState(
    '7+ years architecting high-scale distributed systems, reduced latency by 42%, engineered real-time telemetry dashboard with Three.js.'
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [letterContent, setLetterContent] = useState<string>(() => {
    return `Dear Sarah Jenkins & Hiring Team,

I am writing to express my strong interest in the Staff Infrastructure Engineer position at Stripe. With over 7 years of deep experience architecting high-scale distributed systems, scaling cloud platforms, and maintaining 99.99% uptime for mission-critical services, I am confident in my ability to make an immediate, meaningful impact on Stripe's developer infrastructure.

Throughout my tenure as Lead Full Stack Engineer at Apex Cloud Solutions, I spearheaded the overhaul of our enterprise cloud orchestration pipeline, reducing page latency by 45% for 120,000+ daily active users and scaling background event ingestion by 3.2x using Kafka and Go. Stripe's legendary standard of API reliability and developer craft aligns seamlessly with my own engineering philosophy.

I welcome the opportunity to discuss how my technical leadership and hands-on systems expertise can accelerate Stripe's infrastructure roadmap. Thank you for your consideration, and I look forward to speaking with your team.

Sincerely,
${resume.personalInfo.fullName || 'Alex Rivera'}
${resume.personalInfo.email} | ${resume.personalInfo.phone}`;
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const resumeContext = getRawResumeText();
      const generated = await generateCoverLetterWithAI(
        jobTitle,
        company,
        recipient,
        tone,
        highlights,
        resumeContext
      );
      setLetterContent(generated);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(letterContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadTxt = () => {
    const blob = new Blob([letterContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Cover_Letter_${company}_${jobTitle.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs text-zinc-400">
            <span className="font-semibold text-indigo-400">Application Copywriter</span>
            <span>·</span>
            <span>Tailored Pitch & Executive Outreach</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Cover Letter Generator</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Generate persuasive, bespoke cover letters highlighting your exact achievements for any company in seconds.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#12131b] hover:bg-[#1a1c27] border border-[#212330] text-xs font-semibold text-zinc-200 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-indigo-400" />}
            <span>{copied ? 'Copied' : 'Copy Text'}</span>
          </button>

          <button
            onClick={downloadTxt}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#12131b] hover:bg-[#1a1c27] border border-[#212330] text-xs font-semibold text-zinc-200 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-violet-400" />
            <span>Download .txt</span>
          </button>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-semibold rounded-xl shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Composing Letter...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Cover Letter</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: Form Inputs on Left, Letter Canvas on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 bg-[#12131b] border border-[#212330] rounded-2xl shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                Target Job Title
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Staff Infrastructure Engineer"
                className="w-full px-3.5 py-2 bg-[#0b0c10] border border-[#212330] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-violet-400" />
                Company Name
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Stripe, OpenAI, Google"
                className="w-full px-3.5 py-2 bg-[#0b0c10] border border-[#212330] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-zinc-400" />
                Recipient / Hiring Manager Name
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="e.g. Sarah Jenkins or Hiring Team"
                className="w-full px-3.5 py-2 bg-[#0b0c10] border border-[#212330] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-2 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                Tone of Voice
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'confident', label: 'Confident & Assertive', desc: 'Direct, proven leader' },
                  { id: 'professional', label: 'Executive Professional', desc: 'Formal & respectful' },
                  { id: 'enthusiastic', label: 'High Energy & Passion', desc: 'Startup excitement' },
                  { id: 'concise', label: 'Crisp & Punchy', desc: 'Short, skim-friendly' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTone(t.id as any)}
                    className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                      tone === t.id
                        ? 'bg-indigo-600/20 border-indigo-500/80 text-white shadow-sm'
                        : 'bg-[#0b0c10] border-[#212330] text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <p className="text-xs font-bold leading-tight">{t.label}</p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Specific Achievements to Emphasize
              </label>
              <textarea
                rows={3}
                value={highlights}
                onChange={(e) => setHighlights(e.target.value)}
                placeholder="Key projects, metrics, or personal reasons for applying..."
                className="w-full p-3 bg-[#0b0c10] border border-[#212330] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="p-3 bg-[#0b0c10] rounded-xl border border-[#212330] text-xs text-zinc-400">
              <span className="text-indigo-400 font-semibold">Automatic Context:</span> The AI reads your active resume experiences and skills to personalize stories without hallucination.
            </div>
          </div>
        </div>

        {/* Right Letter Canvas */}
        <div className="lg:col-span-7">
          <div className="bg-[#12131b] border border-[#212330] rounded-2xl p-3 mb-3 flex items-center justify-between text-xs text-zinc-300">
            <span className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              <span>Editable Cover Letter Document</span>
            </span>
            <span className="text-[11px] text-zinc-400">Click anywhere inside to customize words directly</span>
          </div>

          <div className="p-8 sm:p-10 bg-white rounded-2xl shadow-xl border border-zinc-200">
            <textarea
              rows={18}
              value={letterContent}
              onChange={(e) => setLetterContent(e.target.value)}
              className="w-full bg-transparent border-0 text-slate-900 text-xs sm:text-sm leading-relaxed font-serif focus:outline-none resize-y selection:bg-indigo-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
