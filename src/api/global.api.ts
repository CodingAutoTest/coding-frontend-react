import { api, unwrap } from '@/lib/axios';
import { DifficultyType } from '@/types/difficulty';

export const getDifficulty = async (problemId: number): Promise<DifficultyType> => {
  const response = await api.get(`/problems/${problemId}/difficulty`);
  return unwrap<DifficultyType>(response);
};
