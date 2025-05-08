import { api } from '@/lib/axios';

export type RankingItem = {
  userId: number; // ✅ 추가
  rank: number;
  name: string;
  profileImage: string;
  tier: string;
  rating: number;
  solvedCount: number;
  marathonDays: number;
};

export type RankingListResponse = {
  rankings: RankingItem[];
  totalPages: number;
  totalElements: number;
};

export const fetchRankingList = async (
  page = 0,
  size = 10,
  sort = 'rating',
  order = 'desc',
  name = '',
): Promise<RankingListResponse> => {
  const res = await api.get('/api/ranking', {
    params: { page, size, sort, order, name },
  });

  // ✅ 중첩 구조 풀어서 꺼내기
  const data = res.data?.result?.result;

  // 혹시라도 undefined면 기본값 줌
  return {
    rankings: data?.rankings ?? [],
    totalPages: data?.totalPages ?? 1,
    totalElements: data?.totalElements ?? 0,
  };
};
