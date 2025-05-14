// src/features/premium/components/ConfirmPaymentModal.tsx
import { FC } from 'react';
import { api } from '@/lib/axios'; // ✅ axios 인스턴스 가져오기

type Props = {
  onClose: () => void;
};

const ConfirmPaymentModal: FC<Props> = ({ onClose }) => {
  const amount = 7000;
  const tax = amount * 0.1;
  const total = amount + tax;

  const handlePayment = () => {
    const { IMP } = window as any;
    IMP.init('imp65754554'); // 실제 가맹점 코드로 변경

    const data = {
      pg: 'kakaopay.TC0ONETIME',
      pay_method: 'card',
      merchant_uid: `order_${new Date().getTime()}`,
      amount: total,
      name: '프리미엄 이용권',
      buyer_name: '홍길동',
      buyer_tel: '01012345678',
      buyer_email: 'test@example.com',
      buyer_addr: '서울특별시 강남구',
      buyer_postcode: '12345',
    };

    IMP.request_pay(data, async (rsp: any) => {
      if (rsp.success) {
        try {
          await api.post('/api/subscription/payment', {
            impUid: rsp.imp_uid,
            merchantUid: rsp.merchant_uid,
            amount: rsp.paid_amount,
            payMethod: rsp.pay_method,
            status: rsp.status,
            userId: 85, // TODO: 현재 로그인한 사용자 ID로 교체
            planId: 1, // TODO: 실제 프리미엄 요금제 ID
          });
          alert('✅ 결제 성공 및 서버 전송 완료!');
          onClose();
        } catch (err) {
          console.error('서버 전송 실패', err);
          alert('❌ 서버 전송 실패');
        }
      } else {
        alert(`❌ 결제 실패: ${rsp.error_msg}`);
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl p-8 w-[420px] relative">
        <button className="absolute top-4 right-4 text-gray-500 text-xl" onClick={onClose}>
          ×
        </button>

        <h2 className="text-xl font-bold mb-6">변경 사항 확인</h2>

        <div className="mb-6 space-y-1">
          <div className="flex justify-between font-semibold text-base">
            <span>프리미엄 이용권</span>
            <span>₩{amount.toLocaleString()}</span>
          </div>
          <div className="text-sm text-gray-500">월마다 결제, 오늘부터 시작</div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-700">
            <span>부가세 10%</span>
            <span>₩{tax.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex justify-between font-bold text-base border-t border-gray-300 pt-3 mb-6">
          <span>오늘 납부 총계</span>
          <span>₩{total.toLocaleString()}</span>
        </div>

        <div className="mb-6 text-sm text-gray-700">
          <div className="font-medium mb-1">결제 방법</div>
          <div className="text-gray-900 font-semibold">KAKAOPAY</div>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100"
          >
            취소
          </button>
          <button
            onClick={handlePayment}
            className="px-4 py-2 bg-black text-white rounded text-sm hover:bg-gray-900"
          >
            지금 결제
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPaymentModal;
