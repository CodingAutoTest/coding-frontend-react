import { useProblemStore } from '@/features/problem/stores/useProblemStore';
import { executeCode } from '@/features/problem/api/problem.api';

export const useCodeExecution = () => {
  const { code, language, setIsExecuting, setExecuteResults } = useProblemStore();

  const execute = async (testcaseIds: number[]) => {
    try {
      setIsExecuting(true);
      const results = await executeCode(code, language, testcaseIds);
      setExecuteResults(results);

      const passedCount = results.filter((r) => r.status === 'Accepted').length;
      const totalCount = results.length;

      return { results, passedCount, totalCount };
    } catch (error) {
      console.error('Error executing code:', error);
      throw error;
    } finally {
      setIsExecuting(false);
    }
  };

  return {
    execute,
  };
};
