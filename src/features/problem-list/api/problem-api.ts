import { api } from '@/lib/axios';

export type Problem = {
  userId?: number;
  id: number;
  title: string;
  difficulty: number;
  status: number;
  acceptanceRate: number;
};

export type ProblemResponse = {
  problems: Problem[];
  totalPages: number;
};

// 문제 목록 조회
export const getProblems = async (
  page: number,
  size: number,
  status?: string,
  tier?: string,
  tagId?: number,
  search?: string,
): Promise<ProblemResponse> => {
  const response = await api.get<ProblemResponse>('/problems', {
    params: {
      page,
      size,
      ...(status && { status }),
      ...(tier && { tier }),
      ...(tagId && { tagId }),
      ...(search && { search }),
    },
  });
  return response.data;
};
