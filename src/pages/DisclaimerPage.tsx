import React from 'react';
import { AlertTriangle, ShieldCheck, Mail, Sparkles, Scale, Info } from 'lucide-react';

export const DisclaimerPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-zinc-300 text-xs sm:text-sm leading-relaxed">
      {/* Header */}
      <div className="border-b border-[#20222e] pb-6">
        <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium mb-2">
          <span className="text-indigo-400">HireNove Legal Transparency</span>
          <span aria-hidden="true">·</span>
          <span>AdSense Compliance</span>
          <span aria-hidden="true">·</span>
          <span>Last Updated: October 31, 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Disclaimer & Editorial Policy
        </h1>
        <p className="text-xs text-zinc-400 mt-2">
          Published by: <strong className="text-zinc-200">HireNove</strong> · Founder & Publisher: <strong className="text-zinc-200">Pavana Naga Sai Kumar Murari</strong> (<a href="mailto:saikumarfriendship4@gmail.com" className="text-indigo-400 hover:underline">saikumarfriendship4@gmail.com</a>)
        </p>
      </div>

      {/* 1. AI Tooling Advisory Notice */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
          <Info className="w-4 h-4 text-indigo-400" />
          <span>1. AI Tooling & Informational Purpose Only</span>
        </h2>
        <p>
          All content, tools, resume bullet recommendations, ATS diagnostic grades, match scores, cover letter drafts, and mock interview answers generated on <strong>HireNove</strong> are provided for general informational, educational, and candidate preparatory purposes only.
        </p>
        <p>
          While we utilize cutting-edge AI language models (including Google Gemini) combined with established recruiting rubrics, AI-generated outputs can occasionally contain inaccuracies or imperfect stylistic recommendations. You are solely responsible for reviewing, verifying, and editing any resume or application materials before submitting them to third-party employers, recruiters, or academic institutions.
        </p>
      </section>

      {/* 2. Employment & Hiring Guarantee Disclaimer */}
      <section className="p-5 sm:p-6 bg-[#12131b] border border-[#20222f] rounded-2xl space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>2. No Guarantee of Employment or Interview Selection</span>
        </h2>
        <p>
          HireNove does not guarantee that using our AI Resume Builder, Job Description Matcher, or Mock Interview Simulator will result in interview requests, hiring invitations, specific salary brackets, or employment offers.
        </p>
        <p className="text-zinc-400 text-xs">
          Hiring decisions depend entirely on external factors outside our control, including individual company hiring budgets, independent recruiter assessments, background checks, market competition, and candidate interview performance.
        </p>
      </section>

      {/* 3. Google AdSense & Advertising Disclosure (Strict AdSense requirement) */}
      <section className="p-5 sm:p-6 bg-[#12131b] border border-[#20222f] rounded-2xl space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <span>3. Advertising & Google AdSense Disclosure</span>
        </h2>
        <p>
          To maintain HireNove as a high-speed, accessible platform for job seekers worldwide, this website displays advertisements served through <strong>Google AdSense</strong> and authorized advertising partners.
        </p>
        <div className="space-y-2 bg-[#0c0d12] p-4 rounded-xl border border-[#1e202c] text-xs">
          <p>
            • Advertisements are distinguished and clearly labeled as "Advertisements," "Sponsored," or "Ads by Google."
          </p>
          <p>
            • We do not directly endorse specific products, services, or claims made within third-party advertisements displayed via Google AdSense.
          </p>
          <p>
            • Advertisers may use cookies and web beacons (including the Google DART cookie) to collect non-personally identifiable data to deliver contextual or interest-based advertisements in compliance with Google policies.
          </p>
          <p>
            • Users may opt out of personalized Google advertising by visiting the <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline">Google Ads Settings</a> page or via <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline">AboutAds.info</a>.
          </p>
        </div>
      </section>

      {/* 4. External Links Disclaimer */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-white">4. External Hyperlinks</h2>
        <p>
          HireNove may contain links to external sites such as official documentation (e.g. Next.js, Docker, Kubernetes), developer resources, GitHub repositories, or job boards. We have no control over the content, security, or privacy policies of those external destinations.
        </p>
      </section>

      {/* 5. Contact Publisher */}
      <section className="p-6 bg-[#12131b] border border-[#20222f] rounded-2xl space-y-2">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Mail className="w-4 h-4 text-indigo-400" />
          <span>5. Contact Regarding Disclaimers & Editorial Standards</span>
        </h2>
        <p className="text-xs text-zinc-400">
          For questions regarding our editorial policy, technical accuracy, or advertising disclosures:
        </p>
        <div className="text-xs text-zinc-400 space-y-1 pt-1">
          <p><strong className="text-zinc-200">Founder & Publisher:</strong> Pavana Naga Sai Kumar Murari</p>
          <p><strong className="text-zinc-200">Official Email:</strong> <a href="mailto:saikumarfriendship4@gmail.com" className="text-indigo-400 hover:underline">saikumarfriendship4@gmail.com</a></p>
          <p><strong className="text-zinc-200">Platform:</strong> HireNove · Autonomous Career Intelligence Suite</p>
        </div>
      </section>
    </div>
  );
};
