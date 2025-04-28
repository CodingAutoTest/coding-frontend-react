export type ProgrammingLanguage = 'python' | 'java' | 'javascript' | 'cpp';

export const LANGUAGE_LABELS: Record<ProgrammingLanguage, string> = {
  python: 'Python',
  java: 'Java',
  javascript: 'JavaScript',
  cpp: 'C++',
};

export type ProblemDescriptionProps = {
  description: string;
  inputFormat: string;
  outputFormat: string;
};

export type ProblemType = {
  id: number;
  title: string;
  description: string;
  inputConstraints: string;
  outputConstraints: string;
  acceptanceRate: number;
  timeLimit: number;
  memoryLimit: number;
  tags: string[];
};

export type TestCaseType = {
  id: number;
  input: string;
  output: string;
};

export type ExecuteResultType = {
  id: number;
  output: string;
  status: string;
  executionTime: number;
  memoryUsage: number;
};

export type UserType = {
  name: string;
  profileImage: string;
};
