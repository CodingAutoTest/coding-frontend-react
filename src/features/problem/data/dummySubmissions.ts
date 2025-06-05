import { Submission, SubmissionResult, SubmissionFeedback } from '../types/submission.type';

export const dummySubmissions: Submission[] = [
  {
    id: 1,
    problemId: 1,
    problemTitle: '두 수의 합',
    code: 'a, b = map(int, input().split())\nprint(a + b)',
    language: 'PYTHON',
    status: 'ACCEPTED',
    executionTime: 15,
    memoryUsage: 8,
    submittedAt: '2024-03-15T10:00:00Z',
    submittedBy: {
      id: 3,
      name: '학생1',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
      role: 'student',
    },
  },
  {
    id: 2,
    problemId: 1,
    problemTitle: '두 수의 합',
    code: 'a, b = map(int, input().split())\nprint(a - b)', // 잘못된 코드
    language: 'PYTHON',
    status: 'WRONG_ANSWER',
    executionTime: 12,
    memoryUsage: 8,
    submittedAt: '2024-03-15T09:30:00Z',
    submittedBy: {
      id: 4,
      name: '학생2',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
      role: 'student',
    },
  },
  {
    id: 3,
    problemId: 2,
    problemTitle: '배열의 최댓값',
    code: 'n = int(input())\narr = list(map(int, input().split()))\nprint(max(arr))',
    language: 'PYTHON',
    status: 'ACCEPTED',
    executionTime: 20,
    memoryUsage: 12,
    submittedAt: '2024-03-15T11:00:00Z',
    submittedBy: {
      id: 3,
      name: '학생1',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
      role: 'student',
    },
  },
];

export const dummySubmissionResults: Record<number, SubmissionResult> = {
  1: {
    status: 'ACCEPTED',
    passedCount: 3,
    totalCount: 3,
    executionTime: 15,
    memoryUsage: 8,
    testResults: [
      {
        input: '1 2',
        expectedOutput: '3',
        actualOutput: '3',
        passed: true,
      },
      {
        input: '5 7',
        expectedOutput: '12',
        actualOutput: '12',
        passed: true,
      },
      {
        input: '10 20',
        expectedOutput: '30',
        actualOutput: '30',
        passed: true,
      },
    ],
  },
  2: {
    status: 'WRONG_ANSWER',
    passedCount: 0,
    totalCount: 3,
    executionTime: 12,
    memoryUsage: 8,
    testResults: [
      {
        input: '1 2',
        expectedOutput: '3',
        actualOutput: '-1',
        passed: false,
      },
      {
        input: '5 7',
        expectedOutput: '12',
        actualOutput: '-2',
        passed: false,
      },
      {
        input: '10 20',
        expectedOutput: '30',
        actualOutput: '-10',
        passed: false,
      },
    ],
  },
  3: {
    status: 'ACCEPTED',
    passedCount: 3,
    totalCount: 3,
    executionTime: 20,
    memoryUsage: 12,
    testResults: [
      {
        input: '5\n1 2 3 4 5',
        expectedOutput: '5',
        actualOutput: '5',
        passed: true,
      },
      {
        input: '3\n10 5 8',
        expectedOutput: '10',
        actualOutput: '10',
        passed: true,
      },
      {
        input: '4\n-1 -2 -3 -4',
        expectedOutput: '-1',
        actualOutput: '-1',
        passed: true,
      },
    ],
  },
};

export const dummySubmissionFeedbacks: Record<number, SubmissionFeedback> = {
  1: {
    accuracy: 100,
    efficiency: 95,
    readability: 90,
    testCoverage: 100,
    feedback:
      '코드가 매우 깔끔하고 효율적입니다. 변수명도 직관적이고, 불필요한 공백이나 주석이 없어 가독성이 좋습니다.',
    totalScore: 95,
  },
  2: {
    accuracy: 0,
    efficiency: 80,
    readability: 85,
    testCoverage: 100,
    feedback:
      '코드의 구조는 좋지만, 문제의 요구사항을 잘못 이해했습니다. 덧셈 연산을 뺄셈 연산으로 잘못 구현했습니다.',
    totalScore: 45,
  },
  3: {
    accuracy: 100,
    efficiency: 90,
    readability: 95,
    testCoverage: 100,
    feedback:
      'max() 함수를 사용하여 효율적으로 구현했습니다. 변수명도 명확하고 코드 구조도 깔끔합니다.',
    totalScore: 92,
  },
};
