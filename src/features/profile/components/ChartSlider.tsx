// components/ChartSlide.tsx
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  PieLabelRenderProps,
  TooltipProps,
} from 'recharts';
import React from 'react';

interface TierDataType {
  name: string;
  color: string;
  count: number;
}

interface ChartSlideProps {
  tierData: TierDataType[];
  CustomTooltip: React.FC<TooltipProps<number, string>>; // TooltipProps 타입 지정
  renderCustomLabel: (props: PieLabelRenderProps & { index: number }) => React.ReactNode; // 정확한 타입 지정
  TierRow: React.FC<{
    name: string;
    color: string;
    count: number;
    percent: number;
  }>;
}

const ChartSlide = ({ tierData, CustomTooltip, renderCustomLabel, TierRow }: ChartSlideProps) => {
  return (
    <div className="w-[921px] h-96 px-5 py-2.5 bg-neutral-100 rounded-2xl inline-flex flex-col justify-start items-center gap-4">
      <div className="self-stretch flex flex-col justify-start items-start mt-2 mb-2">
        <div className="self-stretch justify-start text-black text-[10px] font-semibold font-['Poppins']">
          난이도 분포
        </div>
        <div className="self-stretch justify-start text-black text-lg font-semibold font-['Poppins']">
          80문제 해결
        </div>
      </div>
      <div className="h-64 inline-flex justify-start items-center gap-8">
        <div className="w-96 h-96 p-2 transform -translate-x-10">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={tierData}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={120}
                label={renderCustomLabel}
                labelLine={false}
              >
                {tierData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-[560px] h-52 inline-flex flex-col justify-center items-center gap-[3px] transform -translate-x-[60px]">
          <div className="inline-flex justify-center items-center gap-[73px]">
            <div className="w-48 flex justify-center items-center gap-2.5">
              <div className="justify-start text-black text-[10px] font-semibold font-['Poppins']">
                난이도
              </div>
            </div>
            <div className="justify-start text-black text-[10px] font-semibold font-['Poppins']">
              문제
            </div>
          </div>
          ``
          {tierData.map((tier, index) => (
            <TierRow
              key={index}
              name={tier.name}
              color={tier.color}
              count={tier.count}
              percent={tier.count}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChartSlide;
