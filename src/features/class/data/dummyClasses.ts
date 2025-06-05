import { ClassSummary, ClassDetail, Student, Assignment } from '../types/class.type';

export const dummyClasses: ClassSummary[] = [
  {
    id: 1,
    name: '알고리즘 기초',
    description: '알고리즘의 기초 개념과 문제 해결 방법을 배우는 클래스입니다.',
    studentCount: 30,
    assignmentCount: 5,
    createdAt: '2024-03-01T00:00:00Z',
    createdBy: {
      id: 1,
      name: '김선생',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
      role: 'teacher',
    },
  },
  {
    id: 2,
    name: '자료구조 심화',
    description: '다양한 자료구조와 그 활용 방법을 심도 있게 학습하는 클래스입니다.',
    studentCount: 25,
    assignmentCount: 4,
    createdAt: '2024-03-05T00:00:00Z',
    createdBy: {
      id: 2,
      name: '이선생',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
      role: 'teacher',
    },
  },
];

export const dummyClassDetails: Record<number, ClassDetail> = {
  1: {
    id: 1,
    name: '알고리즘 기초',
    description: '알고리즘의 기초 개념과 문제 해결 방법을 배우는 클래스입니다.',
    assignmentCount: 5,
    createdAt: '2024-03-01T00:00:00Z',
    createdBy: {
      id: 1,
      name: '김선생',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
      role: 'teacher',
    },
    students: [
      {
        id: 3,
        name: '학생1',
        email: 'student1@example.com',
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
        role: 'student',
        joinedAt: '2024-03-01T00:00:00Z',
        lastActiveAt: '2024-03-15T10:00:00Z',
        solvedCount: 50,
        totalScore: 2000,
      },
      {
        id: 4,
        name: '학생2',
        email: 'student2@example.com',
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
        role: 'student',
        joinedAt: '2024-03-02T00:00:00Z',
        lastActiveAt: '2024-03-15T09:30:00Z',
        solvedCount: 40,
        totalScore: 1800,
      },
    ],
    assignments: [
      {
        id: 1,
        title: '기초 알고리즘 문제 풀이',
        description: '정렬, 탐색 등 기초 알고리즘 문제를 풀어봅시다.',
        startDate: '2024-03-10T00:00:00Z',
        endDate: '2024-03-17T23:59:59Z',
        problems: [
          {
            id: 1,
            title: '두 수의 합',
            difficulty: 'EASY',
            category: 'BASIC',
          },
          {
            id: 2,
            title: '배열의 최댓값',
            difficulty: 'MEDIUM',
            category: 'ARRAY',
          },
        ],
        status: 'ONGOING',
        createdAt: '2024-03-09T00:00:00Z',
        createdBy: {
          id: 1,
          name: '김선생',
          profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
          role: 'teacher',
        },
      },
    ],
    inviteCode: 'ALGO2024',
    isActive: true,
  },
  2: {
    id: 2,
    name: '자료구조 심화',
    description: '다양한 자료구조와 그 활용 방법을 심도 있게 학습하는 클래스입니다.',
    assignmentCount: 4,
    createdAt: '2024-03-05T00:00:00Z',
    createdBy: {
      id: 2,
      name: '이선생',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
      role: 'teacher',
    },
    students: [
      {
        id: 5,
        name: '학생3',
        email: 'student3@example.com',
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5',
        role: 'student',
        joinedAt: '2024-03-05T00:00:00Z',
        lastActiveAt: '2024-03-15T11:00:00Z',
        solvedCount: 35,
        totalScore: 1500,
      },
    ],
    assignments: [
      {
        id: 2,
        title: '트리와 그래프',
        description: '트리와 그래프 자료구조를 활용한 문제를 풀어봅시다.',
        startDate: '2024-03-12T00:00:00Z',
        endDate: '2024-03-19T23:59:59Z',
        problems: [
          {
            id: 3,
            title: '문자열 뒤집기',
            difficulty: 'EASY',
            category: 'STRING',
          },
        ],
        status: 'UPCOMING',
        createdAt: '2024-03-11T00:00:00Z',
        createdBy: {
          id: 2,
          name: '이선생',
          profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
          role: 'teacher',
        },
      },
    ],
    inviteCode: 'DS2024',
    isActive: true,
  },
};
