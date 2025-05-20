import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const NotLoggedInRankingCard: FC = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-gray-50 border border-gray-200 rounded-xl p-6 text-center shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        내 순위를 확인하려면 로그인하세요
      </h2>
      <p className="text-gray-600 text-sm mb-4">
        로그인 후 나의 레이팅, 티어, 마라톤 일수를 확인할 수 있습니다.
      </p>
      <button
        onClick={() => navigate('/login')}
        className="inline-block bg-black text-white px-5 py-2 rounded-md hover:bg-gray-900 transition"
      >
        로그인 하러 가기
      </button>
    </section>
  );
};

export default NotLoggedInRankingCard;
