import { api, unwrap } from '@/lib/axios';

export const getUserTagStats = async (): Promise<Record<string, number>> => {
  const response = await api.get(`/users/stats/tag`);
  return unwrap<Record<string, number>>(response);
};
