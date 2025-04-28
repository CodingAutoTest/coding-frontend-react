import { FC } from 'react';

type TimerProps = {
  formattedTime: string;
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
};

export const Timer: FC<TimerProps> = ({ formattedTime, isRunning, onStart, onStop, onReset }) => {
  return (
    <div className="flex items-center px-4 py-2 w-full justify-center">
      {/* 시간 표시 */}
      <span className="text-[#232323] text-[36px] font-semibold font-mono">{formattedTime}</span>

      {/* 버튼 영역 */}
      <div className="flex gap-2 ml-6">
        {!isRunning ? (
          <button
            onClick={onStart}
            className="text-sm bg-PRIMARY text-[#FFFFFF] font-[16px] px-3 py-1 rounded-[10px] w-[80px] h-[38px] active:opacity-50"
          >
            시작
          </button>
        ) : (
          <button
            onClick={onStop}
            className="text-sm bg-PRIMARY text-[#FFFFFF] font-[16px] px-3 py-1 rounded-[10px] w-[80px] h-[38px] active:opacity-50"
          >
            정지
          </button>
        )}
        <button
          onClick={onReset}
          className="text-sm bg-[#FFFFFF] text-DEFAULT font-[16px] px-3 py-1 rounded-[10px] w-[80px] h-[38px] active:opacity-50"
        >
          초기화
        </button>
      </div>
    </div>
  );
};
