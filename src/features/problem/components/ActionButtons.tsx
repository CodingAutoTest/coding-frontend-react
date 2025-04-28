import React from 'react';

type ActionButtonsProps = {
  isExecuting: boolean;
  isSubmitting: boolean;
  onExecute: () => void;
  onSubmit: () => void;
};

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  isExecuting,
  isSubmitting,
  onExecute,
  onSubmit,
}) => {
  return (
    <div className="flex justify-end gap-4 p-5">
      <button
        className={`px-8 py-2 rounded-lg ${
          isExecuting
            ? 'bg-gray-300 text-secondary cursor-not-allowed'
            : 'bg-primary text-white hover:bg-primary/90'
        }`}
        onClick={onExecute}
        disabled={isExecuting}
      >
        {isExecuting ? '실행 중...' : '실행'}
      </button>
      <button
        className={`px-8 py-2 rounded-lg ${
          isSubmitting
            ? 'bg-gray-300 text-secondary cursor-not-allowed'
            : 'bg-primary text-white hover:bg-primary/90'
        }`}
        onClick={onSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? '제출 중...' : '제출'}
      </button>
    </div>
  );
};
