export interface ProblemType {
  id: number;
  title: string;
  description: string;
  inputConstraints: string;
  outputConstraints: string;
  acceptanceRate: number;
  timeLimit: number;
  memoryLimit: number;
  tags: string[];
}

export interface TestCaseType {
  id: number;
  input: string;
  output: string;
}

export interface ExecuteResultType {
  id: number;
  output: string;
  status: string;
  executionTime: number;
  memoryUsage: number;
}

export interface UserType {
  name: string;
  profileImage: string;
}
