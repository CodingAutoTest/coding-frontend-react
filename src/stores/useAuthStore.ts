import { create } from 'zustand';

type AuthState = {
  isLogin: boolean;
  checkToken: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isLogin: false,
  checkToken: () => {
    const token = localStorage.getItem('token');
    set({ isLogin: !!token });
  },
}));
