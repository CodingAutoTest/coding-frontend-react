import { api } from '@/lib/axios';
import { unwrap } from '@/lib/axios';
import { SubmissionResultType } from '../types/problem-result.type';
import { SubmissionHistoryType } from '../types/submission-history.type';

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
  return unwrap<SubmissionHistoryType[]>(response);
};

export const getSubmissionCode = async (submissionId: number) => {
  const response = await api.get<{ result: string }>(`/submissions/code/${submissionId}`);
  return unwrap<string>(response);
};
