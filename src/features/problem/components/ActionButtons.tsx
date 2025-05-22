import React, { useState } from 'react';
import { useProblemStore } from '@/features/problem/stores/useProblemStore';
import { useCodeExecution } from '@/features/problem/hooks/useCodeExecution';
import { useCodeSubmit } from '@/features/problem/hooks/useCodeSubmit';
import { TestCaseType } from '@/features/problem/types/problem.type';
import { IMAGES } from '@/constants/images';
import { LoginModal } from '@/components/LoginModal';
import { TabType } from '../constants/tab.constants';

type ActionButtonsProps = {
  problemId: number;
  testCases: TestCaseType[];
  setActiveTab: (tab: TabType) => void;
  onStopTimer: () => void;
  onSubmit: (submissionId: string) => Promise<void>;
};

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  problemId,
  testCases,
  onStopTimer,
  onSubmit,
}) => {
  const { code, language } = useProblemStore();
  const { execute } = useCodeExecution();
  const { submit } = useCodeSubmit();

  const [isExecuting, setIsExecuting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalType, setModalType] = useState<'loading' | 'result' | 'alert' | null>(null);
  const [modalMessage, setModalMessage] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);

  const token = localStorage.getItem('token');
  const isAnonymous = !token;

  const openAlert = (message: string) => {
    setModalMessage(message);
    setModalType('alert');
  };

  const handleExecute = async () => {
    if (isAnonymous) {
      setShowLoginModal(true);
      return;
    }

    if (!code.trim()) return openAlert('코드를 먼저 작성해주세요.');
    if (!testCases.length) return openAlert('테스트 케이스가 없습니다.');

    console.log('실행 버튼 클릭 - 타이머 정지');
    onStopTimer();
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
    if (isAnonymous) {
      setShowLoginModal(true);
      return;
    }

    if (!code.trim()) return openAlert('코드를 먼저 작성해주세요.');

    console.log('제출 버튼 클릭 - 타이머 정지');
    onStopTimer();
    setIsSubmitting(true);
    setModalType('loading');

    try {
      const submissionId = await submit(problemId, code, language);
      await onSubmit(submissionId);
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
      <div className="flex justify-end gap-4 p-[10px] relative">
        <button
          onClick={handleExecute}
          disabled={isExecuting || isSubmitting}
          className="px-[20px] py-[5px] font-regular font-inter rounded-lg bg-WHITE text-DEFAULT hover:bg-WHITE/90 disabled:cursor-not-allowed relative group cursor-pointer"
        >
          {isExecuting ? '실행 중...' : '실행'}
          {isAnonymous && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <img
                src={IMAGES.PROBLEM_RESULT.LOCK}
                alt="lock"
                className="w-4 h-4"
                draggable={false}
              />
            </div>
          )}
        </button>
        <button
          onClick={handleSubmit}
          disabled={isExecuting || isSubmitting}
          className="px-[20px] py-[5px] font-regular font-inter rounded-lg bg-PRIMARY text-WHITE hover:bg-PRIMARY/90 disabled:cursor-not-allowed relative group cursor-pointer"
        >
          {isSubmitting ? '제출 중...' : '제출'}
          {isAnonymous && (
            <div className="absolute inset-0 flex items-center justify-center bg-PRIMARY/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <img
                src={IMAGES.PROBLEM_RESULT.LOCK}
                alt="lock"
                className="w-4 h-4"
                draggable={false}
              />
            </div>
          )}
        </button>
      </div>

      {/* 모달 */}
      {modalType === 'loading' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-PRIMARY"></div>
          </div>
        </div>
      )}

      {modalType === 'result' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <p className="text-DEFAULT">{modalMessage}</p>
            <button
              onClick={() => setModalType(null)}
              className="mt-4 px-4 py-2 bg-PRIMARY text-white rounded-lg cursor-pointer"
            >
              확인
            </button>
          </div>
        </div>
      )}

      {modalType === 'alert' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <p className="text-DEFAULT">{modalMessage}</p>
            <button
              onClick={() => setModalType(null)}
              className="mt-4 px-4 py-2 bg-PRIMARY text-white rounded-lg cursor-pointer"
            >
              확인
            </button>
          </div>
        </div>
      )}

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
};
