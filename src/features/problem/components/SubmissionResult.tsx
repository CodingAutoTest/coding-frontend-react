import React, { useEffect, useState } from 'react';
import { SubmissionResultType } from '../types/problem.type';
import { IMAGES } from '@/constants/images';
import { ScoreCard } from './ScoreCard';
import { useUserInfo } from '../hooks/useUserInfo';

type SubmissionResultProps = {
  resultSummary?: SubmissionResultType | null;
};

export const SubmissionResult: React.FC<SubmissionResultProps> = ({ resultSummary }) => {
  const { user } = useUserInfo();
  const isAnonymous = !user || user.name === '익명';
  const [showCelebration, setShowCelebration] = useState(false);
  const [audio] = useState<HTMLAudioElement | null>(
    typeof Audio !== 'undefined' ? new Audio('/assets/sound/congrats.wav') : null,
  );
  console.log('resultSummary:', resultSummary);
  useEffect(() => {
    if (resultSummary?.aiFeedbackDto.totalScore === 40) {
      setShowCelebration(true);
      audio?.play();

      const timer = setTimeout(() => {
        setShowCelebration(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [resultSummary?.aiFeedbackDto.totalScore, audio]);

  if (showCelebration) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden p-10">
        <div className="absolute top-10 animate-bounce text-6xl">🎉</div>
        <div className="absolute top-20 left-10 animate-bounce text-5xl">🎊</div>
        <div className="absolute top-20 right-10 animate-bounce text-5xl">🎊</div>
        <div className="absolute bottom-10 left-1/3 animate-ping text-5xl">🎉</div>
        <div className="absolute bottom-10 right-1/3 animate-ping text-5xl">🎉</div>

        <div className="text-center animate-fadeIn">
          <h1 className="text-4xl font-inter text-PRIMARY mb-4">Perfect!</h1>
          <p className="text-lg text-gray-600">40점 만점 축하합니다! 🎉</p>
        </div>
      </div>
    );
  }

  const isEmpty = !resultSummary || !resultSummary.aiFeedbackDto;

  const scoreItems = [
    {
      label: '정확성',
      score: isEmpty ? undefined : resultSummary.aiFeedbackDto.accuracy,
      tooltip: '문제의 정답률을 평가합니다.',
    },
    {
      label: '효율성',
      score: isEmpty ? undefined : resultSummary.aiFeedbackDto.efficiency,
      tooltip: '코드의 실행 속도와 메모리 사용을 평가합니다.',
    },
    {
      label: '가독성',
      score: isEmpty ? undefined : resultSummary.aiFeedbackDto.readability,
      tooltip: '코드 가독성과 유지보수 용이성을 평가합니다.',
    },
    {
      label: '테스트 커버리지',
      score: isEmpty ? undefined : resultSummary.aiFeedbackDto.testCoverage,
      tooltip: '다양한 입력 케이스를 커버하는지를 평가합니다.',
    },
  ];

  return (
    <div className="flex flex-col gap-6 min-h-full w-full">
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-md w-full">
        <div className="flex items-center gap-3">
          <img
            src={IMAGES.PROBLEM_RESULT.RESULT}
            alt="result"
            className="w-10 h-10"
            draggable={false}
          />
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">결과</span>
            <span className="text-lg font-inter font-bold text-DEFAULT">
              {isEmpty ? '???' : resultSummary.judge0Status}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 mr-2">
          <img
            src={IMAGES.PROBLEM_RESULT.TESTCASE}
            alt="testcase"
            className="w-10 h-10"
            draggable={false}
          />
          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-400">테스트케이스</span>
            <span className="text-lg font-inter font-bold text-DEFAULT">
              {isEmpty ? '???/???' : `${resultSummary.passedCount}/${resultSummary.totalCount}`}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        {scoreItems.map((item, index) => (
          <ScoreCard
            key={index}
            label={item.label}
            score={item.score || 0}
            tooltip={item.tooltip}
          />
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md w-full">
        <div className="text-lg font-inter mb-4">AI 피드백</div>
        {isAnonymous ? (
          <div className="text-gray-500 text-base text-center py-8 font-inter">
            AI 피드백은 로그인 후 확인할 수 있습니다.
            <br />
            <button
              type="button"
              className="text-PRIMARY font-bold bg-transparent border-none p-0 m-0 align-baseline underline cursor-pointer font-inter"
              onClick={() => (window.location.href = '/login')}
            >
              로그인 하러 가기
            </button>
          </div>
        ) : isEmpty ? (
          <div className="text-gray-500 text-base">제출을 하고 결과를 받아보세요!</div>
        ) : (
          <>
            <div className="text-gray-700 text-[15px] leading-relaxed whitespace-pre-line">
              {resultSummary.aiFeedbackDto.feedback}
            </div>
            <div className="mt-6 text-right font-inter text-xl text-PRIMARY">
              총점: {resultSummary.aiFeedbackDto.totalScore}점
            </div>
          </>
        )}
      </div>
    </div>
  );
};
