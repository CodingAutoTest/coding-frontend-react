// src/features/premium/components/MySubscriptionInfo.tsx
import { FC } from 'react';

type Props = {
  planName: string;
  startDate: string;
  endDate: string;
  autoRenewal: boolean;
  amount: number;
  payMethod: string;
};

const MySubscriptionInfo: FC<Props> = ({
  planName,
  startDate,
  endDate,
  autoRenewal,
  amount,
  payMethod,
}) => {
  return (
    <section className="w-full border border-gray-200 rounded-lg p-6 shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-4">내 프리미엄 구독 정보</h2>
      <ul className="text-base text-gray-700 space-y-2">
        <li>
          <strong>플랜 이름:</strong> {planName}
        </li>
        <li>
          <strong>결제 수단:</strong> {payMethod}
        </li>
        <li>
          <strong>결제 금액:</strong> {amount.toLocaleString()}원
        </li>
        <li>
          <strong>시작일:</strong> {new Date(startDate).toLocaleDateString()}
        </li>
        <li>
          <strong>종료일:</strong> {new Date(endDate).toLocaleDateString()}
        </li>
        <li>
          <strong>자동 갱신:</strong> {autoRenewal ? 'ON' : 'OFF'}
        </li>
      </ul>
    </section>
  );
};

export default MySubscriptionInfo;
