import { api, unwrap } from '@/lib/axios';
import { ProblemType, TestCaseType, ExecuteResultType, UserType } from '../types/problem.api.type';
import { ProgrammingLanguage } from '../types/problem.type';

export const fetchProblem = async (problemId: string): Promise<ProblemType> => {
  const res = await api.get(`/problems/${problemId}`);
  return unwrap<ProblemType>(res);
};

export const fetchTestCases = async (problemId: string): Promise<TestCaseType[]> => {
  const res = await api.get(`/testcases/${problemId}`);
  return unwrap<TestCaseType[]>(res);
};

export const executeCode = async (
  code: string,
  language: ProgrammingLanguage,
  testcaseIds: number[],
): Promise<ExecuteResultType[]> => {
  const response = await api.post(`/judges/execute`, {
    code,
    language,
    testcase_ids: testcaseIds,
  });

  return unwrap<{ results: ExecuteResultType[] }>(response).results;
};

export const submitCode = async (
  problemId: number,
  code: string,
  language: ProgrammingLanguage,
) => {
  const response = await api.post(`/judges/submit`, {
    problem_id: problemId,
    language,
    code,
  });

  return unwrap<{ user_submission_problem_id: string }>(response).user_submission_problem_id;
};

export const fetchUser = async (): Promise<UserType> => {
  const response = await api.get(`/users/nameAndImage`);
  return unwrap<UserType>(response);
};
