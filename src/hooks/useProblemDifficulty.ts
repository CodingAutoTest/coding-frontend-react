import { useState, useEffect } from 'react';
import { getDifficulty } from '@/api/global.api';
import { DifficultyType } from '@/types/difficulty';

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
