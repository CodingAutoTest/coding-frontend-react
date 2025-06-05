import { api } from '@/lib/axios';

/* ── 타입 정의 ─────────────────────────────── */
export type Role = 'user' | 'student' | 'teacher' | 'admin';

export interface User {
  id: number;
  name: string;
  profileImage: string;
  role: Role;
  teacherStatus?: 'none' | 'pending' | 'approved' | 'rejected';
}

export interface SignupPayload {
  email: string;
  pw: string;
  name: string;
  profileImage: string;
}

export interface LoginPayload {
  email: string;
  pw: string;
}

export interface LoginResponse {
  userId: number;
  name: string;
  profileImage: string;
  role: Role;
  accessToken: string;
}

/* ── API 함수 ─────────────────────────────── */

export async function signup(payload: SignupPayload): Promise<void> {
  await api.post('/auth/signup', payload);
}

export async function login(payload: LoginPayload): Promise<{ token: string; user: User }> {
  const res = await api.post<LoginResponse>('/auth/login', payload);
  const { userId, name, profileImage, role, accessToken } = res.data;

  // User 객체로 변환
  const user: User = {
    id: userId,
    name,
    profileImage,
    role,
  };

  return { token: accessToken, user };
}
