import React from 'react';
import TabBar from './TabBar';
import { ProblemHeader } from './ProblemHeader';
import ProblemDescription from './ProblemDescription';
import { SubmissionResult } from './SubmissionResult';
import { SubmissionHistory } from './SubmissionHistory';
import { useProblemStore } from '../stores/useProblemStore';
import { TABS, TabType } from '../constants/tab.constants';
import { ProblemType } from '../types/problem.type';
import { SubmissionResultType } from '../types/problem-result.type';

type ProblemSectionProps = {
  problemData: ProblemType;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isAlgorithmVisible: boolean;
  setIsAlgorithmVisible: (visible: boolean) => void;
  submissionResult?: SubmissionResultType | null;
  onViewSubmissionCode: (submissionId: number) => void;
  isAnonymous: boolean;
};

export const ProblemSection: React.FC<ProblemSectionProps> = ({
  problemData,
  activeTab,
  setActiveTab,
  isAlgorithmVisible,
  setIsAlgorithmVisible,
  submissionResult,
  onViewSubmissionCode,
  isAnonymous,
}) => {
  const { submissionHistory } = useProblemStore();

  return (
    <section className="w-full lg:w-1/2 flex flex-col gap-[20px]">
      <div className="h-[calc(100vh-120px)] bg-problem-COMPONENT_HEADER rounded-[10px] shadow-md flex flex-col">
        <div className="sticky top-[80px] z-40 bg-problem-COMPONENT_HEADER rounded-t-[10px]">
          <TabBar tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeTab === '문제' && (
            <div className="w-full pt-[24px] px-[22px]">
              <ProblemHeader
                problemData={problemData}
                isAlgorithmVisible={isAlgorithmVisible}
                onToggleAlgorithm={() => setIsAlgorithmVisible(!isAlgorithmVisible)}
              />
              <ProblemDescription
                description={problemData.description}
                inputFormat={problemData.inputConstraints}
                outputFormat={problemData.outputConstraints}
              />
            </div>
          )}

          {activeTab === '결과' && (
            <div className="w-full pt-[24px] px-[22px]">
              <SubmissionResult resultSummary={submissionResult} />
            </div>
          )}

          {activeTab === '제출내역' && (
            <div className="w-full h-full">
              {isAnonymous ? (
                <div className="text-gray-500 text-base text-center py-[200px] font-inter">
                  제출 내역은 로그인 후 확인할 수 있습니다.
                  <br />
                  <button
                    type="button"
                    className="text-PRIMARY font-bold bg-transparent border-none p-0 m-0 align-baseline underline"
                    style={{ font: 'font-inter', cursor: 'pointer' }}
                    onClick={() => (window.location.href = '/login')}
                  >
                    로그인 하러 가기
                  </button>
                </div>
              ) : (
                <SubmissionHistory
                  submissions={submissionHistory || []}
                  onViewCode={onViewSubmissionCode}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
