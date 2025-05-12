import { api } from '@/lib/axios';

export const getUserLevelStats = async (userId: number): Promise<Record<string, number>> => {
  const response = await api.get(`/users/${userId}/stats/level`);
  return response.data.levelStats;
};
