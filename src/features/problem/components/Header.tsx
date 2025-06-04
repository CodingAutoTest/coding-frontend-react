import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Timer } from '@/features/problem/components/Timer';
import { useTimer } from '../hooks/useTimer';

import { IMAGES } from '@/constants/images';
import { LoginModal } from '@/components/LoginModal';

import { useAuthStore } from '@/stores/useAuthStore';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isRunning, formattedTime, startTimer, stopTimer, resetTimer } = useTimer();
  const user = useAuthStore((s) => s.user);
  const [showLogin, setShowLogin] = useState(false);

  /* 프로필 이미지 */
  const [profileImage, setProfileImage] = useState<string>(IMAGES.ICONS.PROFILE);

  /* user 변경 시 프로필 이미지 결정 */
  useEffect(() => {
    if (!user) {
      setProfileImage(IMAGES.ICONS.PROFILE);
      return;
    }

    setProfileImage(user.profileImage ?? IMAGES.ICONS.PROFILE);
  }, [user]);

  /* 프로필 클릭 시 */
  const handleProfileClick = () => {
    if (!user) {
      setShowLogin(true);
      return;
    }
    navigate('/profile');
  };

  return (
    <>
      <header className="w-full h-[80px] px-[38px] flex items-center justify-between bg-problem-BACKGROUND">
        {/* ─── 왼쪽: 로고 + 메뉴 ─── */}
        <div className="flex items-center gap-3">
          <img
            src={IMAGES.LOGO.DEFAULT}
            alt="logo"
            className="w-[93px] h-[33px] cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate('/')}
            draggable={false}
          />
          <img
            src={IMAGES.ICONS.MENU}
            alt="menu"
            className="w-[24px] h-[24px] cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate('/')}
            draggable={false}
          />
        </div>

        {/* ─── 가운데: 타이머 ─── */}
        <Timer
          formattedTime={formattedTime}
          isRunning={isRunning}
          onStart={startTimer}
          onStop={stopTimer}
          onReset={resetTimer}
        />

        {/* ─── 오른쪽: 사용자 이름 + 프로필 ─── */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-DEFAULT text-medium whitespace-nowrap font-inter">
                {user.name}님
              </span>
              <img
                src={profileImage}
                alt="profile"
                className="w-[40px] h-[40px] rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                onClick={handleProfileClick}
                draggable={false}
              />
            </>
          ) : (
            <>
              <span className="text-DEFAULT text-medium whitespace-nowrap font-inter">익명님</span>
              <img
                src={IMAGES.ICONS.PROFILE}
                alt="profile"
                className="w-[40px] h-[40px] rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                onClick={handleProfileClick}
                draggable={false}
              />
            </>
          )}
        </div>
      </header>

      {/* 로그인 모달 */}
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
};
