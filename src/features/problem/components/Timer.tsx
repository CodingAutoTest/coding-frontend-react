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
      {/* 시간 표시 - 고정된 너비 설정 */}
      <div className="w-[180px] text-center">
        <span className="text-DEFAULT text-[36px] font-semibold font-inter tabular-nums">
          {formattedTime}
        </span>
      </div>

      {/* 버튼 영역 */}
      <div className="flex gap-2 ml-6">
        {!isRunning ? (
          <button
            onClick={onStart}
            className="text-sm bg-PRIMARY text-WHITE font-inter font-[16px] px-3 py-1 rounded-[10px] w-[80px] h-[38px] active:opacity-50 cursor-pointer"
          >
            시작
          </button>
        ) : (
          <button
            onClick={onStop}
            className="text-sm bg-PRIMARY text-WHITE font-inter font-[16px] px-3 py-1 rounded-[10px] w-[80px] h-[38px] active:opacity-50 cursor-pointer"
          >
            정지
          </button>
        )}
        <button
          onClick={onReset}
          className="text-sm bg-WHITE text-DEFAULT font-inter font-[16px] px-3 py-1 rounded-[10px] w-[80px] h-[38px] active:opacity-50 cursor-pointer"
        >
          초기화
        </button>
      </div>
    </div>
  );
};
