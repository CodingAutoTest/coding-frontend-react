import { create } from 'zustand';

interface TimerState {
  time: number;
  isRunning: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  setTime: (time: number) => void;
}

export const useTimerStore = create<TimerState>((set) => ({
  time: 0,
  isRunning: false,
  startTimer: () => set({ isRunning: true }),
  stopTimer: () => set({ isRunning: false }),
  resetTimer: () => set({ time: 0, isRunning: false }),
  setTime: (time) => set({ time }),
}));
