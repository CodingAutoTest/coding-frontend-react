import { api } from '@/lib/axios';
import { DifficultyType } from '@/global/types/difficulty.types';

export const getDifficulty = async (problemId: number): Promise<DifficultyType> => {
  const response = await api.get(`/problems/${problemId}/difficulty`);
  return response.data.result;
};
