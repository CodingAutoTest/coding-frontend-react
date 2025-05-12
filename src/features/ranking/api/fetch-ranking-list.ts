import { api, unwrap } from '@/lib/axios';

export type RankingItem = {
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
  const response = await api.get('/rankings', {
    params: { page, size, sort, order, name },
  });

  return unwrap(response);
};
