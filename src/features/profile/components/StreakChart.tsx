// components/StreakChart.tsx
import { FC } from 'react';

export type DailySolveDataType = {
  [date: string]: number;
};

type Props = {
  dailySolveData: DailySolveDataType;
};

const StreakChart: FC<Props> = ({ dailySolveData }) => {
  const startDate = new Date('2024-01-01');
  const endDate = new Date('2024-12-31');

  const getColorForSolveCount = (count: number) => {
    if (count >= 6) return 'bg-green-300'; // 최고 수준
    if (count >= 4) return 'bg-green-100';
    if (count >= 2) return 'bg-green-500';
    return 'bg-gray-300'; // 풀이 없음
  };

  const dates: string[] = [];
  for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
    const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
    dates.push(formattedDate);
  }

  return (
    <div className="grid grid-rows-7 grid-flow-col gap-1">
      {dates.map((date) => {
        const solveCount = dailySolveData[date] || 0;
        const cellColor = getColorForSolveCount(solveCount);

        return (
          <div
            key={date}
            className={`h-6 w-6 ${cellColor} rounded-sm`}
            title={`날짜: ${date} — 풀이: ${solveCount}`}
          />
        );
      })}
    </div>
  );
};

export default StreakChart;
