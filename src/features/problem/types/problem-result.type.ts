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
  error?: string;
};
