// components/TierRow.tsx
import { FC } from 'react';

type TierRowProps = {
  name: string;
  color?: string;
  count: number;
  percent: number;
};

const TierRow: FC<TierRowProps> = ({ name, color = '#000', count, percent }) => {
  return (
    <div className="w-[560px] flex flex-col items-start">
      <div className="w-full flex items-center gap-4">
        <svg
          width="21"
          height="15"
          viewBox="0 0 21 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.5" y="0.5" width="14" height="14" rx="4" fill={color} />
        </svg>

        <div className="w-96 flex items-center gap-2.5">
          <span className="text-black text-sm font-normal">{name}</span>
        </div>

        <div className="flex items-center justify-center w-3.5">
          <span className="text-black text-xs font-semibold">{count}</span>
        </div>

        <div className="w-24 flex justify-end items-center">
          <span className="text-black text-xl font-semibold">{percent}%</span>
        </div>
      </div>

      <div className="w-[530px] h-px bg-black mt-2" />
    </div>
  );
};

export default TierRow;
