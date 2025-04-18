import React, { useState } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import LabelList from '@/features/profile/components/LabelList';

const tagList = [
  { name: '구현', count: 80, percent: 20 },
  { name: '자료구조', count: 80, percent: 20 },
  { name: '수학', count: 80, percent: 20 },
  { name: '문자열', count: 80, percent: 20 },
  { name: '그래프', count: 80, percent: 20 },
  { name: '탐색', count: 80, percent: 20 },
  { name: '데이터 구조', count: 80, percent: 20 },
  { name: '기하학', count: 80, percent: 20 },
  { name: 'AI', count: 90, percent: 25 },
  { name: '네트워크', count: 75, percent: 15 },
  { name: '보안', count: 85, percent: 18 },
  { name: '알고리즘', count: 70, percent: 30 },
  { name: '알고리즘', count: 70, percent: 30 },
  { name: '알고리즘', count: 70, percent: 30 },
  { name: '알고리즘', count: 70, percent: 30 },
  { name: '알고리즘', count: 70, percent: 30 },
];

type CustomTickProps = {
  x: number;
  y: number;
  payload: {
    value: string;
  };
  textAnchor?: string;
};

const CustomTick = ({ x, y, payload, textAnchor }: CustomTickProps) => {
  const lines = payload.value.split(' ');

  return (
    <text x={x} y={y} textAnchor={textAnchor} fill="#666" fontSize={12}>
      {lines.map((line: string, index: number) => (
        <tspan x={x} dy={index === 0 ? 0 : 14} key={index}>
          {line}
        </tspan>
      ))}
    </text>
  );
};

const TagChart = () => {
  const [expanded, setExpanded] = useState(false);

  const chartData = tagList.slice(0, 8);
  const allData = tagList.slice(0, expanded ? tagList.length : 8);

  return (
    <div
      className={`w-[921px] px-5 py-2.5 bg-neutral-100 rounded-2xl inline-flex flex-col justify-start items-center gap-4 transition-all duration-300 ease-in-out ${
        expanded ? 'h-auto' : 'h-96'
      }`}
    >
      {' '}
      <div className="self-stretch flex flex-col justify-start items-start gap-10">
        <div className="justify-start text-black text-[10px] font-semibold font-['Poppins']">
          태그 분포
        </div>
        <div className="w-[880px] h-64 inline-flex justify-center items-center">
          <div className="w-96 h-96">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" tick={(props) => <CustomTick {...props} />} />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={{ fontSize: 10, fill: '#999' }}
                />
                <Radar
                  name="태그"
                  dataKey="count"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col justify-center items-center gap-4">
            <LabelList
              data={allData}
              labelTitle="태그"
              showColor={false} // 색상 칸은 필요 없으니 false
            />
            <div
              className="relative cursor-pointer flex justify-center items-center"
              onClick={() => setExpanded(!expanded)}
            >
              <div className="w-24 h-7 bg-zinc-300 rounded-[5px]" />
              <div className="absolute text-center text-neutral-800 text-sm font-semibold font-['Poppins']">
                {expanded ? '접기' : `더보기(+${tagList.length - 8})`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagChart;
