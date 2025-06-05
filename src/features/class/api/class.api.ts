import { api } from '@/lib/axios';
import { ClassSummary, AssignmentRow } from '../types/class.type';

export const createOrUpdateClass = async (data: {
  id?: string;
  name: string;
  description: string;
}) => {
  const response = await api.post<ClassSummary>('/api/classes', data);
  return response.data;
};

export const getClassDetail = async (classId: string) => {
  const response = await api.get<ClassSummary>(`/api/classes/${classId}`);
  return response.data;
};

export const inviteStudent = async (classId: string, email: string) => {
  const response = await api.post(`/api/classes/${classId}/students`, { email });
  return response.data;
};

export const removeStudent = async (classId: string, studentId: string) => {
  await api.delete(`/api/classes/${classId}/students/${studentId}`);
};

export const getAssignments = async (classId: string) => {
  const response = await api.get<AssignmentRow[]>(`/api/classes/${classId}/assignments`);
  return response.data;
};
