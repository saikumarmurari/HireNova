import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, pass: string, targetRole?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  quickDemoLogin: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  isAuthModalOpen: boolean;
  openAuthModal: (mode?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  authModalMode: 'login' | 'signup';
}

const DEFAULT_DEMO_USER: UserProfile = {
  id: 'usr_demo_101',
  name: 'Alex Rivera',
  email: 'alex.rivera@careerorbit.dev',
  headline: 'Senior Full Stack Engineer & Cloud Architect',
  phone: '+1 (555) 234-5678',
  location: 'San Francisco, CA (Hybrid / Remote)',
  linkedin: 'linkedin.com/in/alexrivera-dev',
  github: 'github.com/alexrivera-cloud',
  targetRole: 'Staff Software Engineer',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  bio: 'Passionate software craftsman with 7+ years architecting resilient web platforms, distributed cloud services, and AI-enabled product workflows.',
  createdAt: '2026-01-15T10:00:00Z',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('careerorbit_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_DEMO_USER;
      }
    }
    // Default to active demo user for immediate great experience
    return DEFAULT_DEMO_USER;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    if (user) {
      localStorage.setItem('careerorbit_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('careerorbit_user');
    }
  }, [user]);

  const login = async (email: string, _pass: string) => {
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    const existingAccountsStr = localStorage.getItem('careerorbit_accounts');
    const existingAccounts: UserProfile[] = existingAccountsStr ? JSON.parse(existingAccountsStr) : [];
    const found = existingAccounts.find((a) => a.email.toLowerCase() === email.toLowerCase());

    if (found) {
      setUser(found);
    } else {
      // Create session for user
      const loggedUser: UserProfile = {
        ...DEFAULT_DEMO_USER,
        id: `usr_${Date.now()}`,
        email,
        name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      };
      setUser(loggedUser);
    }
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const signup = async (name: string, email: string, _pass: string, targetRole?: string) => {
    if (!name || !email) {
      return { success: false, error: 'Name and email are required.' };
    }
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name,
      email,
      headline: `${targetRole || 'Software Professional'} | Seeking Next High-Impact Role`,
      targetRole: targetRole || 'Software Engineer',
      location: 'San Francisco, CA',
      avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
      bio: `Dedicated professional striving for excellence in ${targetRole || 'technology'}.`,
      createdAt: new Date().toISOString(),
    };

    const existingStr = localStorage.getItem('careerorbit_accounts');
    const existing: UserProfile[] = existingStr ? JSON.parse(existingStr) : [];
    existing.push(newUser);
    localStorage.setItem('careerorbit_accounts', JSON.stringify(existing));

    setUser(newUser);
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const quickDemoLogin = () => {
    setUser(DEFAULT_DEMO_USER);
    setIsAuthModalOpen(false);
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (!user) return;
    setUser({ ...user, ...updated });
  };

  const openAuthModal = (mode: 'login' | 'signup' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        quickDemoLogin,
        updateProfile,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        authModalMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
