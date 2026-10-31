import React, { useState } from 'react';
import {
  Sparkles,
  Plus,
  Trash2,
  Printer,
  Wand2,
  Check,
  RefreshCw,
  Eye,
  FileCheck,
  Briefcase,
  GraduationCap,
  Award,
  Layers,
  Code2,
  User,
} from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { enhanceBulletPointWithAI } from '../services/aiService';

export const ResumeBuilderPage: React.FC = () => {
  const {
    resume,
    updatePersonalInfo,
    updateExperience,
    addExperience,
    removeExperience,
    addBulletPoint,
    updateBulletPoint,
    removeBulletPoint,
    updateEducation,
    addEducation,
    removeEducation,
    updateSkills,
    addSkillCategory,
    removeSkillCategory,
    updateProject,
    addProject,
    removeProject,
    updateCertification,
    addCertification,
    removeCertification,
    setTemplate,
    setAccentColor,
    loadSampleResume,
  } = useResume();

  const [activeTab, setActiveTab] = useState<'personal' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications'>('experience');
  const [enhancingExpId, setEnhancingExpId] = useState<string | null>(null);
  const [enhancingBulletIdx, setEnhancingBulletIdx] = useState<number | null>(null);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [loadingAi, setLoadingAi] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const colors = [
    { name: 'Royal Blue', hex: '#2563eb' },
    { name: 'Cyan Tech', hex: '#0891b2' },
    { name: 'Emerald Forest', hex: '#059669' },
    { name: 'Indigo Executive', hex: '#4f46e5' },
    { name: 'Violet Modern', hex: '#7c3aed' },
    { name: 'Slate Minimal', hex: '#475569' },
  ];

  const handleEnhanceBullet = async (expId: string, idx: number, currentText: string) => {
    setEnhancingExpId(expId);
    setEnhancingBulletIdx(idx);
    setLoadingAi(true);
    setAiSuggestions([]);

    const suggestions = await enhanceBulletPointWithAI(currentText, resume.personalInfo.headline);
    setAiSuggestions(suggestions);
    setLoadingAi(false);
  };

  const applyAiSuggestion = (suggestion: string) => {
    if (enhancingExpId && enhancingBulletIdx !== null) {
      updateBulletPoint(enhancingExpId, enhancingBulletIdx, suggestion);
      setEnhancingExpId(null);
      setEnhancingBulletIdx(null);
      setAiSuggestions([]);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 print:hidden">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs text-zinc-400 font-medium">
            <span className="text-indigo-400">Resume Studio</span>
            <span aria-hidden="true">·</span>
            <span>ATS Compliance Formatter</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">AI Resume Builder</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Craft ATS-compliant, high-impact professional resumes with instant Gemini AI bullet point generation.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Sample Preset Selector */}
          <div className="flex items-center bg-[#14151f] border border-[#232534] rounded-xl p-1 text-xs text-zinc-300">
            <span className="px-2 text-[11px] text-zinc-500 font-medium">Presets:</span>
            <button
              onClick={() => loadSampleResume('software')}
              className="px-2.5 py-1 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
            >
              Engineer
            </button>
            <button
              onClick={() => loadSampleResume('product')}
              className="px-2.5 py-1 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
            >
              Product
            </button>
            <button
              onClick={() => loadSampleResume('data')}
              className="px-2.5 py-1 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
            >
              Data / AI
            </button>
          </div>

          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 bg-[#161822] border border-[#252838] text-xs font-semibold text-zinc-200 rounded-xl hover:bg-[#1f212f] transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4 text-indigo-400" />
            <span>{previewMode ? 'Edit Mode' : 'Preview'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white text-xs font-semibold rounded-xl shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Export PDF</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Editor on Left, Live Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Section Editor (Hidden on small screens when in previewMode) */}
        <div className={`lg:col-span-6 space-y-6 print:hidden ${previewMode ? 'hidden lg:block' : 'block'}`}>
          {/* Template & Color Selector Card */}
          <div className="p-4 bg-[#12131b] border border-[#212330] rounded-2xl shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Layout Template</label>
                <div className="flex gap-1.5 mt-1.5">
                  {(['modern', 'executive', 'minimal', 'tech'] as const).map((tpl) => (
                    <button
                      key={tpl}
                      onClick={() => setTemplate(tpl)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all cursor-pointer ${
                        resume.template === tpl
                          ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                          : 'bg-[#0b0c10] text-zinc-400 hover:text-white border border-[#20222f]'
                      }`}
                    >
                      {tpl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Accent Hue</label>
                <div className="flex items-center gap-2 mt-1.5">
                  {colors.map((c) => (
                    <button
                      key={c.hex}
                      onClick={() => setAccentColor(c.hex)}
                      className={`w-6 h-6 rounded-full transition-transform cursor-pointer ${
                        resume.accentColor === c.hex ? 'scale-125 ring-2 ring-white' : 'opacity-80 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation for Sections */}
          <div className="flex overflow-x-auto gap-1 p-1 bg-[#12131b] border border-[#212330] rounded-xl scrollbar-none">
            {[
              { id: 'personal', label: 'Personal', icon: <User className="w-3.5 h-3.5" /> },
              { id: 'experience', label: 'Experience', icon: <Briefcase className="w-3.5 h-3.5" /> },
              { id: 'education', label: 'Education', icon: <GraduationCap className="w-3.5 h-3.5" /> },
              { id: 'skills', label: 'Skills', icon: <Code2 className="w-3.5 h-3.5" /> },
              { id: 'projects', label: 'Projects', icon: <Layers className="w-3.5 h-3.5" /> },
              { id: 'certifications', label: 'Certifications', icon: <Award className="w-3.5 h-3.5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-white/[0.1] text-white font-semibold border border-white/[0.12] shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Form Content by Active Tab */}
          <div className="p-6 bg-[#12131b] border border-[#212330] rounded-2xl shadow-sm">
            {/* 1. PERSONAL INFO TAB */}
            {activeTab === 'personal' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <User className="w-4 h-4 text-indigo-400" />
                  Contact & Personal Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={resume.personalInfo.fullName}
                      onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0b0c10] border border-[#212330] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">Professional Headline</label>
                    <input
                      type="text"
                      value={resume.personalInfo.headline}
                      onChange={(e) => updatePersonalInfo({ headline: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0b0c10] border border-[#212330] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">Email</label>
                    <input
                      type="email"
                      value={resume.personalInfo.email}
                      onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0b0c10] border border-[#212330] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">Phone</label>
                    <input
                      type="text"
                      value={resume.personalInfo.phone}
                      onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0b0c10] border border-[#212330] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">Location</label>
                    <input
                      type="text"
                      value={resume.personalInfo.location}
                      onChange={(e) => updatePersonalInfo({ location: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0b0c10] border border-[#212330] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">LinkedIn URL</label>
                    <input
                      type="text"
                      value={resume.personalInfo.linkedin || ''}
                      onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0b0c10] border border-[#212330] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">GitHub / Portfolio</label>
                    <input
                      type="text"
                      value={resume.personalInfo.github || ''}
                      onChange={(e) => updatePersonalInfo({ github: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0b0c10] border border-[#212330] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Professional Executive Summary (ATS Parsed)
                  </label>
                  <textarea
                    rows={4}
                    value={resume.personalInfo.summary}
                    onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
                    className="w-full p-3 bg-[#0b0c10] border border-[#212330] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            )}

            {/* 2. EXPERIENCE TAB */}
            {activeTab === 'experience' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-indigo-400" />
                    Work Experience ({resume.experiences.length})
                  </h3>
                  <button
                    onClick={addExperience}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 rounded-xl text-xs font-semibold hover:bg-indigo-600/30 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Role</span>
                  </button>
                </div>

                {resume.experiences.map((exp) => (
                  <div key={exp.id} className="p-4 bg-[#0b0c10] border border-[#212330] rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                          placeholder="Role / Title"
                          className="font-bold text-sm text-white bg-transparent border-b border-zinc-700 pb-1 focus:outline-none focus:border-indigo-400"
                        />
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                          placeholder="Company Name"
                          className="text-xs text-indigo-400 bg-transparent border-b border-zinc-700 pb-1 focus:outline-none focus:border-indigo-400"
                        />
                      </div>
                      <button
                        onClick={() => removeExperience(exp.id)}
                        className="ml-3 p-1.5 text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
                        title="Remove role"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                        placeholder="Start (e.g. 2022-03)"
                        className="px-2.5 py-1 bg-[#12131b] border border-[#212330] rounded-lg text-zinc-200"
                      />
                      <input
                        type="text"
                        value={exp.isCurrent ? 'Present' : exp.endDate}
                        onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                        placeholder="End (e.g. Present)"
                        className="px-2.5 py-1 bg-[#12131b] border border-[#212330] rounded-lg text-zinc-200"
                      />
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                        placeholder="Location"
                        className="px-2.5 py-1 bg-[#12131b] border border-[#212330] rounded-lg text-zinc-200"
                      />
                    </div>

                    {/* Bullet Points with AI Enhancement */}
                    <div className="space-y-2 pt-2">
                      <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
                        Accomplishment Bullets
                      </label>
                      {exp.bulletPoints.map((bullet, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <div className="flex items-start gap-2">
                            <span className="text-indigo-400 text-sm mt-1">•</span>
                            <textarea
                              rows={2}
                              value={bullet}
                              onChange={(e) => updateBulletPoint(exp.id, idx, e.target.value)}
                              className="flex-1 p-2 bg-[#12131b] border border-[#212330] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                            />
                            <div className="flex flex-col gap-1">
                              <button
                                onClick={() => handleEnhanceBullet(exp.id, idx, bullet)}
                                className="p-1.5 rounded-lg bg-indigo-950/80 border border-indigo-700/80 text-indigo-300 hover:text-white hover:bg-indigo-900 text-[10px] font-medium flex items-center gap-1 cursor-pointer"
                                title="Enhance with AI"
                              >
                                <Wand2 className="w-3.5 h-3.5 text-indigo-400" />
                                <span className="hidden sm:inline">AI Fix</span>
                              </button>
                              <button
                                onClick={() => removeBulletPoint(exp.id, idx)}
                                className="p-1.5 text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* AI Suggestions Dropdown for this specific bullet */}
                          {enhancingExpId === exp.id && enhancingBulletIdx === idx && (
                            <div className="ml-5 p-3 rounded-2xl bg-[#161826] border border-indigo-700/50 space-y-2">
                              <div className="flex items-center justify-between text-xs text-indigo-300 font-semibold">
                                <span className="flex items-center gap-1.5">
                                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                                  Gemini AI Polish Alternatives
                                </span>
                                {loadingAi && (
                                  <span className="text-[10px] text-indigo-400 flex items-center gap-1 animate-pulse">
                                    <RefreshCw className="w-3 h-3 animate-spin" />
                                    Optimizing bullet...
                                  </span>
                                )}
                              </div>

                              {aiSuggestions.map((sug, sIdx) => (
                                <div
                                  key={sIdx}
                                  onClick={() => applyAiSuggestion(sug)}
                                  className="p-2.5 rounded-xl bg-[#0b0c10] border border-[#212330] hover:border-indigo-500 text-xs text-zinc-200 cursor-pointer transition-all hover:bg-[#12131b] flex items-start justify-between gap-2 group"
                                >
                                  <p className="flex-1 leading-relaxed">{sug}</p>
                                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-950 border border-indigo-800 text-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Use This
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}

                      <button
                        onClick={() => addBulletPoint(exp.id)}
                        className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 pt-1 font-medium cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Accomplishment Bullet</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 3. EDUCATION TAB */}
            {activeTab === 'education' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-indigo-400" />
                    Education Degrees
                  </h3>
                  <button
                    onClick={addEducation}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 rounded-xl text-xs font-semibold hover:bg-indigo-600/30 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Degree</span>
                  </button>
                </div>

                {resume.education.map((edu) => (
                  <div key={edu.id} className="p-4 bg-[#0b0c10] border border-[#212330] rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                        placeholder="Degree & Major (e.g. B.S. in Computer Science)"
                        className="font-bold text-sm text-white bg-transparent border-b border-zinc-700 pb-1 flex-1 focus:outline-none focus:border-indigo-400"
                      />
                      <button
                        onClick={() => removeEducation(edu.id)}
                        className="ml-3 p-1 text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                        placeholder="University / School"
                        className="px-2.5 py-1.5 bg-[#12131b] border border-[#212330] rounded-lg text-zinc-200"
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={edu.startDate}
                          onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                          placeholder="Grad Year (e.g. 2018)"
                          className="w-1/2 px-2.5 py-1.5 bg-[#12131b] border border-[#212330] rounded-lg text-zinc-200"
                        />
                        <input
                          type="text"
                          value={edu.location}
                          onChange={(e) => updateEducation(edu.id, { location: e.target.value })}
                          placeholder="Location"
                          className="w-1/2 px-2.5 py-1.5 bg-[#12131b] border border-[#212330] rounded-lg text-zinc-200"
                        />
                      </div>
                    </div>

                    <textarea
                      rows={2}
                      value={edu.highlights || ''}
                      onChange={(e) => updateEducation(edu.id, { highlights: e.target.value })}
                      placeholder="Honors, Thesis, GPA, Relevant Coursework"
                      className="w-full p-2 bg-[#12131b] border border-[#212330] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* 4. SKILLS TAB */}
            {activeTab === 'skills' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-indigo-400" />
                    Skills Categories
                  </h3>
                  <button
                    onClick={() => addSkillCategory('Specialized Stack')}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 rounded-xl text-xs font-semibold hover:bg-indigo-600/30 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Category</span>
                  </button>
                </div>

                {resume.skills.map((cat, idx) => (
                  <div key={idx} className="p-4 bg-[#0b0c10] border border-[#212330] rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{cat.category}</span>
                      <button
                        onClick={() => removeSkillCategory(idx)}
                        className="text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={cat.items.join(', ')}
                      onChange={(e) =>
                        updateSkills(
                          idx,
                          e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                        )
                      }
                      placeholder="Comma-separated skills (e.g. React, TypeScript, Node.js)"
                      className="w-full px-3 py-2 bg-[#12131b] border border-[#212330] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* 5. PROJECTS TAB */}
            {activeTab === 'projects' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-400" />
                    Key Projects
                  </h3>
                  <button
                    onClick={addProject}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 rounded-xl text-xs font-semibold hover:bg-indigo-600/30 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Project</span>
                  </button>
                </div>

                {resume.projects.map((proj) => (
                  <div key={proj.id} className="p-4 bg-[#0b0c10] border border-[#212330] rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={proj.name}
                        onChange={(e) => updateProject(proj.id, { name: e.target.value })}
                        placeholder="Project Name"
                        className="font-bold text-sm text-white bg-transparent border-b border-zinc-700 pb-1 flex-1 focus:outline-none focus:border-indigo-400"
                      />
                      <button
                        onClick={() => removeProject(proj.id)}
                        className="ml-3 p-1 text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <input
                      type="text"
                      value={proj.technologies.join(', ')}
                      onChange={(e) =>
                        updateProject(proj.id, {
                          technologies: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                        })
                      }
                      placeholder="Technologies (e.g. Next.js, Redis, Tailwind)"
                      className="w-full px-3 py-1.5 bg-[#12131b] border border-[#212330] rounded-xl text-xs text-zinc-300"
                    />

                    <textarea
                      rows={2}
                      value={proj.description}
                      onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                      placeholder="High-level description of what this project solved"
                      className="w-full p-2 bg-[#12131b] border border-[#212330] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* 6. CERTIFICATIONS TAB */}
            {activeTab === 'certifications' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-indigo-400" />
                    Certifications & Licenses
                  </h3>
                  <button
                    onClick={addCertification}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 rounded-xl text-xs font-semibold hover:bg-indigo-600/30 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Certification</span>
                  </button>
                </div>

                {resume.certifications.map((cert) => (
                  <div key={cert.id} className="p-4 bg-[#0b0c10] border border-[#212330] rounded-2xl flex items-center gap-3">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={cert.name}
                        onChange={(e) => updateCertification(cert.id, { name: e.target.value })}
                        placeholder="Certificate Title"
                        className="px-2.5 py-1.5 bg-[#12131b] border border-[#212330] rounded-lg text-xs text-white"
                      />
                      <input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
                        placeholder="Issuing Body (e.g. AWS)"
                        className="px-2.5 py-1.5 bg-[#12131b] border border-[#212330] rounded-lg text-xs text-white"
                      />
                      <input
                        type="text"
                        value={cert.date}
                        onChange={(e) => updateCertification(cert.id, { date: e.target.value })}
                        placeholder="Year"
                        className="px-2.5 py-1.5 bg-[#12131b] border border-[#212330] rounded-lg text-xs text-white"
                      />
                    </div>
                    <button
                      onClick={() => removeCertification(cert.id)}
                      className="text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Live Formatted Resume Document */}
        <div className={`lg:col-span-6 sticky top-24 ${previewMode ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-[#12131b] border border-[#212330] rounded-2xl p-3 mb-3 flex items-center justify-between text-xs text-zinc-300 print:hidden">
            <span className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              <span>Live ATS Document View</span>
            </span>
            <span className="text-[11px] text-zinc-400">Standard A4 / Letter format</span>
          </div>

          {/* Printable White Resume Canvas */}
          <div
            id="printable-resume"
            className="w-full bg-white text-slate-900 shadow-2xl rounded-2xl p-8 sm:p-10 font-sans transition-all overflow-hidden border border-slate-200"
            style={{ minHeight: '800px' }}
          >
            {/* Header: Name, Headline, Contact */}
            <div className="border-b pb-4 mb-5" style={{ borderColor: `${resume.accentColor}30` }}>
              <h1
                className="text-2xl sm:text-3xl font-extrabold tracking-tight"
                style={{ color: resume.accentColor }}
              >
                {resume.personalInfo.fullName || 'Your Full Name'}
              </h1>
              <p className="text-sm font-semibold text-slate-700 mt-1">
                {resume.personalInfo.headline || 'Professional Headline'}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 mt-2.5 font-medium">
                {resume.personalInfo.email && <span>{resume.personalInfo.email}</span>}
                {resume.personalInfo.phone && <span>• {resume.personalInfo.phone}</span>}
                {resume.personalInfo.location && <span>• {resume.personalInfo.location}</span>}
                {resume.personalInfo.linkedin && (
                  <span>• {resume.personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
                )}
                {resume.personalInfo.github && (
                  <span>• {resume.personalInfo.github.replace(/^https?:\/\//, '')}</span>
                )}
              </div>
            </div>

            {/* Summary */}
            {resume.personalInfo.summary && (
              <div className="mb-5">
                <h2
                  className="text-xs font-bold uppercase tracking-wider mb-1.5"
                  style={{ color: resume.accentColor }}
                >
                  Professional Summary
                </h2>
                <p className="text-xs text-slate-700 leading-relaxed text-justify">
                  {resume.personalInfo.summary}
                </p>
              </div>
            )}

            {/* Work Experience */}
            {resume.experiences.length > 0 && (
              <div className="mb-5">
                <h2
                  className="text-xs font-bold uppercase tracking-wider mb-2.5"
                  style={{ color: resume.accentColor }}
                >
                  Work Experience
                </h2>
                <div className="space-y-4">
                  {resume.experiences.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs font-bold text-slate-900">{exp.role}</span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="text-xs font-semibold text-slate-700">{exp.company}</span>
                        <span className="text-[11px] text-slate-500 italic">{exp.location}</span>
                      </div>
                      <ul className="list-disc ml-4 space-y-1 text-xs text-slate-700 leading-relaxed">
                        {exp.bulletPoints.map((b, bIdx) => (
                          <li key={bIdx}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {resume.skills.length > 0 && (
              <div className="mb-5">
                <h2
                  className="text-xs font-bold uppercase tracking-wider mb-2"
                  style={{ color: resume.accentColor }}
                >
                  Technical & Core Skills
                </h2>
                <div className="space-y-1.5 text-xs text-slate-800">
                  {resume.skills.map((cat, cIdx) => (
                    <div key={cIdx} className="leading-snug">
                      <strong className="text-slate-900">{cat.category}: </strong>
                      <span className="text-slate-700">{cat.items.join(', ')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {resume.projects.length > 0 && (
              <div className="mb-5">
                <h2
                  className="text-xs font-bold uppercase tracking-wider mb-2"
                  style={{ color: resume.accentColor }}
                >
                  Key Projects & Open Source
                </h2>
                <div className="space-y-2.5">
                  {resume.projects.map((proj) => (
                    <div key={proj.id}>
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs font-bold text-slate-900">{proj.name}</span>
                        {proj.technologies.length > 0 && (
                          <span className="text-[11px] font-medium text-slate-500">
                            [{proj.technologies.join(', ')}]
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-700 mt-0.5">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {resume.education.length > 0 && (
              <div className="mb-5">
                <h2
                  className="text-xs font-bold uppercase tracking-wider mb-2"
                  style={{ color: resume.accentColor }}
                >
                  Education
                </h2>
                <div className="space-y-2">
                  {resume.education.map((edu) => (
                    <div key={edu.id} className="text-xs">
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-slate-900">{edu.degree}</span>
                        <span className="text-[11px] text-slate-500">
                          {edu.startDate} – {edu.endDate}
                        </span>
                      </div>
                      <div className="text-slate-700">
                        {edu.institution}, {edu.location}
                      </div>
                      {edu.highlights && (
                        <div className="text-[11px] text-slate-500 italic mt-0.5">{edu.highlights}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {resume.certifications.length > 0 && (
              <div>
                <h2
                  className="text-xs font-bold uppercase tracking-wider mb-2"
                  style={{ color: resume.accentColor }}
                >
                  Certifications
                </h2>
                <div className="space-y-1 text-xs text-slate-700">
                  {resume.certifications.map((cert) => (
                    <div key={cert.id} className="flex justify-between">
                      <span>
                        <strong className="text-slate-900">{cert.name}</strong> – {cert.issuer}
                      </span>
                      <span className="text-slate-500">{cert.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
