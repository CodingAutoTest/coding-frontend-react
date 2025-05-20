// src/components/ui/Modal.tsx
import { FC } from 'react';

export type ModalKind = 'loading' | 'success' | 'info';

interface ModalProps {
  open: boolean;
  kind: ModalKind;
  message?: string; // success · info 전용
  onClose?: () => void; // success · info 전용
}

const Modal: FC<ModalProps> = ({ open, kind, message = '', onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40">
      <div className="flex flex-col items-center gap-6 rounded-2xl bg-white px-10 py-8 text-center">
        {/* ─── 로딩 ─── */}
        {kind === 'loading' && (
          <>
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
            <p className="text-[15px] font-medium">{message || '처리 중입니다…'}</p>
          </>
        )}

        {/* ─── 성공 / 알림 ─── */}
        {(kind === 'success' || kind === 'info') && (
          <>
            <p className="text-[15px] font-medium">{message}</p>
            <button
              className="rounded-lg bg-indigo-600 px-8 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
              onClick={onClose}
            >
              확인
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
