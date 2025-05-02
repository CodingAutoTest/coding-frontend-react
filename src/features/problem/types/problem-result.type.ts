export type SubmissionResultType = {
  status: string;
  passedCount: number;
  totalCount: number;
  scores: {
    accuracy: number;
    efficiency: number;
    readability: number;
    testCoverage: number;
  };
  feedbacks: string[];
  error?: string;
  feedback?: string;
  totalScore?: number;
};
