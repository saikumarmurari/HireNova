import React, { useState } from 'react';
import {
  User,
  Mail,
  Briefcase,
  MapPin,
  Phone,
  Linkedin,
  Github,
  Save,
  Check,
  Shield,
  Download,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useResume } from '../context/ResumeContext';
import { useJobs } from '../context/JobContext';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile, openAuthModal, isAuthenticated } = useAuth();
  const { resume } = useResume();
  const { stats } = useJobs();

  const [name, setName] = useState(user?.name || '');
  const [headline, setHeadline] = useState(user?.headline || '');
  const [targetRole, setTargetRole] = useState(user?.targetRole || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [location, setLocation] = useState(user?.location || '');
  const [linkedin, setLinkedin] = useState(user?.linkedin || '');
  const [github, setGithub] = useState(user?.github || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      headline,
      targetRole,
      phone,
      location,
      linkedin,
      github,
      bio,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleExportBackup = () => {
    const data = {
      user,
      activeResume: resume,
      stats,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HireNove_Profile_Backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 inline-block">
          <User className="w-12 h-12 text-cyan-400" />
        </div>
        <h2 className="text-2xl font-bold text-white">Sign In to View Your Career Profile</h2>
        <p className="text-xs text-slate-400">
          Save personalized resumes, sync pipeline tracking, and save AI mock interview scores.
        </p>
        <button
          onClick={() => openAuthModal('login')}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs shadow-lg cursor-pointer"
        >
          Sign In / Create Account
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs text-zinc-400">
            <span className="font-semibold text-indigo-400">User Account</span>
            <span>·</span>
            <span>Verified Candidate Profile</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Personal Career Profile</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Manage your credentials, target career trajectory, and export profile data.
          </p>
        </div>

        <button
          onClick={handleExportBackup}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#12131b] hover:bg-[#1a1c27] text-xs font-semibold text-zinc-200 rounded-xl border border-[#212330] transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4 text-indigo-400" />
          <span>Export Career Archive (JSON)</span>
        </button>
      </div>

      {/* Profile Overview Card */}
      <div className="p-6 sm:p-8 bg-[#12131b] border border-[#212330] rounded-2xl shadow-sm flex flex-col sm:flex-row items-center gap-6">
        <img
          src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
          alt={user.name}
          className="w-24 h-24 rounded-2xl object-cover ring-2 ring-indigo-500/40 shadow-xl"
        />

        <div className="flex-1 text-center sm:text-left space-y-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h2 className="text-xl font-bold text-white">{user.name}</h2>
            <span className="text-[11px] font-medium text-indigo-400">
              · Verified Candidate
            </span>
          </div>
          <p className="text-xs font-medium text-zinc-300">{user.headline}</p>
          <p className="text-xs text-zinc-400 flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-zinc-500" />
              {user.email}
            </span>
            {user.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                {user.location}
              </span>
            )}
          </p>
        </div>

        {/* Mini stats */}
        <div className="flex sm:flex-col gap-4 text-center sm:text-right border-t sm:border-t-0 sm:border-l border-[#212330] pt-4 sm:pt-0 sm:pl-6">
          <div>
            <span className="text-lg font-bold text-white">{stats.total}</span>
            <span className="text-[10px] text-zinc-400 block">Applications</span>
          </div>
          <div>
            <span className="text-lg font-bold text-emerald-400">{stats.offer}</span>
            <span className="text-[10px] text-zinc-400 block">Offers Received</span>
          </div>
        </div>
      </div>

      {/* Edit Profile Form */}
      <div className="p-6 sm:p-8 bg-[#12131b] border border-[#212330] rounded-2xl shadow-sm space-y-6">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-indigo-400" />
          Edit Professional Attributes
        </h3>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Full Legal Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0b0c10] border border-[#212330] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Target Role Title</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0b0c10] border border-[#212330] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-zinc-300 mb-1">Headline & Expertise</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0b0c10] border border-[#212330] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0b0c10] border border-[#212330] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Location & Remote Preference</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0b0c10] border border-[#212330] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">LinkedIn Profile</label>
              <input
                type="text"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0b0c10] border border-[#212330] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">GitHub / Portfolio URL</label>
              <input
                type="text"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0b0c10] border border-[#212330] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-zinc-300 mb-1">Bio / Career Pitch</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-3 bg-[#0b0c10] border border-[#212330] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            {savedSuccess ? (
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 animate-in fade-in">
                <Check className="w-4 h-4" />
                Profile details synchronized successfully!
              </span>
            ) : (
              <span className="text-[11px] text-zinc-400">
                All changes persist to your personal HireNove account locally and across sessions.
              </span>
            )}

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-semibold rounded-xl shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
