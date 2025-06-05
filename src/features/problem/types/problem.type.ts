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

export type SubmissionResultType = {
  status: string;
  passedCount: number;
  totalCount: number;
  aiFeedbackDto: {
    accuracy: number;
    efficiency: number;
    readability: number;
    testCoverage: number;
    feedback?: string;
    totalScore?: number;
  };
  feedbacks: string[];
  judge0Status?: string;
  judge0Stderr?: string;
};

export type SubmissionHistoryType = {
  submissionId: number;
  createdAt: string;
  language: string;
  executionTime: number;
  memoryUsed: number;
  status: boolean;
  userName: string;
};

export type Difficulty = number;
export type Category = 'BASIC' | 'ARRAY' | 'STRING' | 'GRAPH' | 'DP' | 'MATH';
export type Language = 'PYTHON' | 'JAVA' | 'CPP' | 'JAVASCRIPT';

export interface User {
  id: number;
  name: string;
  profileImage: string;
  role: 'teacher' | 'student';
}

export interface TestCase {
  input: string;
  output: string;
  isExample: boolean;
}

export interface Problem {
  id: number;
  title: string;
  description: string;
  difficulty: Difficulty;
  category: Category;
  timeLimit: number;
  memoryLimit: number;
  testCases: TestCase[];
  createdAt: string;
  updatedAt: string;
  createdBy: User;
}

export interface ProblemDescription {
  description: string;
  descriptionDetail: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
}

export interface ProblemWithDescription extends Problem {
  description: string;
  descriptionDetail: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  algorithm: string;
}
