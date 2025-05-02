import { api } from '@/lib/axios';
import { ProblemType, TestCaseType, ExecuteResultType, UserType } from '../types/problem.api.type';
import { unwrap } from '@/lib/axios';
import { ProgrammingLanguage } from '../types/problem.type';

export const fetchProblem = async (problemId: string): Promise<ProblemType> => {
  const res = await api.get(`/problems/${problemId}`);
  return unwrap<ProblemType>(res, 'result');
};

export const fetchTestCases = async (problemId: string): Promise<TestCaseType[]> => {
  const res = await api.get(`/testcases/${problemId}`);
  return unwrap<TestCaseType[]>(res, 'result');
};

export const executeCode = async (
  code: string,
  language: ProgrammingLanguage,
  testcaseIds: number[],
): Promise<ExecuteResultType[]> => {
  const response = await api.post(`/judge/execute`, {
    code,
    language,
    testcase_ids: testcaseIds,
  });

  return response.data.result.result.results;
};

export const submitCode = async (
  problemId: number,
  code: string,
  language: ProgrammingLanguage,
  userId: number,
) => {
  const response = await api.post(`/judge/submit`, {
    problem_id: problemId,
    language,
    code,
    user_id: userId,
  });

  const result = unwrap<{ user_submission_problem_id: string }>(response, 'result');
  return result.user_submission_problem_id;
};

export const fetchUser = async (userId: number): Promise<UserType> => {
  const response = await api.get(`/users/${userId}/nameAndImage`);
  return unwrap<UserType>(response, 'result');
};
