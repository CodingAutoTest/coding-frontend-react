import { User, Language } from './problem.type';

export type SubmissionStatus =
  | 'PENDING'
  | 'ACCEPTED'
  | 'WRONG_ANSWER'
  | 'TIME_LIMIT_EXCEEDED'
  | 'MEMORY_LIMIT_EXCEEDED'
  | 'RUNTIME_ERROR'
  | 'COMPILE_ERROR';

export interface Submission {
  id: number;
  problemId: number;
  problemTitle: string;
  code: string;
  language: Language;
  status: SubmissionStatus;
  executionTime: number;
  memoryUsage: number;
  submittedAt: string;
  submittedBy: User;
}

export interface SubmissionResult {
  status: SubmissionStatus;
  passedCount: number;
  totalCount: number;
  executionTime: number;
  memoryUsage: number;
  errorMessage?: string;
  testResults: {
    input: string;
    expectedOutput: string;
    actualOutput: string;
    passed: boolean;
  }[];
}

export interface SubmissionFeedback {
  accuracy: number;
  efficiency: number;
  readability: number;
  testCoverage: number;
  feedback: string;
  totalScore: number;
}
 