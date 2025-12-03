
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  demoUrl?: string;
  repoUrl?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Nightmare';
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: 'Language' | 'Engine' | 'Tool' | 'Soft';
}

export interface Stat {
  subject: string;
  A: number; // Value
  fullMark: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isThinking?: boolean;
}

export enum AppScreen {
  START = 'START',
  HUB = 'HUB',
  RESUME = 'RESUME'
}

export interface ContributionDay {
  date: string; // ISO format YYYY-MM-DD
  count: number;
}

export interface GithubStats {
  totalCommits: number;
  totalRepos: number;
  totalStars: number;
  monthlyStreak: boolean;
  lastUpdated: string;
  history: ContributionDay[];
}

export const DIFFICULTY_XP = {
  Easy: 0.01,
  Medium: 0.03,
  Hard: 0.06,
  Nightmare: 0.1
};
