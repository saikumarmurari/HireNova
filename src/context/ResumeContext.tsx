import React, { createContext, useContext, useState, useEffect } from 'react';
import { ResumeData, ResumeExperience, ResumeEducation, ResumeProject, ResumeCertification } from '../types';

interface ResumeContextType {
  resume: ResumeData;
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  updateExperience: (id: string, exp: Partial<ResumeExperience>) => void;
  addExperience: () => void;
  removeExperience: (id: string) => void;
  addBulletPoint: (expId: string, bulletText?: string) => void;
  updateBulletPoint: (expId: string, index: number, text: string) => void;
  removeBulletPoint: (expId: string, index: number) => void;
  updateEducation: (id: string, edu: Partial<ResumeEducation>) => void;
  addEducation: () => void;
  removeEducation: (id: string) => void;
  updateSkills: (categoryIndex: number, items: string[]) => void;
  addSkillCategory: (categoryName: string) => void;
  removeSkillCategory: (categoryIndex: number) => void;
  updateProject: (id: string, proj: Partial<ResumeProject>) => void;
  addProject: () => void;
  removeProject: (id: string) => void;
  updateCertification: (id: string, cert: Partial<ResumeCertification>) => void;
  addCertification: () => void;
  removeCertification: (id: string) => void;
  setTemplate: (tpl: 'modern' | 'executive' | 'minimal' | 'tech') => void;
  setAccentColor: (color: string) => void;
  resetResume: () => void;
  loadSampleResume: (role: 'software' | 'product' | 'data') => void;
  getRawResumeText: () => string;
}

