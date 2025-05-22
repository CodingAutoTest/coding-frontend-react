// src/features/profile/utils/getTierInfo.ts
const TIERS = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master'] as const;

export type TierName = (typeof TIERS)[number];

export interface TierInfo {
  name: TierName;
  lower: number;
  upper: number;
  progress: number;
  need: number;
}

export const getTierInfo = (rating: number): TierInfo => {
  let lower = 1000; // Bronze 하한
  let tier = 0;

  // 다음 하한 = Math.round(하한 × 1.7)
  while (tier + 1 < TIERS.length && rating >= Math.round(lower * 1.7)) {
    lower = Math.round(lower * 1.7);
    tier += 1;
  }

  const upper = Math.round(lower * 1.7);
  const progress = Math.min(100, Math.max(0, ((rating - lower) / (upper - lower)) * 100));

  return {
    name: TIERS[tier],
    lower,
    upper,
    progress,
    need: Math.max(0, upper - rating),
  };
};
