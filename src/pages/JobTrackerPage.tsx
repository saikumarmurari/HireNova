import React, { useState } from 'react';
import {
  Kanban,
  Plus,
  Search,
  Calendar,
  Building,
  DollarSign,
  MapPin,
  Trash2,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Clock,
  Briefcase,
  X,
} from 'lucide-react';
import { useJobs } from '../context/JobContext';
import { JobApplication, JobStatus } from '../types';

export const JobTrackerPage: React.FC = () => {
  const { applications, addApplication, updateStatus, deleteApplication, stats } = useJobs();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New application form state
  const [newCompany, setNewCompany] = useState('');
  const [newPosition, setNewPosition] = useState('');
  const [newStatus, setNewStatus] = useState<JobStatus>('applied');
  const [newLocation, setNewLocation] = useState('San Francisco, CA (Remote)');
  const [newType, setNewType] = useState<JobApplication['type']>('Full-time');
  const [newSalary, setNewSalary] = useState('$180,000 - $220,000');
  const [newNotes, setNewNotes] = useState('');
  const [newTags, setNewTags] = useState('TypeScript, Full Stack');

  const columns: { id: JobStatus; title: string; color: string; badgeBg: string }[] = [
    { id: 'applied', title: 'Applied', color: 'border-blue-500/40 text-blue-400', badgeBg: 'bg-blue-950 text-blue-300' },
    { id: 'interview', title: 'Interviewing', color: 'border-amber-500/40 text-amber-400', badgeBg: 'bg-amber-950 text-amber-300' },
    { id: 'offer', title: 'Offer Stage', color: 'border-purple-500/40 text-purple-400', badgeBg: 'bg-purple-950 text-purple-300' },
    { id: 'selected', title: 'Selected / Accepted', color: 'border-emerald-500/40 text-emerald-400', badgeBg: 'bg-emerald-950 text-emerald-300' },
    { id: 'rejected', title: 'Archived / Rejected', color: 'border-rose-500/40 text-rose-400', badgeBg: 'bg-rose-950 text-rose-300' },
  ];

  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTag = !selectedTag || app.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const handleCreateApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany || !newPosition) return;

    addApplication({
      company: newCompany,
      position: newPosition,
      status: newStatus,
      location: newLocation,
      type: newType,
      salary: newSalary,
      appliedDate: new Date().toISOString().split('T')[0],
      notes: newNotes,
      tags: newTags.split(',').map((t) => t.trim()).filter(Boolean),
    });

    setNewCompany('');
    setNewPosition('');
    setNewNotes('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Feature 5</span>
            <span className="px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-[10px] text-cyan-300 font-semibold">
              Live Pipeline Tracker
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Job Application Tracker</h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your opportunities from initial application to final interview, offer, and selection.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Opportunity</span>
        </button>
      </div>

      {/* Analytics Stats Overview Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Total Tracked</span>
            <Kanban className="w-3.5 h-3.5 text-slate-500" />
          </div>
          <span className="text-2xl font-extrabold text-white">{stats.total}</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Applied</span>
            <Clock className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <span className="text-2xl font-extrabold text-blue-400">{stats.applied}</span>
        </div>

        <div className="p-4 bg-[#12131b] border border-[#212330] rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
            <span>Interviews</span>
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <span className="text-2xl font-extrabold text-amber-400">{stats.interview}</span>
        </div>

        <div className="p-4 bg-[#12131b] border border-[#212330] rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
            <span>Offers</span>
            <TrendingUp className="w-3.5 h-3.5 text-violet-400" />
          </div>
          <span className="text-2xl font-extrabold text-violet-400">{stats.offer}</span>
        </div>

        <div className="p-4 bg-[#12131b] border border-[#212330] rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
            <span>Selected</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <span className="text-2xl font-extrabold text-emerald-400">{stats.selected}</span>
        </div>

        <div className="p-4 bg-[#12131b] border border-[#212330] rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
            <span>Interview Rate</span>
            <span className="text-[10px] text-zinc-400 font-mono">Conversion</span>
          </div>
          <span className="text-2xl font-extrabold text-indigo-400">{stats.interviewRate}%</span>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 bg-[#12131b] border border-[#212330] p-3 rounded-2xl">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search company, title, or tag..."
            className="w-full pl-10 pr-4 py-2 bg-[#0b0c10] border border-[#212330] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        {selectedTag && (
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <span>Filtered by:</span>
            <span className="px-2 py-0.5 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-300 font-medium">
              {selectedTag}
            </span>
            <button
              onClick={() => setSelectedTag(null)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-start">
        {columns.map((col) => {
          const colApps = filteredApps.filter((a) => a.status === col.id);
          return (
            <div
              key={col.id}
              className="bg-[#12131b] border border-[#212330] rounded-2xl p-4 flex flex-col min-h-[460px] shadow-sm"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#212330]">
                <span className={`text-xs font-bold uppercase tracking-wider ${col.color}`}>
                  {col.title}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${col.badgeBg}`}>
                  {colApps.length}
                </span>
              </div>

              {/* Cards Container */}
              <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                {colApps.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 bg-[#161822] border border-[#252838] hover:border-[#383c54] rounded-xl shadow-sm space-y-2.5 transition-all group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors">
                          {app.company}
                        </h4>
                        <p className="text-[11px] font-semibold text-zinc-300 leading-snug">
                          {app.position}
                        </p>
                      </div>

                      <button
                        onClick={() => deleteApplication(app.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-400 transition-opacity"
                        title="Delete application"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-1 text-[11px] text-slate-400">
                      {app.salary && (
                        <div className="flex items-center gap-1.5 text-slate-300">
                          <DollarSign className="w-3 h-3 text-emerald-400" />
                          <span>{app.salary}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        <span>{app.location}</span>
                      </div>
                      {app.interviewDate && (
                        <div className="flex items-center gap-1.5 text-amber-300 font-medium bg-amber-950/40 px-2 py-0.5 rounded-lg border border-amber-900/50">
                          <Calendar className="w-3 h-3 text-amber-400" />
                          <span>Interview: {new Date(app.interviewDate).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>

                    {app.notes && (
                      <p className="text-[11px] text-slate-400 italic bg-slate-900 p-2 rounded-xl border border-slate-800/80 leading-relaxed line-clamp-2">
                        "{app.notes}"
                      </p>
                    )}

                    {/* Tags */}
                    {app.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {app.tags.map((t, idx) => (
                          <span
                            key={idx}
                            onClick={() => setSelectedTag(t)}
                            className="text-[9px] px-2 py-0.5 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 cursor-pointer"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Move to next stage quick dropdown */}
                    <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[10px]">
                      <span className="text-slate-500">Move stage:</span>
                      <select
                        value={app.status}
                        onChange={(e) => updateStatus(app.id, e.target.value as JobStatus)}
                        className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-slate-300 text-[10px] focus:outline-none focus:border-cyan-500 cursor-pointer"
                      >
                        <option value="applied">Applied</option>
                        <option value="interview">Interviewing</option>
                        <option value="offer">Offer</option>
                        <option value="selected">Selected</option>
                        <option value="rejected">Archived</option>
                      </select>
                    </div>
                  </div>
                ))}

                {colApps.length === 0 && (
                  <div className="h-32 flex items-center justify-center text-xs text-slate-600 border border-dashed border-slate-800 rounded-2xl">
                    No applications
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Opportunity Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-white mb-4">Add Tracked Job Opportunity</h2>

            <form onSubmit={handleCreateApplication} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Company</label>
                  <input
                    type="text"
                    required
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    placeholder="e.g. Figma, Google"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Position / Role</label>
                  <input
                    type="text"
                    required
                    value={newPosition}
                    onChange={(e) => setNewPosition(e.target.value)}
                    placeholder="e.g. Senior Frontend Engineer"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as JobStatus)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="applied">Applied</option>
                    <option value="interview">Interviewing</option>
                    <option value="offer">Offer</option>
                    <option value="selected">Selected</option>
                    <option value="rejected">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Salary Range</label>
                  <input
                    type="text"
                    value={newSalary}
                    onChange={(e) => setNewSalary(e.target.value)}
                    placeholder="$190k - $230k"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Location / Work Type</label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="San Francisco, CA (Remote)"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="TypeScript, High Salary, Top Choice"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Notes & Follow-ups</label>
                <textarea
                  rows={3}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Recruiter contact, tech screen topics, interview scheduled date..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-cyan-600/20 transition-all cursor-pointer"
              >
                Save Opportunity to Pipeline
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