const DEFAULT_RESUME: ResumeData = {
  id: 'res_default_01',
  title: 'Alex Rivera - Senior Full Stack Engineer',
  updatedAt: new Date().toISOString(),
  template: 'modern',
  accentColor: '#3b82f6', // Tailwind blue-500
  personalInfo: {
    fullName: 'Alex Rivera',
    headline: 'Senior Full Stack Engineer & Cloud Architect',
    email: 'alex.rivera@careerorbit.dev',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    website: 'https://alexrivera.dev',
    linkedin: 'linkedin.com/in/alexrivera-dev',
    github: 'github.com/alexrivera-cloud',
    summary:
      'High-impact Senior Full Stack Engineer with 7+ years of experience designing scalable microservices, high-traffic web applications, and resilient cloud architectures. Proven track record reducing system latency by 42% and driving engineering velocity across cross-functional teams at hyper-growth tech companies.',
  },
  experiences: [
    {
      id: 'exp_1',
      role: 'Lead Full Stack Engineer',
      company: 'Apex Cloud Solutions',
      location: 'San Francisco, CA',
      startDate: '2023-03',
      endDate: 'Present',
      isCurrent: true,
      bulletPoints: [
        'Spearheaded the redesign of enterprise cloud orchestration dashboard with React 19, TypeScript, and Node.js, improving page load times by 45% for 120,000+ daily active users.',
        'Architected a distributed event-driven message pipeline using Kafka and Go, boosting background data ingestion capacity by 3.2x while maintaining 99.99% uptime.',
        'Mentored 6 junior/mid-level software engineers, establishing automated CI/CD unit testing protocols that reduced pull request regression bugs by 38%.',
      ],
    },
    {
      id: 'exp_2',
      role: 'Senior Software Engineer',
      company: 'Nova Digital Systems',
      location: 'Mountain View, CA',
      startDate: '2020-08',
      endDate: '2023-02',
      isCurrent: false,
      bulletPoints: [
        'Engineered responsive web applications using React, Next.js, GraphQL, and PostgreSQL serving 2.4M monthly visitor sessions.',
        'Led database migration from legacy monolith to cloud-managed PostgreSQL, trimming p99 query latency from 850ms to 95ms.',
        'Automated Docker container deployment across Kubernetes clusters, cutting release cycle duration from 4 hours to 12 minutes.',
      ],
    },
    {
      id: 'exp_3',
      role: 'Full Stack Developer',
      company: 'ByteVibe Media',
      location: 'San Jose, CA',
      startDate: '2018-06',
      endDate: '2020-07',
      isCurrent: false,
      bulletPoints: [
        'Built full-stack internal customer analytics tools using TypeScript, Express, and Redis cache layers.',
        'Collaborated with UX and product teams to implement WCAG 2.1 AA accessibility standards, elevating customer satisfaction scores by 24%.',
      ],
    },
  ],
  education: [
    {
      id: 'edu_1',
      degree: 'B.S. in Computer Science',
      institution: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      startDate: '2014',
      endDate: '2018',
      gpa: '3.85 / 4.0',
      highlights: 'Dean’s Honors List, President of ACM Student Chapter, High Performance Distributed Computing Lab',
    },
  ],
  skills: [
    {
      category: 'Languages & Runtimes',
      items: ['TypeScript', 'JavaScript (ESNext)', 'Python', 'Go', 'SQL (PostgreSQL)', 'HTML5/CSS3'],
    },
    {
      category: 'Frameworks & Libraries',
      items: ['React 19', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS', 'GraphQL', 'Three.js'],
    },
    {
      category: 'Cloud & Infrastructure',
      items: ['Docker', 'Kubernetes', 'AWS (ECS, S3, RDS)', 'Google Cloud (Cloud Run)', 'CI/CD (GitHub Actions)', 'Kafka', 'Redis'],
    },
    {
      category: 'Methodologies & Best Practices',
      items: ['Microservices', 'System Design', 'Agile/Scrum', 'Test-Driven Development (TDD)', 'RESTful APIs', 'Performance Optimization'],
    },
  ],
  projects: [
    {
      id: 'proj_1',
      name: 'OmniStream Analytics Engine',
      description: 'Real-time telemetry and monitoring tool for distributed container fleets with interactive 3D cluster visualizer.',
      technologies: ['TypeScript', 'Three.js', 'Node.js', 'WebSocket', 'Tailwind'],
      link: 'https://github.com/alexrivera-cloud/omnistream',
      bulletPoints: [
        'Engineered 60fps WebGL canvas telemetry dashboard monitoring 500+ microservices in real time.',
        'Achieved 15k stars on GitHub with over 80 independent open-source contributors.',
      ],
    },
    {
      id: 'proj_2',
      name: 'HyperSync Cache Gateway',
      description: 'High-throughput edge cache proxy reducing database load by 60% for reads.',
      technologies: ['Go', 'Redis', 'Docker', 'Prometheus'],
      link: 'https://github.com/alexrivera-cloud/hypersync',
      bulletPoints: [
        'Benchmarked sub-5ms response times under 50,000 requests/sec synthetic loads.',
      ],
    },
  ],
  certifications: [
    {
      id: 'cert_1',
      name: 'AWS Certified Solutions Architect – Professional',
      issuer: 'Amazon Web Services',
      date: '2025',
    },
    {
      id: 'cert_2',
      name: 'Google Cloud Certified Professional Cloud Architect',
      issuer: 'Google Cloud',
      date: '2024',
    },
  ],
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resume, setResume] = useState<ResumeData>(() => {
    const saved = localStorage.getItem('careerorbit_resume');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_RESUME;
      }
    }
    return DEFAULT_RESUME;
  });

  useEffect(() => {
    localStorage.setItem('careerorbit_resume', JSON.stringify(resume));
  }, [resume]);

  const updatePersonalInfo = (info: Partial<ResumeData['personalInfo']>) => {
    setResume((prev) => ({
      ...prev,
      updatedAt: new Date().toISOString(),
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  };

  const updateExperience = (id: string, exp: Partial<ResumeExperience>) => {
    setResume((prev) => ({
      ...prev,
      updatedAt: new Date().toISOString(),
      experiences: prev.experiences.map((item) => (item.id === id ? { ...item, ...exp } : item)),
    }));
  };

  const addExperience = () => {
    const newExp: ResumeExperience = {
      id: `exp_${Date.now()}`,
      role: 'Senior Software Engineer',
      company: 'Tech Innovations Inc',
      location: 'Remote',
      startDate: '2024-01',
      endDate: 'Present',
      isCurrent: true,
      bulletPoints: [
        'Engineered core features resulting in 25% increase in customer adoption.',
        'Collaborated with cross-functional partners to streamline product releases.',
      ],
    };
    setResume((prev) => ({
      ...prev,
      updatedAt: new Date().toISOString(),
      experiences: [newExp, ...prev.experiences],
    }));
  };

  const removeExperience = (id: string) => {
    setResume((prev) => ({
      ...prev,
      updatedAt: new Date().toISOString(),
      experiences: prev.experiences.filter((e) => e.id !== id),
    }));
  };

  const addBulletPoint = (expId: string, bulletText: string = 'Accomplished key objective resulting in measurable impact.') => {
    setResume((prev) => ({
      ...prev,
      updatedAt: new Date().toISOString(),
      experiences: prev.experiences.map((exp) => {
        if (exp.id === expId) {
          return {
            ...exp,
            bulletPoints: [...exp.bulletPoints, bulletText],
          };
        }
        return exp;
      }),
    }));
  };

  const updateBulletPoint = (expId: string, index: number, text: string) => {
    setResume((prev) => ({
      ...prev,
      updatedAt: new Date().toISOString(),
      experiences: prev.experiences.map((exp) => {
        if (exp.id === expId) {
          const updatedBullets = [...exp.bulletPoints];
          updatedBullets[index] = text;
          return { ...exp, bulletPoints: updatedBullets };
        }
        return exp;
      }),
    }));
  };

  const removeBulletPoint = (expId: string, index: number) => {
    setResume((prev) => ({
      ...prev,
      updatedAt: new Date().toISOString(),
      experiences: prev.experiences.map((exp) => {
        if (exp.id === expId) {
          return {
            ...exp,
            bulletPoints: exp.bulletPoints.filter((_, i) => i !== index),
          };
        }
        return exp;
      }),
    }));
  };

  const updateEducation = (id: string, edu: Partial<ResumeEducation>) => {
    setResume((prev) => ({
      ...prev,
      updatedAt: new Date().toISOString(),
      education: prev.education.map((item) => (item.id === id ? { ...item, ...edu } : item)),
    }));
  };

  const addEducation = () => {
    const newEdu: ResumeEducation = {
      id: `edu_${Date.now()}`,
      degree: 'Master of Science in Computer Science',
      institution: 'Stanford University',
      location: 'Stanford, CA',
      startDate: '2020',
      endDate: '2022',
      highlights: 'Focus on Distributed Systems and Machine Learning',
    };
    setResume((prev) => ({
      ...prev,
      updatedAt: new Date().toISOString(),
      education: [...prev.education, newEdu],
    }));
  };

  const removeEducation = (id: string) => {
    setResume((prev) => ({
      ...prev,
      updatedAt: new Date().toISOString(),
      education: prev.education.filter((e) => e.id !== id),
    }));
  };

  const updateSkills = (categoryIndex: number, items: string[]) => {
    setResume((prev) => {
      const updated = [...prev.skills];
      if (updated[categoryIndex]) {
        updated[categoryIndex] = { ...updated[categoryIndex], items };
      }
      return { ...prev, updatedAt: new Date().toISOString(), skills: updated };
    });
  };

  const addSkillCategory = (categoryName: string) => {
    setResume((prev) => ({
      ...prev,
      updatedAt: new Date().toISOString(),
      skills: [...prev.skills, { category: categoryName, items: ['Example Skill 1', 'Example Skill 2'] }],
    }));
  };

  const removeSkillCategory = (categoryIndex: number) => {
    setResume((prev) => ({
      ...prev,
      updatedAt: new Date().toISOString(),
      skills: prev.skills.filter((_, idx) => idx !== categoryIndex),
    }));
  };

  const updateProject = (id: string, proj: Partial<ResumeProject>) => {
    setResume((prev) => ({
      ...prev,
      updatedAt: new Date().toISOString(),
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...proj } : p)),
    }));
  };

  const addProject = () => {
    const newProj: ResumeProject = {
      id: `proj_${Date.now()}`,
      name: 'Cloud Orchestrator CLI',
      description: 'Open-source CLI tool for seamless multi-region deployment.',
      technologies: ['TypeScript', 'Node.js', 'Docker'],
      link: 'https://github.com/example/cli',
      bulletPoints: ['Streamlined local dev environments for over 2,000 developers.'],
    };
    setResume((prev) => ({
      ...prev,
      updatedAt: new Date().toISOString(),
      projects: [...prev.projects, newProj],
    }));
  };

  const removeProject = (id: string) => {
    setResume((prev) => ({
      ...prev,
      updatedAt: new Date().toISOString(),
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const updateCertification = (id: string, cert: Partial<ResumeCertification>) => {
    setResume((prev) => ({
      ...prev,
      updatedAt: new Date().toISOString(),
      certifications: prev.certifications.map((c) => (c.id === id ? { ...c, ...cert } : c)),
    }));
  };

  const addCertification = () => {
    const newCert: ResumeCertification = {
      id: `cert_${Date.now()}`,
      name: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Linux Foundation / CNCF',
      date: '2025',
    };
    setResume((prev) => ({
      ...prev,
      updatedAt: new Date().toISOString(),
      certifications: [...prev.certifications, newCert],
    }));
  };

  const removeCertification = (id: string) => {
    setResume((prev) => ({
      ...prev,
      updatedAt: new Date().toISOString(),
      certifications: prev.certifications.filter((c) => c.id !== id),
    }));
  };

  const setTemplate = (template: 'modern' | 'executive' | 'minimal' | 'tech') => {
    setResume((prev) => ({ ...prev, template }));
  };

  const setAccentColor = (accentColor: string) => {
    setResume((prev) => ({ ...prev, accentColor }));
  };

  const resetResume = () => {
    setResume(DEFAULT_RESUME);
  };

  const loadSampleResume = (role: 'software' | 'product' | 'data') => {
    if (role === 'software') {
      setResume(DEFAULT_RESUME);
    } else if (role === 'product') {
      setResume({
        ...DEFAULT_RESUME,
        title: 'Elena Vance - Senior Product Manager',
        personalInfo: {
          ...DEFAULT_RESUME.personalInfo,
          fullName: 'Elena Vance',
          headline: 'Senior Product Manager | Growth & AI Platforms',
          summary:
            'Data-driven Product Leader with 6+ years spearheading AI-powered consumer experiences. Led zero-to-one launches generating $14M ARR, partnering with engineering and design to drive retention up by 32%.',
        },
        skills: [
          { category: 'Product Strategy', items: ['Roadmap Definition', 'Product Discovery', 'GTM Strategy', 'User Research', 'A/B Testing'] },
          { category: 'Analytics & Tools', items: ['Mixpanel', 'Amplitude', 'SQL', 'Jira', 'Figma', 'Tableau'] },
        ],
      });
    } else {
      setResume({
        ...DEFAULT_RESUME,
        title: 'Marcus Chen - Lead Data Scientist',
        personalInfo: {
          ...DEFAULT_RESUME.personalInfo,
          fullName: 'Marcus Chen',
          headline: 'Lead Data Scientist & Machine Learning Specialist',
          summary:
            'Quantitative Lead Data Scientist with deep expertise building predictive deep learning models, causal inference pipelines, and production NLP systems for fintech and e-commerce leaders.',
        },
        skills: [
          { category: 'Data & Machine Learning', items: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-Learn', 'Pandas', 'Spark', 'SQL'] },
          { category: 'Cloud & MLOps', items: ['MLflow', 'Docker', 'AWS SageMaker', 'Kubeflow', 'Airflow'] },
        ],
      });
    }
  };

  const getRawResumeText = (): string => {
    const { personalInfo, experiences, education, skills, projects, certifications } = resume;
    const lines: string[] = [];

    lines.push(personalInfo.fullName);
    lines.push(personalInfo.headline);
    lines.push(`${personalInfo.email} | ${personalInfo.phone} | ${personalInfo.location}`);
    if (personalInfo.summary) {
      lines.push('\nPROFESSIONAL SUMMARY');
      lines.push(personalInfo.summary);
    }

    if (experiences.length > 0) {
      lines.push('\nWORK EXPERIENCE');
      experiences.forEach((exp) => {
        lines.push(`${exp.role} - ${exp.company} (${exp.startDate} - ${exp.isCurrent ? 'Present' : exp.endDate})`);
        exp.bulletPoints.forEach((b) => lines.push(`• ${b}`));
      });
    }

    if (skills.length > 0) {
      lines.push('\nSKILLS');
      skills.forEach((s) => {
        lines.push(`${s.category}: ${s.items.join(', ')}`);
      });
    }

    if (education.length > 0) {
      lines.push('\nEDUCATION');
      education.forEach((edu) => {
        lines.push(`${edu.degree} - ${edu.institution} (${edu.startDate} - ${edu.endDate})`);
        if (edu.highlights) lines.push(`  Highlights: ${edu.highlights}`);
      });
    }

    if (projects.length > 0) {
      lines.push('\nPROJECTS');
      projects.forEach((p) => {
        lines.push(`${p.name} [${p.technologies.join(', ')}]`);
        lines.push(`  ${p.description}`);
        p.bulletPoints.forEach((b) => lines.push(`  • ${b}`));
      });
    }

    if (certifications.length > 0) {
      lines.push('\nCERTIFICATIONS');
      certifications.forEach((c) => {
        lines.push(`${c.name} - ${c.issuer} (${c.date})`);
      });
    }

    return lines.join('\n');
  };

  return (
    <ResumeContext.Provider
      value={{
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
        resetResume,
        loadSampleResume,
        getRawResumeText,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used within a ResumeProvider');
  return ctx;
};
