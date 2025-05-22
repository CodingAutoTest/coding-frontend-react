import { api, unwrap } from '@/lib/axios';
import { RankingListResponse } from '../types/ranking-types';

export const fetchRankingList = async (
  page = 0,
  size = 10,
  sort = 'rating',
  order = 'desc',
  name = '',
): Promise<RankingListResponse> => {
  try {
    const response = await api.get('/rankings', {
      params: { page, size, sort, order, name },
    });

    return unwrap(response);
  } catch (error) {
    console.error('❌ fetchRankingList 실패:', error);
    return {
      rankings: [],
      totalPages: 1,
      totalElements: 0, // ✅ 필수 필드 채움
    };
  }
};
