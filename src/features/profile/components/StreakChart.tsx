// src/features/profile/components/StreakChart.tsx
import { FC, useMemo } from 'react';
import { ResponsiveCalendar } from '@nivo/calendar';
import ProfileChartSection from '@/features/profile/components/ProfileChartSection';

export type DailySolveDataType = Record<string, number>;
type Props = { dailySolveData: DailySolveDataType };

/* 0(미해결) → emptyColor / 3 단계씩 버킷 */
const emptyColor = '#f3f4f6';
const colors = ['#f0fdf4', '#bbf7d0', '#86efac', '#4ade80', '#15803d'];

const BUCKET = 3; // 몇 개씩 묶을지
const MAX_SCALE = BUCKET * colors.length; // 15

const StreakChart: FC<Props> = ({ dailySolveData }) => {
  /* ── 1. Nivo용 데이터 변환 ── */
  const data = useMemo(
    () =>
      Object.entries(dailySolveData).map(([day, raw]) => ({
        day,
        value: raw === 0 ? 0 : Math.min(Math.ceil(raw / BUCKET) * BUCKET, MAX_SCALE), // 1→3, 4→6, … 13+→15
      })),
    [dailySolveData],
  );

  /* ── 2. 연도·스트릭 계산(변경 없음) ── */
  const year = data.length ? new Date(data[0].day).getFullYear() : new Date().getFullYear();
  const solvedDays = data.filter((d) => d.value > 0).length;

  const longestStreak = useMemo(() => {
    const days = Object.keys(dailySolveData).sort();
    let max = 0,
      cur = 0,
      prev: Date | null = null;
    for (const d of days) {
      if (dailySolveData[d] > 0) {
        const now = new Date(d);
        if (prev && now.getTime() - prev.getTime() === 86_400_000) cur += 1;
        else cur = 1;
        max = Math.max(max, cur);
        prev = now;
      } else {
        cur = 0;
        prev = null;
      }
    }
    return max;
  }, [dailySolveData]);

  /* ── 3. 캘린더 ── */
  const calendar = (
    <div className="w-full h-60 -mt-[50px] overflow-x-auto overflow-y-hidden scrollbar-thin">
      <div style={{ width: 1100 }} className="relative h-80">
        {/* 요일 라벨 */}
        <div className="absolute left-0 top-20 translate-y-[13px] flex flex-col justify-between h-[145px] text-[11px] text-gray-500">
          {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>

        <ResponsiveCalendar
          data={data}
          from={`${year}-01-01`}
          to={`${year}-12-31`}
          colors={colors}
          emptyColor={emptyColor}
          /* ▽ 추가된 부분 */
          minValue={BUCKET} // 3
          maxValue={MAX_SCALE} // 15
          /* △ */

          margin={{ top: 10, right: 0, bottom: 0, left: 28 }}
          yearLegendPosition="after"
          yearSpacing={40}
          daySpacing={2}
          dayBorderWidth={1}
          dayBorderColor="#fff"
          monthBorderColor="#D9D9D9"
          tooltip={({ day }) => (
            <div className="px-2 py-1 text-sm bg-white rounded shadow">
              {day}: {dailySolveData[day] ?? 0}회 풀이
            </div>
          )}
          theme={{
            tooltip: { container: { fontSize: 12 } },
            labels: { text: { fontSize: 10, fill: '#6b7280' } },
          }}
        />
      </div>
    </div>
  );

  /* ── 4. 범례 & 설명(그대로) ── */
  const legend = (
    <div className="mt-5 mb-10 flex justify-end items-center gap-1 text-sm text-gray-400 w-full">
      <span>Less</span>
      {colors.map((c) => (
        <span key={c} style={{ backgroundColor: c }} className="h-4 w-4 rounded" />
      ))}
      <span>More</span>
    </div>
  );

  const explanation = (
    <div className="mt-2 text-xs text-gray-600 w-full">
      최장 {longestStreak}일 연속 문제 해결
      {/* <p />
      날짜는 매일 오전 6:00
      <span className="align-super text-[8px]">UTC+9</span>에 변경됩니다. */}
    </div>
  );

  return (
    <ProfileChartSection
      title="스트릭"
      subtitle={`현재 ${solvedDays}일 풀이`}
      chart={
        <div className="flex flex-col w-full">
          {calendar}
          {legend}
          {explanation}
        </div>
      }
    />
  );
};

export default StreakChart;
