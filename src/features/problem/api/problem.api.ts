import { api, unwrap } from '@/lib/axios';
import {
  ProblemType,
  TestCaseType,
  ExecuteResultType,
  UserType,
  SubmissionResultType,
  SubmissionHistoryType,
} from '../types/problem.type';
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

export const fetchProblemSubmissionResult = async (
  submissionId: string,
): Promise<SubmissionResultType> => {
  const response = await api.get<{ result: SubmissionResultType }>(`/submissions/${submissionId}`);
  return unwrap<SubmissionResultType>(response);
};

export const fetchProblemSubmissionHistory = async (
  problemId: number,
): Promise<SubmissionHistoryType[]> => {
  const response = await api.get<{ result: SubmissionHistoryType[] }>(
    `/submissions/history/${problemId}`,
  );
  console.log('제출 내역 API 원본 응답:', response);
  return unwrap<SubmissionHistoryType[]>(response);
};

export const getSubmissionCode = async (submissionId: number) => {
  const response = await api.get<{ result: string }>(`/submissions/code/${submissionId}`);
  return unwrap<string>(response);
};
