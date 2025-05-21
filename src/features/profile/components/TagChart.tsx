// src/features/profile/components/TagChart.tsx
import { FC, useState } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from 'recharts';
import LabelList from '@/features/profile/components/LabelList';
import { TagChartDataType } from '@/features/profile/utils/chartMapper';

type Props = {
  data: TagChartDataType[]; // { name, count }  배열이면 충분
};

type CustomTickProps = {
  x: number;
  y: number;
  payload: { value: string };
  textAnchor?: string;
};

const CustomTick: FC<CustomTickProps> = ({ x, y, payload, textAnchor }) => {
  const lines = payload.value.split(' ');
  return (
    <text x={x} y={y} textAnchor={textAnchor} fill="#666" fontSize={12}>
      {lines.map((line, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : 14}>
          {line}
        </tspan>
      ))}
    </text>
  );
};

/* 툴팁: 태그명 + 퍼센트 */
const CustomTooltip: FC<TooltipProps<number, string>> = ({ active, payload }) => {
  if (active && payload?.length) {
    const { name, percent } = payload[0].payload as { name: string; percent: number };
    return (
      <div className="bg-white border px-2 py-1 text-sm rounded shadow">
        {name}: {percent.toFixed(1)}%
      </div>
    );
  }
  return null;
};

const TagChart: FC<Props> = ({ data }) => {
  const [expanded, setExpanded] = useState(false);

  /* 1️⃣ 전체 태그 문제 수 */
  const totalTagCount = data.reduce((sum, d) => sum + d.count, 0) || 1;

  /* 2️⃣ percent 계산 후 정렬 */
  const withPercent = data.map((d) => ({
    ...d,
    percent: (d.count / totalTagCount) * 100,
  }));
  const sorted = [...withPercent].sort((a, b) => b.count - a.count);

  const chartData = sorted.slice(0, 8); // 레이다 차트용 상위 8개
  const listData = sorted
    .slice(0, expanded ? sorted.length : 8)
    .map((d) => ({ ...d, percent: Math.round(d.percent) }));

  return (
    <div
      className={`w-[921px] px-5 py-2.5 bg-neutral-100 rounded-2xl flex flex-col items-center gap-4 transition-all ${
        expanded ? 'h-auto' : 'h-96'
      }`}
    >
      <div className="self-stretch flex flex-col gap-10">
        <div className="text-black text-[10px] font-semibold">태그 분포</div>

        <div className="w-[880px] h-64 flex justify-center items-center">
          {/* ─── Radar 차트 ─── */}
          <div className="w-96 h-96">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" tick={(props) => <CustomTick {...props} />} />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, Math.max(...chartData.map((d) => d.count), 10)]}
                  tick={{ fontSize: 10, fill: '#999' }}
                />
                <Radar
                  name="태그"
                  dataKey="count"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* ─── 태그 리스트 + 더보기 ─── */}
          <div className="flex flex-col items-center gap-4">
            <LabelList data={listData} labelTitle="태그" showColor={false} />

            {sorted.length > 8 && (
              <div className="relative cursor-pointer" onClick={() => setExpanded(!expanded)}>
                <div className="w-24 h-7 bg-zinc-300 rounded-[5px]" />
                <div className="absolute inset-0 flex items-center justify-center text-neutral-800 text-sm font-semibold">
                  {expanded ? '접기' : `더보기(+${sorted.length - 8})`}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagChart;
