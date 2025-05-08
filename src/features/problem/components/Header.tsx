import React from 'react';
import { Timer } from '@/features/problem/components/Timer';
import { useUserInfo } from '../hooks/useUserInfo';
import { useTimer } from '../hooks/useTimer';
import { useNavigate } from 'react-router-dom';
import { IMAGES } from '@/global/contants/images';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isRunning, formattedTime, startTimer, stopTimer, resetTimer } = useTimer();
  const { user, loading } = useUserInfo();

  return (
    <header className="w-full px-[20px] py-[10px] flex items-center justify-between bg-problem-BACKGROUND">
      {/* 왼쪽: 로고 + 메뉴 */}
      <div className="flex items-center gap-3">
        <img
          src={IMAGES.LOGO.DEFAULT}
          alt="logo"
          className="w-[93px] h-[33px] cursor-pointer"
          onClick={() => navigate('/')}
        />
        <img
          src={IMAGES.ICONS.MENU}
          alt="menu"
          className="w-[24px] h-[24px] cursor-pointer"
          onClick={() => navigate('/')}
        />
      </div>

      {/* 가운데: 타이머 */}
      <Timer
        formattedTime={formattedTime}
        isRunning={isRunning}
        onStart={startTimer}
        onStop={stopTimer}
        onReset={resetTimer}
      />

      {/* 오른쪽: 사용자 이름 + 프로필 */}
      <div className="flex items-center gap-3">
        <span className="text-DEFAULT text-medium whitespace-nowrap font-inter">
          {loading ? '불러오는 중...' : `${user?.name ?? '익명'}님`}
        </span>
        <img
          src={user?.profileImage || IMAGES.ICONS.PROFILE}
          alt="profile"
          className="w-[40px] h-[40px] rounded-full object-cover"
        />
      </div>
    </header>
  );
};
