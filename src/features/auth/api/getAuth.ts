import { api } from '@/lib/axios';
import axios from 'axios';

export type SignupPayload = {
  email: string;
  pw: string;
  name: string;
};

export type LoginPayload = {
  email: string;
  pw: string;
};

export async function signup(payload: SignupPayload): Promise<void> {
  await api.post('/auth/signup', payload);
}

export async function login(payload: LoginPayload): Promise<void> {
  try {
    const response = await api.post('/auth/login', payload);
    const token = response.headers['authorization'];

    if (!token) {
      throw new Error('인증 토큰이 없습니다');
    }

    localStorage.setItem('token', token);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error('이메일 또는 비밀번호가 올바르지 않습니다');
    }
    throw error;
  }
}
