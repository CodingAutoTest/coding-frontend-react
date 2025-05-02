import React, { useState } from 'react';
import { useProblemStore } from '@/features/problem/stores/useProblemStore';
import { useCodeExecution } from '@/features/problem/hooks/useCodeExecution';
import { useCodeSubmit } from '@/features/problem/hooks/useCodeSubmit';
import { TestCaseType } from '@/features/problem/types/problem.type';
import { TabType } from '@/features/problem/constants/tab.constants';
import { fetchProblemSubmissionResult } from '@/features/problem/api/problem-result.api';

type ActionButtonsProps = {
  problemId: number;
  userId: number;
  testCases: TestCaseType[];
  setActiveTab: (tab: TabType) => void;
};

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  problemId,
  userId,
  testCases,
  setActiveTab,
}) => {
  const { code, language, setSubmissionResult } = useProblemStore();
  const { execute } = useCodeExecution();
  const { submit } = useCodeSubmit();

  const [isExecuting, setIsExecuting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalType, setModalType] = useState<'loading' | 'result' | 'alert' | null>(null);
  const [modalMessage, setModalMessage] = useState('');

  const openAlert = (message: string) => {
    setModalMessage(message);
    setModalType('alert');
  };

  const handleExecute = async () => {
    if (!code.trim()) return openAlert('코드를 먼저 작성해주세요.');
    if (!testCases.length) return openAlert('테스트 케이스가 없습니다.');

    setIsExecuting(true);
    setModalType('loading');

    try {
      const testcaseIds = testCases.map((tc) => tc.id);
      const results = await execute(testcaseIds);

      const passedCount = results.filter((r) => r.status === 'Accepted').length;
      const totalCount = results.length;

      setModalMessage(`${totalCount}개 중 ${passedCount}개 통과했습니다.`);
      setModalType('result');
    } catch (error) {
      console.error('실행 오류:', error);
      openAlert('실행 중 오류가 발생했습니다.');
    } finally {
      setIsExecuting(false);
    }
  };

  const handleSubmit = async () => {
    if (!code.trim()) return openAlert('코드를 먼저 작성해주세요.');

    setIsSubmitting(true);
    setModalType('loading');

    try {
      const submissionId = await submit(problemId, code, language, userId);

      const resultSummary = await fetchProblemSubmissionResult(submissionId);

      setSubmissionResult(resultSummary);
      setActiveTab('결과');
    } catch (error) {
      console.error('제출 오류:', error);
      openAlert('제출 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
      setModalType(null);
    }
  };

  return (
    <>
      {/* 버튼 */}
      <div className="flex justify-end gap-4 p-5">
        <button
          onClick={handleExecute}
          disabled={isExecuting || isSubmitting}
          className="px-8 py-2 rounded-lg bg-WHITE text-DEFAULT hover:bg-WHITE/90 disabled:cursor-not-allowed"
        >
          {isExecuting ? '실행 중...' : '실행'}
        </button>
        <button
          onClick={handleSubmit}
          disabled={isExecuting || isSubmitting}
          className="px-8 py-2 rounded-lg bg-PRIMARY text-WHITE hover:bg-PRIMARY/90 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '제출 중...' : '제출'}
        </button>
      </div>

      {/* 모달 */}
      {modalType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-[400px] p-8 bg-white rounded-2xl shadow-2xl text-center flex flex-col items-center gap-6">
            {modalType === 'loading' ? (
              <>
                <div className="w-12 h-12 border-4 border-gray-300 border-t-PRIMARY rounded-full animate-spin" />
                <p className="text-xl font-bold text-gray-800">처리 중입니다...</p>
              </>
            ) : (
              <>
                <p className="text-xl font-bold text-gray-800">{modalMessage}</p>
                <button
                  onClick={() => setModalType(null)}
                  className="mt-2 px-6 py-3 bg-PRIMARY text-WHITE text-lg rounded-xl hover:bg-PRIMARY/90 transition"
                >
                  확인
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
