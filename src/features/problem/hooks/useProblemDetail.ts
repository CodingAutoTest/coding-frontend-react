import { useEffect, useState } from 'react';
import { fetchProblem, fetchTestCases } from '../api/problem.api';
import { useProblemStore } from '@/features/problem/stores/useProblemStore';

export const useProblemDetail = (problemId: number) => {
  const { setProblemData, setTestCases } = useProblemStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [problemResponse, testCasesResponse] = await Promise.all([
          fetchProblem(problemId.toString()),
          fetchTestCases(problemId.toString()),
        ]);
        setProblemData(problemResponse);
        setTestCases(testCasesResponse);
        setError(null);
      } catch (err) {
        console.error('Error fetching problem data:', err);
        setError('문제 데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (problemId) {
      fetchData();
    }
  }, [problemId, setProblemData, setTestCases]);

  return {
    loading,
    error,
  };
};
