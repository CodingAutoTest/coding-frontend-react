import React from 'react';
import { ProblemType } from '@/features/problem/types/problem.type';
import { ChevronDown, ChevronUp } from 'lucide-react';
import TierBadge from '@/components/TierBadge';
import StatCard from '@/features/problem/components/StatCard';
import { useProblemDifficulty } from '@/hooks/useProblemDifficulty';
import { IMAGES } from '@/constants/images';
// import LoadingSpinner from '@/features/problem/components/LoadingModal';
import { getDifficultyIcon } from '@/constants/difficulty';

type ProblemHeaderProps = {
  problemData: ProblemType;
  isAlgorithmVisible: boolean;
  onToggleAlgorithm: () => void;
};

function useImagePreload(src: string | undefined) {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    if (!src) return;
    const img = new window.Image();
    img.src = src;
    img.onload = () => setLoaded(true);
  }, [src]);
  return loaded;
}

export const ProblemHeader: React.FC<ProblemHeaderProps> = ({
  problemData,
  isAlgorithmVisible,
  onToggleAlgorithm,
}) => {
  const tags = problemData.tags ?? [];
  const { difficulty, isLoading } = useProblemDifficulty(problemData.id);

  const tierIconSrc = difficulty ? getDifficultyIcon(difficulty.difficulty) : undefined;
  const tierImgLoaded = useImagePreload(tierIconSrc);

  // if (!isLoading && difficulty && !tierImgLoaded) {
  //   return <LoadingSpinner />;
  // }

  return (
    <div className="w-full mb-5 px-[22px]">
      <div className="flex items-center justify-between mb-3 w-full">
        <div className="flex items-center">
          {!isLoading && difficulty && tierImgLoaded && (
            <TierBadge difficulty={difficulty.difficulty} size={20} />
          )}
          <h1 className="text-[32px] font-inter font-bold text-DEFAULT ml-2">
            {problemData.title}
          </h1>
        </div>

        <div className="flex items-center gap-1 cursor-pointer" onClick={onToggleAlgorithm}>
          <span className="text-DEFAULT text-[14px] font-inter">알고리즘</span>
          {isAlgorithmVisible ? (
            <ChevronUp className="w-4 h-4 text-DEFAULT" />
          ) : (
            <ChevronDown className="w-4 h-4 text-DEFAULT" />
          )}
        </div>
      </div>

      {isAlgorithmVisible && (
        <div className="flex flex-wrap w-full">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 text-secondary px-2 py-1 rounded-full text-sm mr-2"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-5 mt-4 w-full">
        <StatCard
          label="시간 제한"
          value={problemData.timeLimit}
          unit="초"
          iconUrl={IMAGES.PROBLEM_INFO.TIME_LIMIT}
        />
        <StatCard
          label="메모리 제한"
          value={problemData.memoryLimit}
          unit="MB"
          iconUrl={IMAGES.PROBLEM_INFO.MEMORY_LIMIT}
        />
        <StatCard
          label="정답 비율"
          value={problemData.acceptanceRate.toFixed(2)}
          unit="%"
          iconUrl={IMAGES.PROBLEM_INFO.ACCEPTANCE}
        />
      </div>
    </div>
  );
};
