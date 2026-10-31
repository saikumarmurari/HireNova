import React from 'react';
import { FileText, Shield, AlertCircle, Mail, CheckCircle2 } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-zinc-300 text-xs sm:text-sm leading-relaxed">
      {/* Header */}
      <div className="border-b border-[#212330] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#12131b] border border-[#212330] text-indigo-300 text-xs font-semibold mb-3">
          <FileText className="w-3.5 h-3.5 text-indigo-400" />
          <span>Terms & Conditions</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Terms of Service</h1>
        <p className="text-xs text-zinc-400 mt-2">
          Effective Date: October 31, 2026 • Last Updated: October 31, 2026
        </p>
        <p className="text-xs text-zinc-400 mt-1">
          Operated by: HireNove • Founder: <strong className="text-zinc-200">Pavana Naga Sai Kumar Murari</strong> (<a href="mailto:saikumarfriendship4@gmail.com" className="text-indigo-400 hover:underline">saikumarfriendship4@gmail.com</a>)
        </p>
      </div>

      {/* 1. Agreement */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">1. Agreement to Terms</h2>
        <p>
          By accessing or using <strong>HireNove</strong>, including our web applications, AI tools, resume builder, analyzer, cover letter generator, and mock interview modules, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must refrain from using the platform.
        </p>
      </section>

      {/* 2. Permitted Use */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">2. Permitted Use & Account Integrity</h2>
        <p>
          HireNove grants you a personal, non-exclusive, non-transferable revocable license to access our services solely for lawful job hunting, career preparation, and personal resume enhancement purposes.
        </p>
        <p>You agree not to:</p>
        <ul className="list-disc ml-5 space-y-1">
          <li>Reverse engineer, decompile, or attempt to extract the source code or proprietary AI prompts of the platform.</li>
          <li>Use automated bots, spiders, or scrapers to overwhelm or extract content from our services.</li>
          <li>Submit fraudulent, misleading, or infringing content in your job applications or resumes.</li>
          <li>Interfere with or circumvent security measures or third-party advertising displays (such as Google AdSense).</li>
        </ul>
      </section>

      {/* 3. User Content Ownership */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">3. User Content & Intellectual Property</h2>
        <p>
          <strong>Your Content:</strong> You retain complete ownership and all copyright rights to the personal text, work experiences, contact information, and resume content you create or input on HireNove. We do not claim any ownership over your resume documents.
        </p>
        <p>
          <strong>Platform Intellectual Property:</strong> All site designs, software code, UI components, Three.js 3D scenes, logos, and proprietary algorithmic scoring formulas are the intellectual property of HireNove and founder Pavana Naga Sai Kumar Murari.
        </p>
      </section>

      {/* 4. AI Advisory Disclaimer */}
      <section className="p-5 sm:p-6 bg-[#12131b] border border-[#212330] rounded-2xl space-y-3">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-amber-400" />
          4. AI Generated Content & Career Disclaimer
        </h2>
        <p>
          HireNove utilizes advanced generative artificial intelligence (including Google Gemini models) and heuristic algorithms to provide resume suggestions, bullet point rewrites, match ratings, and interview simulations.
        </p>
        <p className="text-zinc-400 text-xs">
          • All generated output is intended solely as an advisory drafting aid. Users are strictly responsible for reviewing and verifying the truthfulness, accuracy, and metric claims of their resumes before submitting them to any prospective employer.
        </p>
        <p className="text-zinc-400 text-xs">
          • HireNove does not guarantee interview invitations, job placement, salary increases, or employment offers. Final hiring decisions rest solely with hiring organizations.
        </p>
      </section>

      {/* 5. Advertising & Third-Party Services */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">5. Advertisements & Third-Party Links</h2>
        <p>
          Our platform may display advertisements served by <strong>Google AdSense</strong> or third-party networks, alongside hyperlinks to external job portals, learning resources, and developer documentation. We do not endorse, guarantee, or assume liability for the content, privacy practices, or products offered by external third-party sites.
        </p>
      </section>

      {/* 6. Limitation of Liability */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">6. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by applicable law, HireNove, its founder Pavana Naga Sai Kumar Murari, and affiliates shall not be liable for any indirect, incidental, consequential, special, or punitive damages arising from your access to or inability to access the service, including loss of data, missed job opportunities, or employment rejections.
        </p>
      </section>

      {/* 7. Contact */}
      <section className="p-6 bg-[#12131b] border border-[#212330] rounded-2xl space-y-2">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Mail className="w-4 h-4 text-indigo-400" />
          7. Questions Regarding These Terms
        </h2>
        <p className="text-xs text-zinc-300">
          If you have questions or concerns regarding our Terms of Service, please reach out directly:
        </p>
        <div className="text-xs text-zinc-400 space-y-0.5 pt-1">
          <p><strong className="text-white">Founder:</strong> Pavana Naga Sai Kumar Murari</p>
          <p><strong className="text-white">Email:</strong> <a href="mailto:saikumarfriendship4@gmail.com" className="text-indigo-400 hover:underline">saikumarfriendship4@gmail.com</a></p>
          <p><strong className="text-white">Platform:</strong> HireNove Suite</p>
        </div>
      </section>
    </div>
  );
};
