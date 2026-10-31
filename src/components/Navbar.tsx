import React, { useState } from 'react';
import {
  FileText,
  SearchCode,
  GitCompare,
  Mail,
  Kanban,
  Mic,
  TrendingUp,
  Box,
  User,
  LogOut,
  Sparkles,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export type NavTab =
  | 'overview'
  | 'builder'
  | 'analyzer'
  | 'matcher'
  | 'cover-letter'
  | 'tracker'
  | 'interview'
  | 'skill-gap'
  | 'profile'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'disclaimer';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab }) => {
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'overview', label: '3D Hub', icon: <Box className="w-4 h-4" /> },
    { id: 'builder', label: 'Resume Builder', icon: <FileText className="w-4 h-4" /> },
    { id: 'analyzer', label: 'Resume Analyzer', icon: <SearchCode className="w-4 h-4" /> },
    { id: 'matcher', label: 'JD Matcher', icon: <GitCompare className="w-4 h-4" /> },
    { id: 'cover-letter', label: 'Cover Letter', icon: <Mail className="w-4 h-4" /> },
    { id: 'tracker', label: 'Job Tracker', icon: <Kanban className="w-4 h-4" /> },
    { id: 'interview', label: 'AI Interview', icon: <Mic className="w-4 h-4" />, badge: 'AI' },
    { id: 'skill-gap', label: 'Skill Gap', icon: <TrendingUp className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0d0e15]/90 backdrop-blur-md border-b border-[#1e202b] text-zinc-100 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <div
            onClick={() => onSelectTab('overview')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-zinc-100 tracking-tight group-hover:text-white transition-colors">HireNove</span>
                <span className="text-[10px] text-zinc-400 font-medium">·</span>
                <span className="text-[11px] text-indigo-400 font-medium">
                  AI Suite
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 font-normal hidden sm:block">
                Autonomous Job Application Platform
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white/[0.08] text-white font-semibold border border-white/[0.1] shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Static Trust & Info Links for AdSense and Transparency */}
          <div className="hidden lg:flex items-center gap-1 pl-3 border-l border-[#1e202b] text-xs">
            <button
              onClick={() => onSelectTab('about')}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === 'about' ? 'text-white bg-white/[0.08]' : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              About
            </button>
            <button
              onClick={() => onSelectTab('contact')}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === 'contact' ? 'text-white bg-white/[0.08]' : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              Contact
            </button>
          </div>

          {/* User Auth Section */}
          <div className="flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1 sm:px-2.5 sm:py-1 rounded-xl bg-[#14161f] border border-[#232532] hover:border-[#35384a] transition-colors cursor-pointer"
                >
                  <img
                    src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80'}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-indigo-500/40"
                  />
                  <div className="text-left hidden sm:block">
                    <div className="text-xs font-semibold text-zinc-200 leading-tight">
                      {user.name.split(' ')[0]}
                    </div>
                    <div className="text-[10px] text-zinc-400 truncate max-w-[110px]">
                      {user.targetRole || 'Candidate'}
                    </div>
                  </div>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#13141c] border border-[#242634] shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-2 border-b border-[#242634]">
                      <p className="text-xs font-bold text-white">{user.name}</p>
                      <p className="text-[11px] text-zinc-400 truncate">{user.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        onSelectTab('profile');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors mt-1"
                    >
                      <User className="w-4 h-4 text-indigo-400" />
                      <span>My Career Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        onSelectTab('tracker');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors"
                    >
                      <Kanban className="w-4 h-4 text-indigo-400" />
                      <span>Tracked Applications</span>
                    </button>

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-950/40 rounded-xl transition-colors mt-1 border-t border-[#242634]"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal('login')}
                  className="text-xs font-medium px-3 py-1.5 text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
                >
                  Log In
                </button>
                <button
                  onClick={() => openAuthModal('signup')}
                  className="text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                >
                  Sign Up Free
                </button>
              </div>
            )}
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-5 space-y-1">
          <div className="grid grid-cols-2 gap-1.5 pt-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-slate-800 text-cyan-400 font-semibold border border-slate-700'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 mt-3 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs text-slate-400">
            <button
              onClick={() => {
                onSelectTab('about');
                setMobileMenuOpen(false);
              }}
              className="text-left px-2.5 py-1.5 rounded-lg hover:text-cyan-400 hover:bg-slate-800/80"
            >
              About Us
            </button>
            <button
              onClick={() => {
                onSelectTab('contact');
                setMobileMenuOpen(false);
              }}
              className="text-left px-2.5 py-1.5 rounded-lg hover:text-cyan-400 hover:bg-slate-800/80"
            >
              Contact Us
            </button>
            <button
              onClick={() => {
                onSelectTab('privacy');
                setMobileMenuOpen(false);
              }}
              className="text-left px-2.5 py-1.5 rounded-lg hover:text-cyan-400 hover:bg-slate-800/80"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => {
                onSelectTab('terms');
                setMobileMenuOpen(false);
              }}
              className="text-left px-2.5 py-1.5 rounded-lg hover:text-cyan-400 hover:bg-slate-800/80"
            >
              Terms of Service
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
