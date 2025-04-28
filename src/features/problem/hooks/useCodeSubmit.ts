import { useState } from 'react';
import { useProblemStore } from '@/features/problem/stores/useProblemStore';
import { submitCode } from '../api/problem.api';

export const useCodeSubmit = () => {
  const { code, language } = useProblemStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<string>('');

  const submit = async (problemId: number, userId: number) => {
    try {
      setIsSubmitting(true);
      const result = await submitCode(problemId, code, language, userId);
      setSubmitResult(result);
    } catch (error) {
      console.error('Error submitting code:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    submitResult,
    submit,
  };
};
