import { FC } from 'react';
import { getDifficultyIcon } from '@/global/contants/difficulty.constants';

export type TierBadgeProps = {
  difficulty: number;
  size?: number;
};

const TierBadge: FC<TierBadgeProps> = ({ difficulty, size = 32 }) => {
  const src = getDifficultyIcon(difficulty);

  return (
    <img
      src={src}
      alt={`${difficulty} tier`}
      width={size}
      height={size}
      className="object-contain"
    />
  );
};

export default TierBadge;
