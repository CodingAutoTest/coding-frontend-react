import { FC } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const CancelPremiumModal: FC<Props> = ({ open, onClose, onConfirm }) =>
  !open ? null : (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-96 bg-white rounded-2xl p-6 shadow flex flex-col gap-5 relative">
        <button className="absolute top-3 right-3 text-xl" onClick={onClose}>
          ✕
        </button>

        <h2 className="text-lg font-semibold">프리미엄 해지</h2>
        <p className="text-sm leading-relaxed">
          해지 즉시 무료 이용자로 전환되며, 남은 기간은 환불되지 않습니다.
          <br />
          계속하시겠습니까?
        </p>

        <div className="self-end flex gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded bg-zinc-400 text-white hover:bg-zinc-500"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded bg-[#DF0404] text-white hover:bg-red-700"
          >
            해지하기
          </button>
        </div>
      </div>
    </div>
  );

export default CancelPremiumModal;
