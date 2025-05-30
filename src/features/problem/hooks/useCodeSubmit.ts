import { useProblemStore } from '@/features/problem/stores/useProblemStore';
import { submitCode, fetchProblemSubmissionResult } from '../api/problem.api';
import { ProgrammingLanguage } from '@/features/problem/types/problem.type';

export const useCodeSubmit = () => {
  const { code, language, isSubmitting, setIsSubmitting, setSubmissionResult } = useProblemStore();

  const submit = async (problemId: number) => {
    try {
      setIsSubmitting(true);
      const submissionId = await submitCode(problemId, code, language);
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

  const submitWithCode = async (
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
    submitWithCode,
    isSubmitting,
  };
};
