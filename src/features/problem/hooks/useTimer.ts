import { useEffect, useRef } from 'react';
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
  const startTimeRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    let animationFrameId: number;

    const updateTimer = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
        lastTimeRef.current = currentTime;
      }

      const delta = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      if (isRunning) {
        setTime(time + delta);
        animationFrameId = requestAnimationFrame(updateTimer);
      }
    };

    if (isRunning) {
      animationFrameId = requestAnimationFrame(updateTimer);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
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
