import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, X } from 'lucide-react';

interface CookieConsentBannerProps {
  onNavigateToPrivacy: () => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ onNavigateToPrivacy }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('hirenove_cookie_consent') || localStorage.getItem('careerorbit_cookie_consent');
    if (!consent) {
      // Show banner after brief delay
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('hirenove_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('hirenove_cookie_consent', 'essential_only');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-[#12131b] border border-[#27293a] rounded-2xl p-5 shadow-2xl text-zinc-200 animate-in slide-in-from-bottom-4 duration-300 print:hidden">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-[#1a1c28] border border-[#2a2d40] text-indigo-400 shrink-0">
          <Cookie className="w-5 h-5" />
        </div>

        <div className="space-y-2 flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Cookie & AdSense Consent</span>
            </h4>
            <button
              onClick={handleDecline}
              className="text-zinc-500 hover:text-white p-1 cursor-pointer transition-colors"
              aria-label="Close cookie banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[11px] text-zinc-400 leading-relaxed">
            HireNove uses cookies and Google AdSense partner technologies to analyze platform traffic and serve contextual advertisements. Learn more in our{' '}
            <button
              onClick={onNavigateToPrivacy}
              className="text-indigo-400 hover:underline font-medium inline cursor-pointer"
            >
              Privacy Policy
            </button>.
          </p>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleAccept}
              className="flex-1 py-1.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-semibold text-[11px] shadow-sm transition-all cursor-pointer"
            >
              Accept All
            </button>
            <button
              onClick={handleDecline}
              className="py-1.5 px-3 rounded-xl bg-[#181a24] hover:bg-[#202230] border border-[#27293a] text-zinc-300 text-[11px] font-medium transition-colors cursor-pointer"
            >
              Essential Only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
