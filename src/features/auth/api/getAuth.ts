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

/* ── API 함수 ─────────────────────────────── */

export async function signup(payload: SignupPayload): Promise<void> {
  await api.post('/auth/signup', payload);
}

export async function login(payload: LoginPayload): Promise<{ token: string; user: User }> {
  const res = await api.post<User>('/auth/login', payload);

  // 1) 토큰 추출 (Authorization: Bearer xxx)
  const raw = res.headers['authorization'];
  if (!raw) throw new Error('인증 토큰이 없습니다');
  const token = raw.startsWith('Bearer ') ? raw : `Bearer ${raw}`;

  // 2) body → User DTO
  const user = res.data;
  return { token, user };
}

/* 토큰 복원용 */
export async function fetchMe(): Promise<User> {
  const { data } = await api.get<User>('/auth/me');
  return data;
}
