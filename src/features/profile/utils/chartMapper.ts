// src/features/profile/utils/chart-mappers.ts
import { UserProfileResponse } from '@/features/profile/api/getProfile';

export type TierChartDataType = {
  name: string;
  count: number;
  color: string;
  percent: number;
};

export type TagChartDataType = {
  name: string;
  count: number;
  percent: number;
};

/** 0~30 → 6단계(5단위)로 묶고 색 입히기 */
export const mapTierData = (profile: UserProfileResponse): TierChartDataType[] => {
  const ranges = [
    { range: [1, 5], name: '브론즈', color: '#B98B5A' },
    { range: [6, 10], name: '실버', color: '#97A5AD' },
    { range: [11, 15], name: '골드', color: '#FFBF61' },
    { range: [16, 20], name: '플레티넘', color: '#6FECC0' },
    { range: [21, 25], name: '다이아', color: '#61ABF5' },
    { range: [26, 30], name: '마스터', color: '#FF724F' },
  ];

  const totalSolved = profile.solvedCount || 1; // 0 방지
  return ranges.map(({ range, name, color }) => {
    const count = Object.entries(profile.tierCount)
      .filter(([tier]) => Number(tier) >= range[0] && Number(tier) <= range[1])
      .reduce((sum, [, c]) => sum + c, 0);

    return {
      name,
      count,
      color,
      percent: Number(((count / totalSolved) * 100).toFixed(1)),
    };
  });
};

/** tagCount → 차트 데이터 */
export const mapTagData = (profile: UserProfileResponse): TagChartDataType[] => {
  const totalSolved = profile.solvedCount || 1;
  return Object.entries(profile.tagCount).map(([name, count]) => ({
    name,
    count,
    percent: Number(((count / totalSolved) * 100).toFixed(1)),
  }));
};
