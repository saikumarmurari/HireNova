import React, { createContext, useContext, useState, useEffect } from 'react';
import { JobApplication, JobStatus } from '../types';

interface JobContextType {
  applications: JobApplication[];
  addApplication: (app: Omit<JobApplication, 'id'>) => void;
  updateApplication: (id: string, app: Partial<JobApplication>) => void;
  deleteApplication: (id: string) => void;
  updateStatus: (id: string, newStatus: JobStatus) => void;
  resetToDefaultApplications: () => void;
  stats: {
    total: number;
    applied: number;
    interview: number;
    offer: number;
    selected: number;
    rejected: number;
    interviewRate: number;
    offerRate: number;
  };
}

const DEFAULT_APPLICATIONS: JobApplication[] = [
  {
    id: 'app_1',
    company: 'Stripe',
    position: 'Staff Infrastructure Engineer',
    status: 'interview',
    location: 'San Francisco, CA (Hybrid)',
    type: 'Full-time',
    salary: '$220,000 - $265,000 + Equity',
    appliedDate: '2026-10-12',
    interviewDate: '2026-11-04T10:00:00Z',
    contactPerson: 'Sarah Jenkins (Technical Recruiter)',
    jobUrl: 'https://stripe.com/jobs/infra-staff',
    notes: 'Technical screen passed with flying colors! Virtual on-site scheduled for systems architecture and API design.',
    tags: ['Distributed Systems', 'Go', 'High Compensation', 'Top Choice'],
  },
  {
    id: 'app_2',
    company: 'Anthropic',
    position: 'Senior Full Stack Systems Engineer',
    status: 'offer',
    location: 'San Francisco, CA (On-site)',
    type: 'Full-time',
    salary: '$240,000 - $290,000 + Equity',
    appliedDate: '2026-09-28',
    interviewDate: '2026-10-24T14:00:00Z',
    contactPerson: 'David Miller (Head of Engineering)',
    jobUrl: 'https://anthropic.com/careers',
    notes: 'Official offer received! Base: $250k, 4-year equity grant. Negotiating start date.',
    tags: ['AI / LLMs', 'React', 'TypeScript', 'Hot Offer'],
  },
  {
    id: 'app_3',
    company: 'Linear',
    position: 'Product Engineer - Core Experience',
    status: 'selected',
    location: 'Remote (Global)',
    type: 'Full-time',
    salary: '$190,000 - $230,000',
    appliedDate: '2026-10-02',
    interviewDate: '2026-10-20T11:00:00Z',
    contactPerson: 'Karri Saarinen',
    jobUrl: 'https://linear.app/careers',
    notes: 'Selected as top candidate! Final team alignment call completed.',
    tags: ['Remote', 'Craft', 'TypeScript', 'Selected'],
  },
  {
    id: 'app_4',
    company: 'Vercel',
    position: 'Senior Developer Experience Engineer',
    status: 'interview',
    location: 'Remote (US)',
    type: 'Full-time',
    salary: '$180,000 - $220,000',
    appliedDate: '2026-10-18',
    interviewDate: '2026-11-06T15:30:00Z',
    contactPerson: 'Marcus V.',
    jobUrl: 'https://vercel.com/careers',
    notes: 'Take-home coding project submitted. Round 2 architecture interview next week.',
    tags: ['Next.js', 'React', 'DevRel', 'Remote'],
  },
  {
    id: 'app_5',
    company: 'Datadog',
    position: 'Cloud Reliability Architect',
    status: 'applied',
    location: 'San Francisco / Remote',
    type: 'Full-time',
    salary: '$200,000 - $240,000',
    appliedDate: '2026-10-27',
    notes: 'Applied via employee referral from college alumni. Application under hiring manager review.',
    tags: ['Observability', 'Kubernetes', 'Referral'],
  },
  {
    id: 'app_6',
    company: 'Snowflake',
    position: 'Senior Distributed Data Engineer',
    status: 'rejected',
    location: 'San Mateo, CA',
    type: 'Full-time',
    salary: '$210,000 - $250,000',
    appliedDate: '2026-09-15',
    notes: 'Team decided to hire candidate with 10+ years dedicated C++ kernel experience. Recruiter kept profile for future teams.',
    tags: ['Data', 'C++', 'Archived'],
  },
];

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [applications, setApplications] = useState<JobApplication[]>(() => {
    const saved = localStorage.getItem('careerorbit_applications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_APPLICATIONS;
      }
    }
    return DEFAULT_APPLICATIONS;
  });

  useEffect(() => {
    localStorage.setItem('careerorbit_applications', JSON.stringify(applications));
  }, [applications]);

  const addApplication = (appData: Omit<JobApplication, 'id'>) => {
    const newApp: JobApplication = {
      ...appData,
      id: `app_${Date.now()}`,
    };
    setApplications((prev) => [newApp, ...prev]);
  };

  const updateApplication = (id: string, updated: Partial<JobApplication>) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, ...updated } : app))
    );
  };

  const deleteApplication = (id: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  };

  const updateStatus = (id: string, newStatus: JobStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  const resetToDefaultApplications = () => {
    setApplications(DEFAULT_APPLICATIONS);
  };

  const total = applications.length;
  const applied = applications.filter((a) => a.status === 'applied').length;
  const interview = applications.filter((a) => a.status === 'interview').length;
  const offer = applications.filter((a) => a.status === 'offer').length;
  const selected = applications.filter((a) => a.status === 'selected').length;
  const rejected = applications.filter((a) => a.status === 'rejected').length;

  const interviewRate = total > 0 ? Math.round(((interview + offer + selected) / total) * 100) : 0;
  const offerRate = total > 0 ? Math.round(((offer + selected) / total) * 100) : 0;

  return (
    <JobContext.Provider
      value={{
        applications,
        addApplication,
        updateApplication,
        deleteApplication,
        updateStatus,
        resetToDefaultApplications,
        stats: {
          total,
          applied,
          interview,
          offer,
          selected,
          rejected,
          interviewRate,
          offerRate,
        },
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const ctx = useContext(JobContext);
  if (!ctx) throw new Error('useJobs must be used within a JobProvider');
  return ctx;
};
