import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TierChart from '@/features/profile/components/TierChart';
import TagChart from '@/features/profile/components/TagChart';
import StreakChart, { DailySolveDataType } from '@/features/profile/components/StreakChart';

const Profile = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sample: DailySolveDataType = {
    '2024-04-01': 3,
    '2024-04-02': 0,
    '2024-04-03': 5,
    '2024-04-04': 9,
    '2024-04-05': 2,
    '2024-04-06': 10,
    '2024-04-07': 6,
    '2024-04-08': 4,
    '2024-04-09': 3,
  };

  const components = [
    <TierChart key="tier" />,
    <TagChart key="tag" />,
    <StreakChart key="streak" dailySolveData={sample} />,
  ];

  const goToPrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, components.length - 1));
  };

  return (
    <main className="w-full min-h-screen bg-white flex flex-col items-center">
      {/* Header */}
      <header className="w-full px-20 py-4 flex justify-between items-center bg-white">
        <div className="flex items-center gap-8">
          <img src="https://placehold.co/116x116" alt="로고" className="w-28 h-28" />
          <nav className="flex gap-12">
            <a className="text-neutral-800 text-base font-bold" href="#problem">
              문제
            </a>
            <a className="text-neutral-400 text-base font-bold" href="#class">
              클래스
            </a>
            <a className="text-neutral-800 text-base font-bold" href="#ranking">
              랭킹
            </a>
            <a className="text-neutral-400 text-base font-bold" href="#test">
              실전테스트
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-8">
          <span className="text-amber-400 font-bold">프리미엄</span>
          <button className="text-neutral-800 font-bold">로그아웃</button>
          <div className="p-2.5 bg-zinc-100 rounded-full">
            {/* 프로필 아이콘 */}
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M28.8236 12.1518C28.8236 17.0468 24.8988 20.9719 20.0003 20.9719C15.1035 20.9719 11.177 17.0468 11.177 12.1518C11.177 7.25675 15.1035 3.33337 20.0003 3.33337C24.8988 3.33337 28.8236 7.25675 28.8236 12.1518ZM20.0003 36.6667C12.7709 36.6667 6.66699 35.4917 6.66699 30.9583C6.66699 26.4233 12.8093 25.2899 20.0003 25.2899C27.2314 25.2899 33.3337 26.4649 33.3337 30.9983C33.3337 35.5334 27.1914 36.6667 20.0003 36.6667Z"
                fill="#131313"
              />
            </svg>
          </div>
        </div>
      </header>

      {/* Profile Banner */}
      <section className="w-full h-72 relative flex flex-col items-center">
        <img
          src="src/assets/images/background.png"
          alt="배경 이미지"
          className="w-full h-52 object-cover"
        />
        <div className="w-[836px] flex justify-between items-end relative">
          <img
            src="src/assets/images/profile.png"
            alt="프로필 이미지"
            className="w-24 h-24 rounded-full border border-black absolute -top-12 left-0 z-10 bg-white"
          />
          <button className="ml-auto px-6 py-3 bg-slate-600/50 rounded flex items-center mt-5">
            <span className="text-black text-lg">프로필 편집</span>
          </button>
        </div>
      </section>

      {/* Profile Info */}
      <section className="w-[874px] flex flex-col gap-2 mt-6 mb-5">
        <h1 className="text-2xl font-semibold text-black">changwook</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-slate-500 text-xs font-semibold">
            <span>Silver 600</span>
          </div>
          <span className="text-zinc-400 text-[8px] font-semibold">Silver 600 | 승급까지 100</span>
        </div>
        {/* Progress Bar */}
        <div className="relative w-full h-4 bg-green-400/20 rounded">
          {/* 여기에 실제 경험치 바를 추가 */}
          <div
            className="absolute top-0 left-0 h-4 bg-green-500 rounded"
            style={{ width: '50%' }}
          />
        </div>
      </section>
      {/* Chart Carousel */}
      <section className="relative w-[921px] h-96 px-5 py-2.5 bg-neutral-100 rounded-2xl inline-flex flex-col justify-center items-center gap-12">
        {/* 왼쪽 버튼 */}
        <button
          onClick={goToPrev}
          disabled={currentIndex === 0}
          className={`absolute -left-20 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full ${
            currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-200'
          }`}
        >
          <ChevronLeft size={32} />
        </button>

        {/* 가운데 chart */}
        <article className="w-[600px] flex justify-center">{components[currentIndex]}</article>

        {/* 오른쪽 버튼 */}
        <button
          onClick={goToNext}
          disabled={currentIndex === components.length - 1}
          className={`absolute -right-20 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full ${
            currentIndex === components.length - 1
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:bg-gray-200'
          }`}
        >
          <ChevronRight size={32} />
        </button>
      </section>
      {/* 인디케이터 점 */}
      <div className="flex items-center justify-center gap-3 mt-4 mb-4">
        {components.map((_, index) => (
          <div
            key={index}
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: index === currentIndex ? '#375D5B' : '#D9D9D9' }}
          />
        ))}
      </div>
    </main>
  );
};

export default Profile;
