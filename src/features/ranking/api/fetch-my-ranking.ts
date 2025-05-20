/* eslint-disable @typescript-eslint/no-unused-vars */
import { api, unwrap } from '@/lib/axios';

export type MyRanking = {
  rank: number;
  name: string;
  profileImage: string;
  tier: string;
  rating: number;
  solvedCount: number;
  marathonDays: number;
};

export const fetchMyRanking = async (): Promise<MyRanking | null> => {
  try {
    const response = await api.get('/rankings/me');
    return unwrap<MyRanking>(response);
  } catch (_) {
    // 👇 로그인 안 한 사용자로 판단
    console.warn('🔒 로그인되지 않은 사용자');
    return null;
  }
};
