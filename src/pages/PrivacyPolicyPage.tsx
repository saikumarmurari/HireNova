import React from 'react';
import { Shield, Lock, Eye, Mail, FileText, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-zinc-300 text-xs sm:text-sm leading-relaxed">
      {/* Header */}
      <div className="border-b border-[#212330] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#12131b] border border-[#212330] text-indigo-300 text-xs font-semibold mb-3">
          <Shield className="w-3.5 h-3.5 text-indigo-400" />
          <span>Legal & Compliance</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Privacy Policy</h1>
        <p className="text-xs text-zinc-400 mt-2">
          Effective Date: October 31, 2026 • Last Reviewed: October 31, 2026
        </p>
        <p className="text-xs text-zinc-400 mt-1">
          Website: HireNove • Founder & Data Protection Officer: <strong className="text-zinc-200">Pavana Naga Sai Kumar Murari</strong> (<a href="mailto:saikumarfriendship4@gmail.com" className="text-indigo-400 hover:underline">saikumarfriendship4@gmail.com</a>)
        </p>
      </div>

      {/* Introduction */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">1. Introduction</h2>
        <p>
          Welcome to <strong>HireNove</strong> ("we," "our," or "us"). We are committed to safeguarding the privacy of visitors and users who utilize our career optimization services, including the AI Resume Builder, Resume Analyzer, Job Description Matcher, Cover Letter Generator, Job Application Tracker, AI Interview Simulator, and Skill Gap Analyzer.
        </p>
        <p>
          This Privacy Policy outlines how your personal information and documents are collected, used, and protected when you interact with HireNove. If you have any inquiries regarding this policy or our data practices, please contact our founder, <strong>Pavana Naga Sai Kumar Murari</strong>, at <a href="mailto:saikumarfriendship4@gmail.com" className="text-indigo-400 hover:underline">saikumarfriendship4@gmail.com</a>.
        </p>
      </section>

      {/* Google AdSense & Third-Party Advertising Cookies (Mandatory for AdSense) */}
      <section className="p-5 sm:p-6 bg-[#12131b] border border-[#212330] rounded-2xl space-y-3">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Eye className="w-5 h-5 text-indigo-400" />
          2. Google AdSense & Third-Party Advertising Cookies
        </h2>
        <p>
          We partner with third-party advertising networks, including <strong>Google AdSense</strong>, to serve advertisements when you visit our website. These companies may use cookies, web beacons, and related tracking technologies to collect information about your visits to this and other websites to provide personalized advertisements regarding goods and services of interest to you.
        </p>
        <div className="space-y-2 bg-[#0b0c10] p-4 rounded-xl border border-[#212330] text-xs">
          <p>
            • <strong>Third-party vendor cookie usage:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user’s prior visits to this website or other websites across the Internet.
          </p>
          <p>
            • <strong>Google DoubleClick DART Cookies:</strong> Google’s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.
          </p>
          <p>
            • <strong>Opting Out of Personalized Advertising:</strong> Users may opt out of personalized advertising by visiting Google Ads Settings at{' '}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:underline break-all"
            >
              https://www.google.com/settings/ads
            </a>. Alternatively, users can opt out of a third-party vendor’s use of cookies for personalized advertising by visiting{' '}
            <a
              href="https://www.aboutads.info"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:underline"
            >
              www.aboutads.info
            </a>.
          </p>
        </div>
      </section>

      {/* Information We Collect */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">3. Information We Collect</h2>
        <p>We collect information in the following categories:</p>
        <ul className="list-disc ml-5 space-y-2">
          <li>
            <strong>Voluntarily Provided Information:</strong> When you register an account, customize your profile, or generate documents, you provide details such as your full name, email address, career goals, resume experiences, education, and skills.
          </li>
          <li>
            <strong>Resume & Document Payloads:</strong> Content entered into the AI Resume Builder, Analyzer, or Cover Letter generator is processed to produce real-time scoring, ATS diagnostics, and text enhancements. We do NOT sell, license, or publicly distribute your personal resume data.
          </li>
          <li>
            <strong>Log Data & Analytics:</strong> Like most web servers, our infrastructure automatically records log information, including your Internet Protocol (IP) address, browser type, Internet Service Provider (ISP), date/time stamps, referring/exit pages, and click counts to analyze trends and administer the site.
          </li>
        </ul>
      </section>

      {/* How We Use Information */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">4. How We Use Your Information</h2>
        <p>The information we collect is utilized exclusively to:</p>
        <ul className="list-disc ml-5 space-y-1.5">
          <li>Operate, deliver, and maintain HireNove features and services.</li>
          <li>Execute algorithmic ATS keyword diagnostics and STAR mock interview evaluations.</li>
          <li>Enable persistent saving of your application tracking board and personal resume versions.</li>
          <li>Respond to customer support inquiries, feedback, and security alerts.</li>
          <li>Prevent fraud, bot spamming, and enforce our Terms of Service.</li>
        </ul>
      </section>

      {/* Data Protection & Confidentiality */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">5. Data Protection & Security</h2>
        <p>
          We implement industry-standard technical and organizational security protocols to protect your personal information against unauthorized access, loss, alteration, or disclosure. All data transmissions are encrypted using Transport Layer Security (TLS/HTTPS).
        </p>
      </section>

      {/* GDPR & CCPA Rights */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">6. Your Privacy Rights (GDPR & CCPA)</h2>
        <p>
          Depending on your location, you possess statutory rights regarding your personal information:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3.5 bg-[#12131b] rounded-xl border border-[#212330] space-y-1">
            <h3 className="font-bold text-white text-xs">GDPR Rights (European Users)</h3>
            <p className="text-xs text-zinc-400">
              Right to access, rectify, erase, restrict processing, data portability, and withdraw consent at any time.
            </p>
          </div>
          <div className="p-3.5 bg-[#12131b] rounded-xl border border-[#212330] space-y-1">
            <h3 className="font-bold text-white text-xs">CCPA Rights (California Consumers)</h3>
            <p className="text-xs text-zinc-400">
              Right to know what categories of personal data are collected and right to non-discrimination. We do not sell your personal data.
            </p>
          </div>
        </div>
      </section>

      {/* Children's Information */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">7. Children's Information (COPPA)</h2>
        <p>
          HireNove does not knowingly collect personal identifiable information from children under the age of 13. If you believe that your child provided this kind of information on our website, we strongly encourage you to contact us immediately, and we will promptly remove such information from our records.
        </p>
      </section>

      {/* Contact Officer */}
      <section className="p-6 bg-[#12131b] border border-[#212330] rounded-2xl space-y-2">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Mail className="w-4 h-4 text-indigo-400" />
          8. Contacting the Data Protection Officer
        </h2>
        <p className="text-xs text-zinc-300">
          For any questions regarding this Privacy Policy, your rights, or data requests, please contact:
        </p>
        <div className="text-xs text-zinc-400 space-y-0.5 pt-1">
          <p><strong className="text-white">Officer / Founder:</strong> Pavana Naga Sai Kumar Murari</p>
          <p><strong className="text-white">Email:</strong> <a href="mailto:saikumarfriendship4@gmail.com" className="text-indigo-400 hover:underline">saikumarfriendship4@gmail.com</a></p>
          <p><strong className="text-white">Service:</strong> HireNove Platform</p>
        </div>
      </section>
    </div>
  );
};
