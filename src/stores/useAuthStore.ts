import { create } from 'zustand';

type AuthState = {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isLogin: true,
  setIsLogin: (isLogin) => set({ isLogin }),
}));
