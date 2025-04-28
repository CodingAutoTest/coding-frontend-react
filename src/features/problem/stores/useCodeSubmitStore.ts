import { useProblemStore } from '@/features/problem/stores/useProblemStore';
import { submitCode } from '@/features/problem/api/problem.api';

export const useCodeSubmit = () => {
  const { code, language, isSubmitting, setIsSubmitting, setSubmitResult } = useProblemStore();

  const submit = async (problemId: number, userId: number) => {
    try {
      setIsSubmitting(true);
      const result = await submitCode(problemId, code, language, userId);
      setSubmitResult(result);
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
