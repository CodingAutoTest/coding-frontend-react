import { api, unwrap } from '@/lib/axios';

export const getUserStreakStats = async (): Promise<Record<string, number>> => {
  const response = await api.get(`/users/stats/streak`);
  return unwrap<Record<string, number>>(response);
};
