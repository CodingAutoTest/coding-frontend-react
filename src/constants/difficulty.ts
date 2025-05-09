import { IMAGES } from './images';

export type DifficultyTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'master';

export const DIFFICULTY_TIERS: Record<DifficultyTier, { min: number; max: number; icon: string }> =
  {
    bronze: { min: 1, max: 5, icon: 'icons/bronze.svg' },
    silver: { min: 6, max: 10, icon: 'icons/silver.svg' },
    gold: { min: 11, max: 15, icon: 'icons/gold.svg' },
    platinum: { min: 16, max: 20, icon: 'icons/platinum.svg' },
    diamond: { min: 21, max: 25, icon: 'icons/diamond.svg' },
    master: { min: 26, max: 30, icon: 'icons/master.svg' },
  };

export const getDifficultyIcon = (difficulty: number): string => {
  if (difficulty <= 5) return IMAGES.TIER_ICONS.BRONZE;
  if (difficulty <= 10) return IMAGES.TIER_ICONS.SILVER;
  if (difficulty <= 15) return IMAGES.TIER_ICONS.GOLD;
  if (difficulty <= 20) return IMAGES.TIER_ICONS.PLATINUM;
  if (difficulty <= 25) return IMAGES.TIER_ICONS.DIAMOND;
  return IMAGES.TIER_ICONS.MASTER;
};

export const getDifficultyText = (difficulty: number): string => {
  if (difficulty <= 5) return '브론즈';
  if (difficulty <= 10) return '실버';
  if (difficulty <= 15) return '골드';
  if (difficulty <= 20) return '플레티넘';
  if (difficulty <= 25) return '다이아';
  return '마스터';
};
