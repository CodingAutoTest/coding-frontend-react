import { create } from 'zustand';
import * as authApi from '@/features/auth/api/getAuth';

interface AuthState {
  user?: authApi.User;
  token?: string;

  signup: (p: authApi.SignupPayload) => Promise<void>;
  login: (p: authApi.LoginPayload) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<void>; // 앱 부트 시 호출
}

export const useAuthStore = create<AuthState>((set) => ({
  /* 회원가입 */
  signup: async (payload) => {
    await authApi.signup(payload);
  },

  /* 로그인 */
  login: async (payload) => {
    const { token, user } = await authApi.login(payload);

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ token, user });
  },

  /* 로그아웃 */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: undefined, token: undefined });
  },

  /* 새로고침 시 세션 복구 */
  refresh: async () => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (!token || !savedUser) return;

    try {
      const user = JSON.parse(savedUser);
      set({ token, user });
    } catch (error) {
      console.error('Refresh - Error:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      set({ user: undefined, token: undefined });
    }
  },
}));
