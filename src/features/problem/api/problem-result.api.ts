import { api } from '@/lib/axios';
import { unwrap } from '@/lib/axios';
import { SubmissionResultType } from '../types/problem-result.type';

export const fetchProblemSubmissionResult = async (
  submissionId: string,
): Promise<SubmissionResultType> => {
  const res = await api.get<{ result: SubmissionResultType }>(`/submissions/${submissionId}`);
  console.log(submissionId);
  return unwrap<SubmissionResultType>(res, 'result');
};
