import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Header } from '@/features/problem/components/Header';
import { ProblemSection } from '@/features/problem/components/ProblemContent';
import { CodeEditorSection } from '@/features/problem/components/CodeEditorSection';

import { useProblemDetail } from '@/features/problem/hooks/useProblemDetail';
import { useProblemStore } from '@/features/problem/stores/useProblemStore';
import { useTimer } from '@/features/problem/hooks/useTimer';

import {
  getSubmissionCode,
  fetchProblemSubmissionResult,
  fetchProblemSubmissionHistory,
} from '@/features/problem/api/problem.api';

import { TabType } from '@/features/problem/constants/tab.constants';
import { SubmissionResultType } from '@/features/problem/types/problem.type';
import { useAuthStore } from '@/stores/useAuthStore';

const ProblemDetailPage: React.FC = () => {
  /* ───────── 라우팅 & 파라미터 ───────── */
  const { id } = useParams<{ id: string }>();
  const problemId = Number(id);

  /* ───────── 전역 상태 ───────── */
  const user = useAuthStore((s) => s.user); // 로그인 여부
  const isAnonymous = !user;

  /* ───────── 문제 데이터 ───────── */
  const { loading: detailLoading, error } = useProblemDetail(problemId);
  const { problemData, testCases, code, language, setCode, setLanguage, setSubmissionHistory } =
    useProblemStore();

  /* ───────── 타이머 ───────── */
  const { stopTimer } = useTimer();

  /* ───────── 로컬 UI 상태 ───────── */
  const [selectedTestCase, setSelectedTestCase] = useState(0);
  const [isAlgorithmVisible, setIsAlgorithmVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('문제');
  const [submissionResult, setSubmissionResult] = useState<SubmissionResultType | null>(null);
  const [viewingSubmissionId, setViewingSubmissionId] = useState<string | null>(null);

  /* ───────── 제출 히스토리 최초 로드 ───────── */
  useEffect(() => {
    if (!user) return; // 로그인한 사용자만
    (async () => {
      try {
        const history = await fetchProblemSubmissionHistory(problemId);
        setSubmissionHistory(history);
      } catch (e) {
        console.error('제출 내역 로딩 실패:', e);
      }
    })();

    /** 언마운트 시 코드/언어 초기화 */
    return () => {
      setCode('');
      setLanguage('python');
    };
  }, [problemId, user, setSubmissionHistory, setCode, setLanguage]);

  /* ───────── 탭 전환 ───────── */
  const handleTabChange = async (tab: TabType) => {
    if (tab === '결과' && viewingSubmissionId) {
      try {
        const res = await fetchProblemSubmissionResult(viewingSubmissionId);
        setSubmissionResult(res);
      } catch (e) {
        console.error('결과 로딩 실패:', e);
      }
    }
    setActiveTab(tab);
  };

  /* ───────── 제출 코드/결과 열람 ───────── */
  const handleViewSubmissionCode = async (submissionId: number) => {
    try {
      const [src, res] = await Promise.all([
        getSubmissionCode(submissionId),
        fetchProblemSubmissionResult(String(submissionId)),
      ]);
      setSubmissionResult(null); // 코드 보기 시 결과 초기화
      setActiveTab('문제');
      setViewingSubmissionId(String(submissionId));
      setCode(src);
      setSubmissionResult(res);
      setActiveTab('콘솔');
    } catch (e) {
      console.error('제출 열람 실패:', e);
    }
  };

  /* ───────── 코드 제출 후 ───────── */
  const handleSubmit = async (res: SubmissionResultType) => {
    setSubmissionResult(null); // 제출 시 결과 초기화
    setViewingSubmissionId(null);
    setActiveTab('결과');
    setSubmissionResult(res);

    try {
      const history = await fetchProblemSubmissionHistory(problemId);
      setSubmissionHistory(history);
    } catch (e) {
      console.error('제출 히스토리 갱신 실패:', e);
    }
  };

  /* ───────── 렌더 ───────── */
  if (detailLoading) return <div>로딩 중...</div>;
  if (error || !problemData) return <div>문제를 불러오지 못했습니다.</div>;

  return (
    <div className="w-full h-screen bg-problem-BACKGROUND">
      <Header />

      <main className="h-[calc(100vh-80px)] flex px-[38px] pb-[20px] gap-[20px]">
        {/* 왼쪽: 문제 설명/결과/제출 기록 */}
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

        {/* 오른쪽: 코드 에디터 */}
        <CodeEditorSection
          language={language}
          code={code}
          setCode={setCode}
          setLanguage={setLanguage}
          testCases={testCases}
          selectedTestCase={selectedTestCase}
          setSelectedTestCase={setSelectedTestCase}
          problemId={problemId}
          onStopTimer={stopTimer}
          onSubmit={handleSubmit}
        />
      </main>
    </div>
  );
};

export default ProblemDetailPage;
