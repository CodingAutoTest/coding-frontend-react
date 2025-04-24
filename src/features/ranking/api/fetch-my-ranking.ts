import { api } from '@/lib/axios';

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
  const res = await api.get('/api/me/ranking', {
    params: {
      userid: 1, // ✅ 'userid'로 정확히 보내야 함!
    },
  });

  return res.data.result.myRanking;
};
