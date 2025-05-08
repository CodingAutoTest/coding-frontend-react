import { useEffect } from 'react';
import { useTimerStore } from '../stores/useTimerStore';

type UseTimerReturnType = {
  time: number;
  isRunning: boolean;
  formattedTime: string;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
};

export const useTimer = (): UseTimerReturnType => {
  const { time, isRunning, startTimer, stopTimer, resetTimer, setTime } = useTimerStore();

  useEffect(() => {
    let intervalId: number | null = null;

    if (isRunning) {
      intervalId = window.setInterval(() => {
        setTime(time + 10);
      }, 10);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, time, setTime]);

  const formatTime = (ms: number): string => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return {
    time,
    isRunning,
    formattedTime: formatTime(time),
    startTimer,
    stopTimer,
    resetTimer,
  };
};
