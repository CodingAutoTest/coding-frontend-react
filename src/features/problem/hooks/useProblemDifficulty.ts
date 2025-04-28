import { useState, useEffect } from 'react';
import { getDifficulty } from '@/global/api/global.api';
import { DifficultyType } from '@/global/types/difficulty.types';

export const useProblemDifficulty = (problemId: number) => {
  const [difficulty, setDifficulty] = useState<DifficultyType | null>(null);

  useEffect(() => {
    const fetchDifficulty = async () => {
      try {
        const res = await getDifficulty(problemId);
        setDifficulty(res);
      } catch (err) {
        console.error('문제 난이도 불러오기 실패:', err);
      }
    };
    fetchDifficulty();
  }, [problemId]);

  return difficulty;
};
