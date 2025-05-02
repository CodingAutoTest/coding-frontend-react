import { useProblemStore } from '@/features/problem/stores/useProblemStore';
import { submitCode } from '../api/problem.api';
import { ProgrammingLanguage } from '@/features/problem/types/problem.type';

export const useCodeSubmit = () => {
  const { setIsSubmitting } = useProblemStore();

  const submit = async (
    problemId: number,
    code: string,
    language: ProgrammingLanguage,
    userId: number,
  ): Promise<string> => {
    try {
      setIsSubmitting(true);
      const submissionId = await submitCode(problemId, code, language, userId);
      return submissionId; // 여기까지만 리턴
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
