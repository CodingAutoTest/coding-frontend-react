import { api } from '@/lib/axios';

export const getUserTagStats = async (userId: number): Promise<Record<string, number>> => {
  const response = await api.get(`/user/${userId}/stats/tag`);
  return response.data.tagStats;
};
