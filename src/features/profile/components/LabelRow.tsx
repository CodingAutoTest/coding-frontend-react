import { FC } from 'react';

type LabelRowProps = {
  name: string;
  count: number;
  percent: number;
  color?: string;
};

const LabelRow: FC<LabelRowProps> = ({ name, count, percent, color }) => {
  return (
    <div className="flex w-[530px] flex-col items-start">
      <div className="flex w-full items-center justify-start">
        {color ? (
          <div data-svg-wrapper>
            <svg
              width="21"
              height="15"
              viewBox="0 0 21 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="0.5" y="0.5" width="14" height="14" rx="4" fill={color} />
            </svg>
          </div>
        ) : (
          <div style={{ width: 21, height: 15 }} />
        )}
        <div className="flex w-96 items-center justify-start gap-2.5">
          <div className="text-sm font-normal text-black">{name}</div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex w-3.5 flex-col items-center justify-center self-stretch gap-2.5">
            <div className="text-xs font-semibold text-black">{count}</div>
          </div>
        </div>
        <div className="inline-flex h-7 w-24 flex-col items-end justify-center">
          <div className="inline-flex w-full items-center justify-end">
            <div className="text-xl font-semibold text-black">{percent}%</div>
          </div>
        </div>
      </div>
      <div className="h-0 w-[530px] outline outline-1 outline-offset-[-0.5px] outline-black" />
    </div>
  );
};

export default LabelRow;
