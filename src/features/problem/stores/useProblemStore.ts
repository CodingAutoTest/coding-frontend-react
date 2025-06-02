import { create } from 'zustand';
import {
  ProblemType,
  TestCaseType,
  ProgrammingLanguage,
  ExecuteResultType,
  SubmissionResultType,
  SubmissionHistoryType,
} from '@/features/problem/types/problem.type';

interface ProblemStore {
  // 문제 + 테스트케이스
  problemData: ProblemType | null;
  testCases: TestCaseType[];

  // 코드 입력 + 언어 선택
  code: string;
  language: ProgrammingLanguage;

  // 실행 상태
  isExecuting: boolean;
  executeResults: ExecuteResultType[];

  // 제출 상태
  isSubmitting: boolean;
  submissionResult: SubmissionResultType | null;
  submissionHistory: SubmissionHistoryType[] | null;

  setProblemData: (data: ProblemType) => void;
  setTestCases: (data: TestCaseType[]) => void;
  setCode: (code: string) => void;
  setLanguage: (lang: ProgrammingLanguage) => void;
  setIsExecuting: (val: boolean) => void;
  setExecuteResults: (results: ExecuteResultType[]) => void;
  setIsSubmitting: (val: boolean) => void;
  setSubmissionResult: (result: SubmissionResultType) => void;
  setSubmissionHistory: (history: SubmissionHistoryType[]) => void;
}

export const useProblemStore = create<ProblemStore>((set) => ({
  // 문제 정보
  problemData: null,
  testCases: [],
  setProblemData: (data) => set({ problemData: data }),
  setTestCases: (data) => set({ testCases: data }),

  // 코드 관련
  code: '',
  language: 'python',
  setCode: (code) => set({ code }),
  setLanguage: (lang) => set({ language: lang }),

  // 실행 관련
  isExecuting: false,
  executeResults: [],
  setIsExecuting: (val) => set({ isExecuting: val }),
  setExecuteResults: (results) => set({ executeResults: results }),

  // 제출 관련
  isSubmitting: false,
  submissionResult: null,
  submissionHistory: null,
  setIsSubmitting: (val) => set({ isSubmitting: val }),
  setSubmissionResult: (result) => set({ submissionResult: result }),
  setSubmissionHistory: (history) => set({ submissionHistory: history }),
}));
