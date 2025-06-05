import { useProblemStore } from '@/features/problem/stores/useProblemStore';
import { executeCode } from '../api/problem.api';
import { useState } from 'react';
import { ExecuteResultType } from '@/features/problem/types/problem.type';

export const useCodeExecution = () => {
  const { code, language } = useProblemStore();
  const [isExecuting, setIsExecuting] = useState(false);
  const [executeResults, setExecuteResults] = useState<ExecuteResultType[]>([]);

  const execute = async (testcaseIds: number[]) => {
    try {
      setIsExecuting(true);
      const results = await executeCode(code, language, testcaseIds);
      setExecuteResults(results);
      return results;
    } catch (error) {
      console.error('Error executing code:', error);
      throw error;
    } finally {
      setIsExecuting(false);
    }
  };

  return {
    isExecuting,
    executeResults,
    execute,
  };
};
