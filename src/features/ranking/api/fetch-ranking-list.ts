import { api, unwrap } from '@/lib/axios';
import { RankingListResponse } from '../types/ranking-types';

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

  return unwrap(response); // unwrap(response.data.result)
};
