import { User } from '../problem/types/problem.type';

export interface Ranking {
  id: number;
  userId: number;
  name: string;
  profileImage: string;
  role: 'student';
  solvedCount: number;
  totalScore: number;
  rank: number;
  recentSubmissions: {
    problemId: number;
    problemTitle: string;
    status: 'ACCEPTED' | 'WRONG_ANSWER';
    submittedAt: string;
  }[];
}

export interface RankingFilter {
  period?: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ALL';
  category?: string;
  difficulty?: string;
}
