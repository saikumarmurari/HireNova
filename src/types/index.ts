export interface UserProfile {
  id: string;
  name: string;
  email: string;
  headline: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  targetRole?: string;
  avatarUrl?: string;
  bio?: string;
  createdAt: string;
}

export interface ResumeExperience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  bulletPoints: string[];
}

export interface ResumeEducation {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  highlights?: string;
}

export interface ResumeProject {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  bulletPoints: string[];
}

export interface ResumeCertification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface ResumeData {
  id: string;
  userId?: string;
  title: string;
  updatedAt: string;
  template: 'modern' | 'executive' | 'minimal' | 'tech';
  accentColor: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    headline: string;
    website?: string;
    linkedin?: string;
    github?: string;
    summary: string;
  };
  experiences: ResumeExperience[];
  education: ResumeEducation[];
  skills: {
    category: string;
    items: string[];
  }[];
  projects: ResumeProject[];
  certifications: ResumeCertification[];
}

export interface ResumeAnalysisScore {
  overallScore: number; // 0 - 100
  atsScore: number;
  readabilityScore: number;
  impactScore: number;
  grammarScore: number;
  summaryFeedback: string;
  strengths: string[];
  criticalIssues: {
    section: string;
    issue: string;
    recommendation: string;
    severity: 'high' | 'medium' | 'low';
  }[];
  missingKeywords: string[];
  actionVerbCount: number;
  metricsPresentCount: number;
  suggestedActionItems: string[];
}

export interface JobMatchResult {
  matchScore: number; // 0 - 100
  matchGrade: 'Exceptional' | 'Strong' | 'Moderate' | 'Low';
  roleTitle: string;
  companyName: string;
  matchedSkills: string[];
  missingSkills: string[];
  keywordDensity: {
    keyword: string;
    foundInResume: boolean;
    importance: 'Critical' | 'Preferred' | 'Bonus';
  }[];
  atsCompatibilityChecklist: {
    criterion: string;
    passed: boolean;
    notes: string;
  }[];
  tailoringRecommendations: string[];
  optimizedSummarySuggestion: string;
}

export interface CoverLetterData {
  id: string;
  jobTitle: string;
  company: string;
  recipientName: string;
  tone: 'professional' | 'confident' | 'enthusiastic' | 'concise';
  keyHighlights: string;
  content: string;
  createdAt: string;
}

export type JobStatus = 'applied' | 'interview' | 'offer' | 'rejected' | 'selected';

export interface JobApplication {
  id: string;
  userId?: string;
  company: string;
  position: string;
  status: JobStatus;
  location: string;
  type: 'Full-time' | 'Remote' | 'Hybrid' | 'Contract' | 'Part-time';
  salary: string;
  appliedDate: string;
  interviewDate?: string;
  contactPerson?: string;
  jobUrl?: string;
  notes: string;
  tags: string[];
}

export interface InterviewQuestion {
  id: string;
  role: string;
  category: 'behavioral' | 'technical' | 'situational' | 'leadership';
  question: string;
  difficulty: 'Junior' | 'Mid' | 'Senior';
  idealAnswerGuidelines: string[];
  sampleStarResponse: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
}

export interface InterviewEvaluation {
  score: number; // 0 - 100
  feedback: string;
  starAssessment: {
    situationTask: string;
    actionDetail: string;
    measurableResult: string;
  };
  strengths: string[];
  improvements: string[];
  betterPhrasingTip: string;
}

export interface SkillGapAnalysis {
  targetRole: string;
  userSkills: string[];
  requiredSkills: {
    name: string;
    importance: 'Essential' | 'Important' | 'Nice-to-have';
    userProficiency: number; // 0 to 100
    targetProficiency: number; // 0 to 100
    gap: number;
    recommendedResource: string;
    resourceType: 'Course' | 'Project' | 'Documentation' | 'Book';
    estHoursToLearn: number;
  }[];
  readinessPercentage: number;
  weeksToJobReady: number;
  learningRoadmap: {
    phase: string;
    timeline: string;
    focus: string;
    milestones: string[];
  }[];
}
