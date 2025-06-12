import { useState, FC, useLayoutEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import defaultProfileImg from '@/assets/profile.svg';
import defaultBgImg from '@/assets/background.png';

import TierChart from '@/features/profile/components/TierChart';
import TagChart from '@/features/profile/components/TagChart';
import StreakChart from '@/features/profile/components/StreakChart';

import useUserProfile from '@/features/profile/hooks/useProfile';
import { mapTierData, mapTagData } from '@/features/profile/utils/chartMapper';
import MainHeader from '@/components/MainHeader';
import { getTierInfo } from '@/features/profile/utils/getTierInfo';

const Profile: FC = () => {
  const navigate = useNavigate();
  const { userName } = useParams();
  const isMyPage = !userName;

  const { profile, error } = useUserProfile(userName);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const goToPrev = () => setCurrentIndex((i) => Math.max(i - 1, 0));
  const goToNext = (len: number) => setCurrentIndex((i) => Math.min(i + 1, len - 1));

  /* ---------- 로딩/에러 ---------- */
  useLayoutEffect(() => {
    if (profile || error) {
      setIsReady(true);
    }
  }, [profile, error]);

  // ✅ 로딩 중엔 아무것도 렌더링하지 않음
  if (!isReady || !profile) return null;

  /* ---------- 데이터 가공 ---------- */
  const { name: tierName, progress, need } = getTierInfo(profile.rating);
  const tierData = mapTierData(profile);
  const tagData = mapTagData(profile);
  const streakData = profile.solvedCountByDate;
  const { solvedCount } = profile;
  const hasIndicator = solvedCount > 0;

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
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white">
        <MainHeader />
      </div>
      <main className="w-full min-h-screen bg-white flex flex-col items-center pt-[116px]">
        {/* ===== 헤더 ===== */}

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
            {isMyPage && (
              <button
                type="button"
                onClick={() => navigate('/profile-setting')}
                className="ml-auto mt-5 flex items-center rounded-xl
                         bg-PRIMARY px-6 py-3 hover:bg-[#3B55A9]"
              >
                <span className="text-lg text-black">프로필 편집</span>
              </button>
            )}
          </div>
        </section>

        {/* ===== 프로필 정보 ===== */}
        <section className="w-[874px] flex flex-col gap-2 mt-6 mb-5">
          <h1 className="text-2xl font-semibold">{profile.name}</h1>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-[20px] font-semibold">
              {tierName} {profile.rating}
            </span>
            <span className="text-zinc-400 text-[15px] font-semibold">
              {tierName} {profile.rating} | 승급까지 {need}
            </span>
          </div>

          {/* 진행 바 – 티어가 오르면 progress 가 0 %부터 다시 시작 */}
          <div className="relative w-full h-4 bg-green-400/20 rounded">
            <div
              className="absolute top-0 left-0 h-4 bg-green-500 rounded"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>

        {/* ===== 차트 캐러셀 ===== */}
        {solvedCount === 0 ? (
          /* ---------- 아직 푼 문제가 없을 때 ---------- */
          <section
            className="w-[921px] h-60 mt-10 flex flex-col items-center justify-center gap-6
                          rounded-2xl bg-neutral-100"
          >
            <p className="text-lg font-semibold">아직 문제를 풀지 않았습니다.</p>
            {isMyPage && (
              <button
                type="button"
                onClick={() => navigate('/problems')}
                className="px-6 py-3 rounded-lg bg-indigo-600 text-white
                     hover:bg-indigo-700 transition-colors"
              >
                문제 풀러가기
              </button>
            )}
          </section>
        ) : (
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

            <article className="w-[600px] flex justify-center">
              {chartComponents[currentIndex]}
            </article>

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
        )}

        {/* 인디케이터 */}
        {hasIndicator ? (
          <div
            className="
    flex items-center justify-center gap-3 mt-4 mb-4
  "
          >
            {chartComponents.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i === currentIndex ? 'bg-[#375D5B]' : 'bg-[#D9D9D9]'
                }`}
              />
            ))}
          </div>
        ) : (
          <div className="w-full h-8 mt-4 mb-8" />
        )}
      </main>
    </>
  );
};

export default Profile;
