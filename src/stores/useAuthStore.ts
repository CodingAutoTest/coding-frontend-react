import { create } from 'zustand';
import axios from 'axios';
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
    axios.defaults.headers.common.Authorization = token;

    set({ token, user });
  },

  /* 로그아웃 */
  logout: () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common.Authorization;
    set({ user: undefined, token: undefined });
  },

  /* 새로고침 시 세션 복구 */
  refresh: async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios.defaults.headers.common.Authorization = token;

    try {
      const me = await authApi.fetchMe();
      set({ token, user: me });
    } catch {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common.Authorization;
      set({ user: undefined, token: undefined });
    }
  },
}));
