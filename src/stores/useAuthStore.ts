import { create } from 'zustand';

type AuthState = {
  isLogin: boolean;
  checkToken: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isLogin: !!localStorage.getItem('token'),
  checkToken: () => {
    const token = localStorage.getItem('token');
    set({ isLogin: !!token });
  },
}));
