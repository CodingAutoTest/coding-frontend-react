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

export const fetchMyRanking = async (): Promise<MyRanking> => {
  const response = await api.get('/rankings/me');
  return unwrap<MyRanking>(response);
};
