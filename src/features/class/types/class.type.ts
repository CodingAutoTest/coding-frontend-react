export interface User {
  id: number;
  name: string;
  profileImage: string;
  role: 'teacher' | 'student';
}

export interface Student {
  id: number;
  name: string;
  email: string;
  profileImage: string;
  role: 'student';
  joinedAt: string;
  lastActiveAt: string;
  solvedCount: number;
  totalScore: number;
}

export interface Assignment {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  problems: {
    id: number;
    title: string;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
    category: string;
  }[];
  status: 'UPCOMING' | 'ONGOING' | 'ENDED';
  createdAt: string;
  createdBy: User;
}

export interface ClassSummary {
  id: number;
  name: string;
  description: string;
  studentCount: number;
  assignmentCount: number;
  createdAt: string;
  createdBy: User;
}

export interface ClassDetail extends Omit<ClassSummary, 'studentCount'> {
  students: Student[];
  assignments: Assignment[];
  inviteCode: string;
  isActive: boolean;
}

export interface CreateClassRequest {
  name: string;
  description: string;
}

export interface UpdateClassRequest {
  name?: string;
  description?: string;
  isActive?: boolean;
}

export interface CreateAssignmentRequest {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  problemIds: number[];
}

export interface UpdateAssignmentRequest {
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  problemIds?: number[];
}
