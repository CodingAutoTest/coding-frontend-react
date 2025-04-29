// features/profile/components/TierChart.tsx
import { FC } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  PieLabelRenderProps,
  TooltipProps,
} from 'recharts';
import LabelList from '@/features/profile/components/LabelList';
import ProfileChartSection from '@/features/profile/components/ProfileChartSection';

const tierData = [
  { name: '브론즈', count: 10, color: '#B98B5A', percent: 10 },
  { name: '실버', count: 20, color: '#97A5AD', percent: 20 },
  { name: '골드', count: 15, color: '#FFBF61', percent: 15 },
  { name: '플레티넘', count: 25, color: '#6FECC0', percent: 25 },
  { name: '다이아', count: 20, color: '#61ABF5', percent: 20 },
  { name: '마스터', count: 10, color: '#FF724F', percent: 10 },
];

const CustomTooltip: FC<TooltipProps<number, string>> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0].payload;
    const total = tierData.reduce((sum, entry) => sum + entry.count, 0);
    const percent = ((value / total) * 100).toFixed(1);
    return (
      <div className="bg-white border px-2 py-1 text-sm rounded shadow">
        <p>
          {name}: {percent}%
        </p>
      </div>
    );
  }
  return null;
};

const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  index,
}: PieLabelRenderProps & { index: number }) => {
  const RADIAN = Math.PI / 180;
  const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) / 2;
  const x = Number(cx) + radius * Math.cos(-Number(midAngle) * RADIAN);
  const y = Number(cy) + radius * Math.sin(-Number(midAngle) * RADIAN);

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
      {tierData[index].name}
    </text>
  );
};

const TierChart: FC = () => {
  const chartContent = (
    <>
      <div className="w-96 h-96">
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
      <div className="transform translate-x-5">
        <LabelList data={tierData} labelTitle="난이도" showColor />
      </div>
    </>
  );

  return <ProfileChartSection title="난이도 분포" subtitle="80문제 해결" chart={chartContent} />;
};

export default TierChart;
