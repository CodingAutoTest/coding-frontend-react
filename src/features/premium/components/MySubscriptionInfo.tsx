// src/features/premium/components/MyPremiumInfo.tsx
import { FC } from 'react';

type Props = {
  planName: string;
  startDate: string;
  endDate: string;
  autoRenewal: boolean;
  amount: number;
  payMethod: string;
};

const MyPremiumInfo: FC<Props> = ({
  planName,
  startDate,
  endDate,
  autoRenewal,
  amount,
  payMethod,
}) => {
  return (
    <section className="w-full flex flex-col gap-8">
      {/* ✅ 인트로는 박스 밖에 크게 표시 */}
      <div>
        <h1 className="text-6xl font-bold mb-4">프리미엄 정보</h1>
        <p className="text-gray-500 text-lg">Pricing built for people just like you.</p>
      </div>

      {/* ✅ 구독 정보 박스 */}
      <div className="w-full bg-white border border-gray-200 rounded-2xl p-8 shadow-sm space-y-8">
        <h2 className="text-2xl font-semibold">내 프리미엄 구독 정보</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-base">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">플랜</span>
            <span className="font-semibold">
              <span className="inline-block px-3 py-1 bg-[#FFC130]/20 text-[#FFC130] rounded-full text-sm">
                {planName}
              </span>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">결제 수단</span>
            <span className="font-medium">{payMethod.toUpperCase()}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">결제 금액</span>
            <span className="font-medium">{amount.toLocaleString()}원</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">시작일</span>
            <span className="font-medium">{new Date(startDate).toLocaleDateString()}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">종료일</span>
            <span className="font-medium">{new Date(endDate).toLocaleDateString()}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">자동 갱신</span>
            <span className="font-medium">{autoRenewal ? 'ON' : 'OFF'}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyPremiumInfo;
