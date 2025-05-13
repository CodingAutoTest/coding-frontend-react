import { useProblemStore } from '@/features/problem/stores/useProblemStore';
import { submitCode } from '../api/problem.api';
import { ProgrammingLanguage } from '@/features/problem/types/problem.type';

export const useCodeSubmit = () => {
  const { setIsSubmitting } = useProblemStore();

  const submit = async (
    problemId: number,
    code: string,
    language: ProgrammingLanguage,
  ): Promise<string> => {
    try {
      setIsSubmitting(true);
      const submissionId = await submitCode(problemId, code, language);
      return submissionId;
    } catch (error) {
      console.error('Error submitting code:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submit,
  };
};
