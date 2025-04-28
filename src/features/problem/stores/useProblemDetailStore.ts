import { useEffect, useState } from 'react';
import { fetchProblem, fetchTestCases } from '@/features/problem/api/problem.api';
import { useProblemStore } from '@/features/problem/stores/useProblemStore';

export const useProblemDetail = (problemId: number) => {
  const { setProblemData, setTestCases } = useProblemStore();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [problem, testCases] = await Promise.all([
          fetchProblem(problemId.toString()),
          fetchTestCases(problemId.toString()),
        ]);
        setProblemData(problem);
        setTestCases(testCases);
        setError(null);
      } catch (err) {
        console.error('문제 데이터를 불러오는데 실패했습니다.', err);
        setError('문제 데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (problemId) fetchData();
  }, [problemId, setProblemData, setTestCases]);

  return {
    loading,
    error,
  };
};
