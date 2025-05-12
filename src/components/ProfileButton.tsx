import React from 'react';
import profile from '@/assets/problem-list/default-profile.svg';
import { useNavigate } from 'react-router-dom';
type ProfileButtonProps = {
  profileImage?: string; // 프로필 이미지
};

const ProfileButton = ({ profileImage }: ProfileButtonProps) => {
  const navigate = useNavigate();
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/profile');
  };

  return (
    <img
      src={profileImage || profile}
      onError={(e) => {
        // 이미지 로드 실패 시 기본 이미지
        const target = e.target as HTMLImageElement;
        target.src = profile;
      }}
      onClick={handleClick}
      className="w-[60px] h-[60px] relative cursor-pointer"
    />
  );
};

export default ProfileButton;
