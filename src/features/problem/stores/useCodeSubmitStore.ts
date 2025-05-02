import { useProblemStore } from '@/features/problem/stores/useProblemStore';
import { submitCode } from '@/features/problem/api/problem.api';
import { fetchProblemSubmissionResult } from '@/features/problem/api/problem-result.api';

export const useCodeSubmit = () => {
  const { code, language, isSubmitting, setIsSubmitting, setSubmissionResult } = useProblemStore();

  const submit = async (problemId: number, userId: number) => {
    try {
      setIsSubmitting(true);
      const submissionId = await submitCode(problemId, code, language, userId);
      const result = await fetchProblemSubmissionResult(submissionId);
      setSubmissionResult(result);
      return result;
    } catch (error) {
      console.error('Error submitting code:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submit,
    isSubmitting,
  };
};
