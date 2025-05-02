import React from 'react';
import { IMAGES } from '@/global/contants/images';

type ScoreCardProps = {
  label: string;
  score: number;
  tooltip: string;
};

export const ScoreCard: React.FC<ScoreCardProps> = ({ label, score, tooltip }) => (
  <div className="flex items-center justify-between bg-white p-5 rounded-2xl shadow-md relative">
    <div className="flex items-center gap-4">
      <img src={IMAGES.PROBLEM_RESULT.GRAPH} alt="graph" className="w-10 h-10" />
      <div className="flex flex-col">
        <span className="text-sm text-gray-500">{label}</span>
        <span className="text-xl font-bold text-DEFAULT">
          {score === undefined || score === null ? '???' : `${score}점`}
        </span>
      </div>
    </div>
    {/* info 툴팁 */}
    <div className="relative group cursor-pointer">
      <img src={IMAGES.PROBLEM_RESULT.INFO} alt="info" className="w-5 h-5" />
      <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
        {tooltip}
      </div>
    </div>
  </div>
);
