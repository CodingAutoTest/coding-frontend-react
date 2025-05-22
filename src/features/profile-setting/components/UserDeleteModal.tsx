// src/features/profile-setting/components/AccountDeleteModal.tsx
import { FC, useState } from 'react';

type Props = {
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

const UserDeleteModal: FC<Props> = ({ open, onConfirm, onClose }) => {
  const [agree, setAgree] = useState(false);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="relative w-96 rounded-2xl bg-white p-6 shadow-lg flex flex-col gap-4">
        <button className="absolute right-3 top-3 text-xl" onClick={onClose}>
          ✕
        </button>

        <h2 className="text-lg font-semibold">계정 삭제</h2>
        <ul className="mb-2 list-inside list-disc text-sm">
          <li>이름, 프로필 사진, 배경 사진, 활동 내역을 포함한 모든 개인 정보가 삭제됩니다.</li>
        </ul>

        <label className="flex items-start gap-2 rounded border border-red-400 bg-red-50 p-3 text-[13px] leading-snug">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
          계정을 삭제하면 되돌릴 수 없으며, 삭제한 데이터를 복구할 수 없음을 이해했습니다.
        </label>

        <button
          disabled={!agree}
          onClick={onConfirm}
          className={`self-end mt-1 rounded px-6 py-2 text-white
                      ${
                        agree ? 'bg-rose-500 hover:bg-rose-600' : 'cursor-not-allowed bg-rose-300'
                      }`}
        >
          계정 삭제
        </button>
      </div>
    </div>
  );
};

export default UserDeleteModal;
