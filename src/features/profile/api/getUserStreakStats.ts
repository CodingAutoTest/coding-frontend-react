import { api } from '@/lib/axios';

export const getUserStreakStats = async (userId: number): Promise<Record<string, number>> => {
  const response = await api.get(`/users/${userId}/stats/streak`);
  return response.data.streakStats;
};
