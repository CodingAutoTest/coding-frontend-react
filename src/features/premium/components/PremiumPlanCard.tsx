import { FC, useState } from 'react';
import ConfirmPaymentModal from './ConfirmPaymentModal';
import { useNavigate } from 'react-router-dom';

const PremiumPlanCard: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // 로그인 안 된 경우 로그인 페이지로 이동
      return;
    }
    setShowModal(true);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">Premium</h2>
        <p className="text-gray-500">Limitless possibilities</p>
      </div>

      <div
        className="border rounded-2xl p-8 flex w-full flex-col flex-1"
        style={{ backgroundColor: '#ECC351' }}
      >
        <div className="mb-10">
          <p className="text-4xl font-bold">
            7,000원<span className="text-base font-normal">/month</span>
          </p>
          <p className="text-gray-600 mt-2">Upgrade anytime</p>
        </div>

        <div className="flex flex-col flex-1 justify-between">
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

          <button
            onClick={handleClick}
            className="w-full py-3 rounded-full bg-white text-gray-900 font-semibold hover:bg-gray-100 transition"
          >
            Upgrade to Premium
          </button>
        </div>
      </div>

      {showModal && <ConfirmPaymentModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default PremiumPlanCard;
