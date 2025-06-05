import { Problem, ProblemWithDescription } from '../types/problem.type';

export const dummyProblems: ProblemWithDescription[] = [
  {
    id: 1,
    title: '두 수의 합',
    description: '두 정수 a와 b를 입력받아 a + b를 출력하는 프로그램을 작성하세요.',
    descriptionDetail: {
      description: '두 정수 a와 b를 입력받아 a + b를 출력하는 프로그램을 작성하세요.',
      inputFormat: '첫째 줄에 정수 a, 둘째 줄에 정수 b가 주어진다. (-10^9 ≤ a, b ≤ 10^9)',
      outputFormat: '첫째 줄에 a + b를 출력한다.',
      constraints: '-10^9 ≤ a, b ≤ 10^9',
    },
    difficulty: 'EASY',
    category: 'BASIC',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      {
        input: '1 2',
        output: '3',
        isExample: true,
      },
      {
        input: '5 7',
        output: '12',
        isExample: true,
      },
      {
        input: '10 20',
        output: '30',
        isExample: false,
      },
    ],
    createdAt: '2024-03-15T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z',
    createdBy: {
      id: 1,
      name: '김선생',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
      role: 'teacher',
    },
    acceptanceRate: 85.5,
    tags: ['기초', '수학', '입출력'],
  },
  {
    id: 2,
    title: '배열의 최댓값',
    description: 'N개의 정수가 주어졌을 때, 이 중 최댓값을 찾는 프로그램을 작성하세요.',
    descriptionDetail: {
      description: 'N개의 정수가 주어졌을 때, 이 중 최댓값을 찾는 프로그램을 작성하세요.',
      inputFormat:
        '첫째 줄에 정수의 개수 N이 주어진다. (1 ≤ N ≤ 100,000)\n둘째 줄에 N개의 정수가 공백으로 구분되어 주어진다. (-10^9 ≤ 각 정수 ≤ 10^9)',
      outputFormat: '첫째 줄에 최댓값을 출력한다.',
      constraints: '1 ≤ N ≤ 100,000\n-10^9 ≤ 각 정수 ≤ 10^9',
    },
    difficulty: 'MEDIUM',
    category: 'ARRAY',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      {
        input: '5\n1 2 3 4 5',
        output: '5',
        isExample: true,
      },
      {
        input: '3\n10 5 8',
        output: '10',
        isExample: true,
      },
      {
        input: '4\n-1 -2 -3 -4',
        output: '-1',
        isExample: false,
      },
    ],
    createdAt: '2024-03-14T00:00:00Z',
    updatedAt: '2024-03-14T00:00:00Z',
    createdBy: {
      id: 1,
      name: '김선생',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
      role: 'teacher',
    },
    acceptanceRate: 75.2,
    tags: ['배열', '정렬', '탐색'],
  },
  {
    id: 3,
    title: '문자열 뒤집기',
    description: '주어진 문자열을 뒤집어서 출력하는 프로그램을 작성하세요.',
    descriptionDetail: {
      description: '주어진 문자열을 뒤집어서 출력하는 프로그램을 작성하세요.',
      inputFormat: '첫째 줄에 문자열 S가 주어진다. (1 ≤ S의 길이 ≤ 100)',
      outputFormat: '첫째 줄에 문자열 S를 뒤집은 결과를 출력한다.',
      constraints: '1 ≤ S의 길이 ≤ 100',
    },
    difficulty: 'EASY',
    category: 'STRING',
    timeLimit: 1000,
    memoryLimit: 128,
    testCases: [
      {
        input: 'hello',
        output: 'olleh',
        isExample: true,
      },
      {
        input: 'world',
        output: 'dlrow',
        isExample: true,
      },
      {
        input: 'algorithm',
        output: 'mhtirogla',
        isExample: false,
      },
    ],
    createdAt: '2024-03-13T00:00:00Z',
    updatedAt: '2024-03-13T00:00:00Z',
    createdBy: {
      id: 2,
      name: '이선생',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
      role: 'teacher',
    },
    acceptanceRate: 90.1,
    tags: ['문자열', '기초'],
  },
];
