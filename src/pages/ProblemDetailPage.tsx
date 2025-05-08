import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProblemDetail } from '@/features/problem/hooks/useProblemDetail';
import { useProblemStore } from '@/features/problem/stores/useProblemStore';
import { Header } from '@/features/problem/components/Header';
import { ProblemSection } from '@/features/problem/components/ProblemContent';
import { CodeEditorSection } from '@/features/problem/components/CodeEditorSection';
import { TabType } from '@/features/problem/constants/tab.constants';
import { getSubmissionCode } from '@/features/problem/api/problem-result.api';
import { fetchProblemSubmissionResult } from '@/features/problem/api/problem-result.api';
import { useTimerStore } from '@/features/problem/stores/useTimerStore';

const ProblemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const problemId = Number(id);

  const { loading, error } = useProblemDetail(problemId);
  const {
    problemData,
    testCases,
    code,
    language,
    setCode,
    setLanguage,
    submissionResult,
    setSubmissionResult,
  } = useProblemStore();
  const { stopTimer } = useTimerStore();

  const [selectedTestCase, setSelectedTestCase] = useState(0);
  const [isAlgorithmVisible, setIsAlgorithmVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('문제');
  const [lastViewedSubmissionId, setLastViewedSubmissionId] = useState<string | null>(null);

  const handleTabChange = async (tab: TabType) => {
    if (tab === '결과' && lastViewedSubmissionId) {
      try {
        const result = await fetchProblemSubmissionResult(lastViewedSubmissionId);
        setSubmissionResult(result);
      } catch (error) {
        console.error('Failed to fetch submission result:', error);
      }
    }
    setActiveTab(tab);
  };

  const handleViewSubmissionCode = async (submissionId: number) => {
    try {
      const submittedCode = await getSubmissionCode(submissionId);
      setCode(submittedCode);
      setLastViewedSubmissionId(String(submissionId));
      setActiveTab('문제');
    } catch (error) {
      console.error('Failed to fetch submission code:', error);
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error || !problemData) return <div>문제를 불러오지 못했습니다.</div>;

  return (
    <div className="flex flex-col min-h-screen bg-problem-BACKGROUND">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-problem-BACKGROUND h-[80px] px-[38px] flex items-center">
        <Header />
      </div>

      {/* Main */}
      <main className="flex flex-col lg:flex-row px-[38px] gap-[20px] py-[20px] flex-1 min-h-0">
        {/* 왼쪽 섹션 */}
        <ProblemSection
          problemData={problemData}
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          isAlgorithmVisible={isAlgorithmVisible}
          setIsAlgorithmVisible={setIsAlgorithmVisible}
          submissionResult={submissionResult}
          onViewSubmissionCode={handleViewSubmissionCode}
        />

        {/* 오른쪽 섹션 */}
        <CodeEditorSection
          language={language}
          code={code}
          setCode={setCode}
          setLanguage={setLanguage}
          testCases={testCases}
          selectedTestCase={selectedTestCase}
          setSelectedTestCase={setSelectedTestCase}
          problemId={problemId}
          setActiveTab={handleTabChange}
          onStopTimer={stopTimer}
        />
      </main>
    </div>
  );
};

export default ProblemDetailPage;
