import { api, unwrap } from '@/lib/axios';

export const getUserLevelStats = async (): Promise<Record<string, number>> => {
  const response = await api.get(`/users/stats/level`);
  return unwrap<Record<string, number>>(response);
};
