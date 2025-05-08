import { FC } from 'react';
import LabelRow from './LabelRow';

type LabelItemType = {
  name: string;
  count: number;
  percent: number;
  color?: string;
};

type LabelListProps = {
  data: LabelItemType[];
  labelTitle: string;
  showColor?: boolean;
};

const LabelList: FC<LabelListProps> = ({ data, labelTitle, showColor = true }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="inline-flex items-center justify-center gap-10">
          <div className="flex w-[223px] items-center justify-center">
            <div className="text-[10px] font-semibold text-neutral-800">{labelTitle}</div>
          </div>
          <div className="text-[10px] font-semibold text-neutral-800 ml-[30px]">문제</div>
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
