import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProblemDetail } from '@/features/problem/hooks/useProblemDetail';
import { useProblemStore } from '@/features/problem/stores/useProblemStore';
import { Header } from '@/features/problem/components/Header';
import { ProblemSection } from '@/features/problem/components/ProblemContent';
import { CodeEditorSection } from '@/features/problem/components/CodeEditorSection';
import { TabType } from '@/features/problem/constants/tab.constants';
import { getSubmissionCode } from '@/features/problem/api/problem-result.api';
import {
  fetchProblemSubmissionResult,
  fetchProblemSubmissionHistory,
} from '@/features/problem/api/problem-result.api';
import { useTimerStore } from '@/features/problem/stores/useTimerStore';
import { SubmissionResultType } from '@/features/problem/types/problem-result.type';
import { useUserInfo } from '@/features/problem/hooks/useUserInfo';

const ProblemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const problemId = Number(id);
  const { user } = useUserInfo();
  const isAnonymous = !user || user.name === '익명';

  const { loading, error } = useProblemDetail(problemId);
  const { problemData, testCases, code, language, setCode, setLanguage, setSubmissionHistory } =
    useProblemStore();
  const { stopTimer } = useTimerStore();

  const [selectedTestCase, setSelectedTestCase] = useState(0);
  const [isAlgorithmVisible, setIsAlgorithmVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('문제');
  const [lastViewedSubmissionId, setLastViewedSubmissionId] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResultType | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }

      try {
        const history = await fetchProblemSubmissionHistory(problemId);
        setSubmissionHistory(history);
      } catch (error) {
        console.error('Failed to fetch submission history:', error);
      }
    };

    fetchInitialData();

    // cleanup 함수: 페이지를 나갈 때 코드 초기화
    return () => {
      setCode('');
      setLanguage('python');
    };
  }, [problemId, setSubmissionHistory, setCode, setLanguage]);

  const handleTabChange = async (tab: TabType) => {
    if (tab === '결과' && lastViewedSubmissionId) {
      try {
        const result = await fetchProblemSubmissionResult(lastViewedSubmissionId);
        setSubmissionResult(result);
      } catch (error) {
        console.error('Failed to fetch submission result:', error);
      }
    } else if (tab === '결과' && !lastViewedSubmissionId) {
      setSubmissionResult(null);
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

  const handleSubmit = async (submissionId: string) => {
    try {
      const result = await fetchProblemSubmissionResult(submissionId);
      setSubmissionResult(result);
      setActiveTab('결과');

      // 제출 내역 업데이트
      const history = await fetchProblemSubmissionHistory(problemId);
      setSubmissionHistory(history);
    } catch (error) {
      console.error('Failed to fetch submission result:', error);
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error || !problemData) return <div>문제를 불러오지 못했습니다.</div>;

  return (
    <div className="w-full h-screen bg-problem-BACKGROUND">
      <Header />

      {/* Main */}
      <main className="h-[calc(100vh-80px)] flex flex-row px-[38px] pb-[20px] gap-[20px]">
        {/* 왼쪽 섹션 */}
        <ProblemSection
          problemData={problemData}
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          isAlgorithmVisible={isAlgorithmVisible}
          setIsAlgorithmVisible={setIsAlgorithmVisible}
          submissionResult={submissionResult}
          onViewSubmissionCode={handleViewSubmissionCode}
          isAnonymous={isAnonymous}
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
          onSubmit={handleSubmit}
        />
      </main>
    </div>
  );
};

export default ProblemDetailPage;
