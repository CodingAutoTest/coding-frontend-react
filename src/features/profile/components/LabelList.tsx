import React from 'react';
import LabelRow from './LabelRow';

type LabelItem = {
  name: string;
  count: number;
  percent: number;
  color?: string;
};

interface LabelListProps {
  data: LabelItem[];
  labelTitle: string;
  showColor?: boolean;
}

const LabelList = ({ data, labelTitle, showColor = true }: LabelListProps) => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="self-stretch flex flex-col justify-center items-center">
        <div className="inline-flex justify-center items-center gap-10">
          <div className="w-[223px] flex justify-center items-center">
            <div className="justify-start text-neutral-800 text-[10px] font-semibold font-['Poppins']">
              {labelTitle}
            </div>
          </div>
          <div className="justify-start text-neutral-800 text-[10px] font-semibold font-['Poppins']">
            문제
          </div>
        </div>

        {data.map((item, index) => (
          <LabelRow
            key={index}
            name={item.name}
            count={item.count}
            percent={item.percent}
            color={showColor ? item.color : undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default LabelList;
