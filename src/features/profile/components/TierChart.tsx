// src/features/profile/components/TierChart.tsx
import { FC } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, TooltipProps } from 'recharts';
import LabelList from './LabelList';
import ProfileChartSection from './ProfileChartSection';
import { TierChartDataType } from '@/features/profile/utils/chartMapper';

type Props = {
  data: TierChartDataType[];
  totalSolved: number;
};

const CustomTooltip: FC<TooltipProps<number, string>> = ({ active, payload }) => {
  if (active && payload?.length) {
    const { name, percent } = payload[0].payload as { name: string; percent: number };
    return (
      <div className="bg-white border px-2 py-1 text-sm rounded shadow">
        {name}: {percent}%
      </div>
    );
  }
  return null;
};

const TierChart: FC<Props> = ({ data, totalSolved }) => {
  const chartContent = (
    <>
      {/* ───── Pie 차트 ───── */}
      <div className="w-96 h-96">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={120}
              /* value === 0 이면 라벨 숨김 */
              label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                if (!value) return null; // ✅ 0 → 라벨 출력 X

                const RADIAN = Math.PI / 180;
                const radius =
                  Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) / 2;
                const x = Number(cx) + radius * Math.cos(-midAngle * RADIAN);
                const y = Number(cy) + radius * Math.sin(-midAngle * RADIAN);
                return (
                  <text
                    x={x}
                    y={y}
                    fill="white"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={12}
                    fontWeight="bold"
                  >
                    {data[index].name}
                  </text>
                );
              }}
              labelLine={false}
            >
              {data.map(({ color }, idx) => (
                <Cell key={idx} fill={color} stroke="#fff" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ───── 우측 난이도 리스트 (0 포함) ───── */}
      <div className="translate-x-5">
        <LabelList data={data} labelTitle="난이도" showColor />
      </div>
    </>
  );

  return (
    <ProfileChartSection
      title="난이도 분포"
      subtitle={`${totalSolved}문제 해결`}
      chart={chartContent}
    />
  );
};

export default TierChart;
