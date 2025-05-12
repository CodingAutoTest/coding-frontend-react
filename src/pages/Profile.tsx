// src/pages/profile.tsx        ← 파일명·폴더 확인
import { useState, FC } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import defaultProfileImg from '@/assets/images/profile.png';
import defaultBgImg from '@/assets/images/background.png';

import TierChart from '@/features/profile/components/TierChart';
import TagChart from '@/features/profile/components/TagChart';
import StreakChart from '@/features/profile/components/StreakChart';

import useUserProfile from '@/features/profile/hooks/useProfile';
import { mapTierData, mapTagData } from '@/features/profile/utils/chartMapper';
import LoadingSpinner from '@/features/profile/components/LoadingSpinner';
import MainHeader from '@/components/MainHeader';

const Profile: FC = () => {
  const { profile, loading, error } = useUserProfile();
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => setCurrentIndex((i) => Math.max(i - 1, 0));
  const goToNext = (len: number) => setCurrentIndex((i) => Math.min(i + 1, len - 1));

  /* ---------- 로딩/에러 ---------- */
  if (loading) return <LoadingSpinner />;
  if (error || !profile) return <div>{error ?? '데이터 없음'}</div>;

  /* ---------- 데이터 가공 ---------- */
  const tierData = mapTierData(profile);
  const tagData = mapTagData(profile);
  const streakData = profile.solvedCountByDate;

  const ratingPercent = Math.min((profile.rating / 1000) * 100, 100);
  const profileImg =
    profile.profileImage && profile.profileImage.trim() !== ''
      ? profile.profileImage
      : defaultProfileImg;

  const bgImg =
    profile.backgroundImage && profile.backgroundImage.trim() !== ''
      ? profile.backgroundImage
      : defaultBgImg;

  const chartComponents = [
    <TierChart key="tier" data={tierData} totalSolved={profile.solvedCount} />,
    <TagChart key="tag" data={tagData} />,
    <StreakChart key="streak" dailySolveData={streakData} />,
  ];

  return (
    <main className="w-full min-h-screen bg-white flex flex-col items-center">
      {/* ===== 헤더 ===== */}
      <MainHeader />

      {/* ===== 프로필 배너 ===== */}
      <section className="w-full h-72 flex flex-col items-center relative">
        <img src={bgImg} alt="배경" className="w-full h-52 object-cover" />
        <div className="w-[836px] flex justify-between items-end relative">
          <img
            src={profileImg}
            alt="프로필"
            className="w-24 h-24 rounded-full border border-black absolute -top-12 left-0 z-10 bg-white"
            draggable={false}
          />
          <button className="ml-auto px-6 py-3 bg-slate-600/50 rounded flex items-center mt-5">
            <span className="text-black text-lg">프로필 편집</span>
          </button>
        </div>
      </section>

      {/* ===== 프로필 정보 ===== */}
      <section className="w-[874px] flex flex-col gap-2 mt-6 mb-5">
        <h1 className="text-2xl font-semibold">{profile.name}</h1>
        <div className="flex items-center justify-between">
          <span className="text-slate-500 text-xs font-semibold">Silver {profile.rating}</span>
          <span className="text-zinc-400 text-[8px] font-semibold">
            Silver {profile.rating} | 승급까지 {1000 - profile.rating}
          </span>
        </div>
        <div className="relative w-full h-4 bg-green-400/20 rounded">
          <div
            className="absolute top-0 left-0 h-4 bg-green-500 rounded"
            style={{ width: `${ratingPercent}%` }}
          />
        </div>
      </section>

      {/* ===== 차트 캐러셀 ===== */}
      <section className="relative w-[921px] h-96 px-5 py-2.5 bg-neutral-100 rounded-2xl flex flex-col justify-center items-center gap-12">
        <button
          onClick={goToPrev}
          disabled={currentIndex === 0}
          className={`absolute -left-20 top-1/2 -translate-y-1/2 p-1 rounded-full ${
            currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-200'
          }`}
        >
          <ChevronLeft size={32} />
        </button>

        <article className="w-[600px] flex justify-center">{chartComponents[currentIndex]}</article>

        <button
          onClick={() => goToNext(chartComponents.length)}
          disabled={currentIndex === chartComponents.length - 1}
          className={`absolute -right-20 top-1/2 -translate-y-1/2 p-1 rounded-full ${
            currentIndex === chartComponents.length - 1
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:bg-gray-200'
          }`}
        >
          <ChevronRight size={32} />
        </button>
      </section>

      {/* 인디케이터 */}
      <div className="flex items-center justify-center gap-3 mt-4 mb-4">
        {chartComponents.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === currentIndex ? 'bg-[#375D5B]' : 'bg-[#D9D9D9]'
            }`}
          />
        ))}
      </div>
    </main>
  );
};

export default Profile;
