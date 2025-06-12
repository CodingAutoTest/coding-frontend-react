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
    return null;
  }
};
