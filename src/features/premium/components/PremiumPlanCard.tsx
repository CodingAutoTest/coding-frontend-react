import { FC } from 'react';
import useIamportScript from '@/hooks/useIamportScript';

const PremiumPlanCard: FC = () => {
  useIamportScript(); // 아임포트 결제 스크립트 등록

  const handlePayment = () => {
    const { IMP } = window as any;
    IMP.init('imp65754554'); // 👉 실제 발급받은 가맹점 식별코드로 변경하세요

    const data = {
      pg: 'kakaopay.TC0ONETIME',
      pay_method: 'card',
      merchant_uid: `order_${new Date().getTime()}`,
      amount: 7000,
      name: '프리미엄 이용권',
      buyer_name: '홍길동',
      buyer_tel: '01012345678',
      buyer_email: 'test@example.com',
      buyer_addr: '서울특별시 강남구',
      buyer_postcode: '12345',
    };

    IMP.request_pay(data, (rsp: any) => {
      if (rsp.success) {
        alert('✅ 결제 성공!');
        // TODO: 백엔드에 결제 결과 저장 로직 호출 가능
      } else {
        alert(`❌ 결제 실패: ${rsp.error_msg}`);
      }
    });
  };

  return (
    <div className="flex flex-col w-full">
      {/* 타이틀 */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">Premium</h2>
        <p className="text-gray-500">Limitless possibilities</p>
      </div>

      {/* 요금제 박스 */}
      <div
        className="border rounded-2xl p-8 flex w-full flex-col flex-1"
        style={{ backgroundColor: '#ECC351' }}
      >
        {/* 가격 설명 */}
        <div className="mb-10">
          <p className="text-4xl font-bold">
            7,000원<span className="text-base font-normal">/month</span>
          </p>
          <p className="text-gray-600 mt-2">Upgrade anytime</p>
        </div>

        {/* 혜택 + 버튼 */}
        <div className="flex flex-col flex-1 justify-between">
          {/* 혜택 */}
          <div className="flex flex-wrap mb-8">
            <ul className="w-1/2 space-y-2 text-left text-base text-white">
              <li>✔️ AI 토큰</li>
              <li>✔️ 프로필 및 배경사진 추가</li>
              <li>✔️ 항목</li>
            </ul>
            <ul className="w-1/2 space-y-2 text-left text-base text-white">
              <li>✔️ 항목</li>
              <li>✔️ 항목</li>
            </ul>
          </div>

          {/* 결제 버튼 */}
          <button
            onClick={handlePayment}
            className="w-full py-3 rounded-full bg-white text-gray-900 font-semibold hover:bg-gray-100 transition"
          >
            Upgrade to Premium
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumPlanCard;
