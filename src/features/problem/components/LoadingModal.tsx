import React from 'react';

type LoadingModalProps = {
  isOpen: boolean;
  type: 'loading' | 'alert';
  message: string;
  onClose?: () => void;
};

export const LoadingModal: React.FC<LoadingModalProps> = ({ isOpen, type, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded-2xl shadow-lg text-center flex flex-col items-center gap-6">
        {type === 'loading' && (
          <>
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <div className="text-lg font-semibold">{message}</div>
          </>
        )}

        {type === 'alert' && (
          <>
            <div className="text-lg font-semibold">{message}</div>
            <button
              onClick={onClose}
              className="mt-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              확인
            </button>
          </>
        )}
      </div>
    </div>
  );
};
