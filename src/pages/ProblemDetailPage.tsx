import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProblemDetail } from '@/features/problem/hooks/useProblemDetail';
import { useCodeExecution } from '@/features/problem/hooks/useCodeExecution';
import { useCodeSubmit } from '@/features/problem/hooks/useCodeSubmit';
import { useProblemStore } from '@/features/problem/stores/useProblemStore';

import { ProblemHeader } from '@/features/problem/components/ProblemHeader';
import ProblemDescription from '@/features/problem/components/ProblemDescription';
import { CodeEditorBox } from '@/features/problem/components/CodeEditorBox';
import { TestCaseSection } from '@/features/problem/components/TestCaseSection';
import TabBar from '@/features/problem/components/TabBar';
import { TABS, TabType } from '@/features/problem/constants/tab.constants';
import { Header } from '@/features/problem/components/Header';

const ProblemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const problemId = Number(id);
  const userId = Number(localStorage.getItem('userId')) || 1;

  const { loading, error } = useProblemDetail(problemId);
  const { execute } = useCodeExecution();
  const { submit, isSubmitting } = useCodeSubmit();

  const { problemData, testCases, code, language, isExecuting, setCode, setLanguage } =
    useProblemStore();

  const [selectedTestCase, setSelectedTestCase] = useState(0);
  const [isAlgorithmVisible, setIsAlgorithmVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('문제');

  const handleExecute = () => {
    if (!testCases.length) return;
    const testcaseIds = testCases.map((tc) => tc.id);
    execute(testcaseIds);
  };

  const handleSubmit = () => {
    submit(problemId, userId);
  };

  if (loading) return <div>로딩 중...</div>;
  if (error || !problemData) return <div>문제를 불러오지 못했습니다.</div>;

  const input = testCases[selectedTestCase]?.input || '';
  const output = testCases[selectedTestCase]?.output || '';

  return (
    <div className="flex flex-col min-h-screen bg-problem-BACKGROUND">
      {/* Header - 플로팅 */}
      <div className="sticky top-0 z-50 bg-problem-BACKGROUND h-[80px] px-[38px] flex items-center ">
        <Header />
      </div>

      {/* 메인 콘텐츠 */}
      <main className="flex flex-col lg:flex-row px-[38px] gap-[20px] py-[20px] flex-1 ">
        {/* 왼쪽 문제 설명 */}
        <aside className="w-full lg:w-1/2 bg-problem-COMPONENT_HEADER rounded-[10px] shadow-md flex flex-col ">
          {/* TabBar - 문제 탭 고정 */}
          <div className="sticky top-[80px] z-40 bg-problem-COMPONENT_HEADER rounded-t-[10px]">
            <TabBar tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
          </div>

          {/* 문제 설명 본문 - 길어지면 스크롤 */}
          <section className="flex-1 overflow-y-auto pt-[24px] px-[10px] scrollbar-hide">
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
          </section>
        </aside>

        {/* 오른쪽 코드 에디터 & 테스트케이스 */}
        <section className="w-full lg:w-1/2 flex flex-col gap-[20px]">
          {/* 코드 에디터 영역 */}
          <div className="flex-1 min-h-0 bg-problem-COMPONENT_HEADER rounded-[10px] flex flex-col overflow-hidden">
            <div className="flex-1 overflow-hidden">
              <CodeEditorBox
                language={language}
                code={code}
                onCodeChange={(value) => value !== undefined && setCode(value)}
                onLanguageChange={setLanguage}
              />
            </div>
            <footer className="flex justify-end gap-[12px] px-[20px] py-[16px] bg-[#E9E9E9] rounded-b-[10px] shrink-0">
              <button
                onClick={handleExecute}
                disabled={isExecuting}
                className="bg-WHITE text-DEFAULT text-[16px] font-medium rounded-[10px] px-[25px] py-[10px] disabled:opacity-50"
              >
                {isExecuting ? '실행 중...' : '실행'}
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-PRIMARY text-white text-[16px] font-medium rounded-[10px] px-[25px] py-[10px] disabled:opacity-50"
              >
                {isSubmitting ? '제출 중...' : '제출'}
              </button>
            </footer>
          </div>

          {/* 테스트케이스 영역 - 넘치면 스크롤 */}
          <div className="flex-1 min-h-0 flex flex-col">
            <TestCaseSection
              testCases={testCases}
              selectedTestCase={selectedTestCase}
              onTestCaseSelect={setSelectedTestCase}
              input={input}
              output={output}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProblemDetailPage;
