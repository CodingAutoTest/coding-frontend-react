// src/features/profile/components/StreakChart.tsx
import { FC, useMemo } from 'react';
import { ResponsiveCalendar } from '@nivo/calendar';
import ProfileChartSection from '@/features/profile/components/ProfileChartSection';

export type DailySolveDataType = Record<string, number>;

type Props = { dailySolveData: DailySolveDataType };

/* 공통 색상 단계 (연한→진한) */
const colors = ['#f0fdf4', '#bbf7d0', '#86efac', '#4ade80', '#15803d'];

const StreakChart: FC<Props> = ({ dailySolveData }) => {
  /* ── 1. Nivo용 데이터 변환 ── */
  const data = useMemo(
    () => Object.entries(dailySolveData).map(([day, value]) => ({ day, value })),
    [dailySolveData],
  );

  /* ── 2. 기본 연도, 해결 날짜 수, 스트릭 계산 ── */
  const year = data.length > 0 ? new Date(data[0].day).getFullYear() : new Date().getFullYear();

  const solvedDays = data.filter((d) => d.value > 0).length;

  /* 최장 스트릭 계산 */
  const longestStreak = useMemo(() => {
    const days = Object.keys(dailySolveData).sort();
    let max = 0,
      cur = 0,
      prevDate: Date | null = null;
    for (const d of days) {
      if (dailySolveData[d] > 0) {
        const current = new Date(d);
        if (prevDate && current.getTime() - prevDate.getTime() === 24 * 60 * 60 * 1000) {
          cur += 1;
        } else {
          cur = 1;
        }
        max = Math.max(max, cur);
        prevDate = current;
      } else {
        cur = 0;
        prevDate = null;
      }
    }
    return max;
  }, [dailySolveData]);

  /* ── 3. Nivo 차트 ── */
  const calendar = (
    <div className="w-full h-60 -mt-[50px] overflow-x-auto overflow-y-hidden scrollbar-thin">
      <div style={{ width: 1100 }} className="relative h-80">
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
          emptyColor="#f3f4f6"
          margin={{ top: 10, right: 0, bottom: 0, left: 28 }}
          yearLegendPosition="after"
          yearSpacing={40}
          daySpacing={2}
          dayBorderWidth={1}
          dayBorderColor="#fff"
          monthBorderColor="#D9D9D9"
          tooltip={({ day, value }) => (
            <div className="px-2 py-1 text-sm bg-white rounded shadow">
              {day}: {value ?? 0}회 풀이
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

  /* ── 4‑A. 오른쪽 색상 범례(차트 바로 밑) ── */
  const legend = (
    <div className="mt-5 mb-10 flex justify-end items-center gap-1 text-sm text-gray-400 w-full">
      <span>Less</span>
      {colors.map((c) => (
        <span key={c} style={{ backgroundColor: c }} className="h-4 w-4 rounded" />
      ))}
      <span>More</span>
    </div>
  );

  /* ── 4‑B. 왼쪽 설명 (기존 위치 유지) ── */
  const explanation = (
    <div className="mt-2 text-xs text-gray-600 w-full">
      최장 {longestStreak}일 연속 문제 해결<p></p>날짜는 매일 오전 6:00
      <span className="align-super text-[8px]">UTC+9</span>에 변경됩니다. 강제 갱신의 경우 반영되지
      않습니다.
    </div>
  );

  return (
    <ProfileChartSection
      title="스트릭"
      subtitle={`현재 ${solvedDays}일 풀이`}
      chart={
        <div className="flex flex-col w-full">
          {calendar} {/* 캘린더 */}
          {legend} {/* ✅ 차트 바로 밑 */}
          {explanation} {/* 기존 설명, 위치 그대로 */}
        </div>
      }
    />
  );
};

export default StreakChart;
