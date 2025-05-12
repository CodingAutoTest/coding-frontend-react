import { api, unwrap } from '@/lib/axios';

export type AlgorithmTag = {
  id: number;
  name: string;
};

// 알고리즘 태그 조회
export const getAlgorithmTags = async (): Promise<AlgorithmTag[]> => {
  const response = await api.get<AlgorithmTag[]>('/tags');
  return unwrap(response);
};
