import React from 'react';
import TabBar from './TabBar';
import { ProblemHeader } from './ProblemHeader';
import ProblemDescription from './ProblemDescription';
import { SubmissionResult } from './SubmissionResult';
import { SubmissionHistory } from './SubmissionHistory';
import { useSubmissionHistory } from '../hooks/useSubmissionHistory';
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
};

export const ProblemSection: React.FC<ProblemSectionProps> = ({
  problemData,
  activeTab,
  setActiveTab,
  isAlgorithmVisible,
  setIsAlgorithmVisible,
  submissionResult,
  onViewSubmissionCode,
}) => {
  const { data: submissionHistory } = useSubmissionHistory(problemData.id);

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
              <SubmissionHistory
                submissions={submissionHistory}
                onViewCode={onViewSubmissionCode}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
