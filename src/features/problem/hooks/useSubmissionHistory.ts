import { useState, useEffect } from 'react';
import { SubmissionHistoryType } from '../types/submission-history.type';
import { fetchProblemSubmissionHistory } from '../api/problem-result.api';

export const useSubmissionHistory = (problemId: number) => {
  const [data, setData] = useState<SubmissionHistoryType[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        const result = await fetchProblemSubmissionHistory(problemId);
        setData(result);
      } catch (err) {
        console.error('Error fetching submission history:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch submission history'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [problemId]);

  return { data, isLoading, error };
};
