import HeaderNavButton from './HeaderNavButton';
import HeaderProfileButton from './ProfileButton';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';
import { useEffect, useState } from 'react';
import { fetchUser } from '@/features/problem/api/problem.api';
import profile from '@/assets/problem-list/default-profile.svg';

const HeaderUserMenu = () => {
  const [profileImage, setProfileImage] = useState<string>('');
  const navigate = useNavigate();
  const isLogin = useAuthStore((state) => state.isLogin);
  const checkToken = useAuthStore((state) => state.checkToken);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  useEffect(() => {
    const getUserImage = async () => {
      if (isLogin) {
        try {
          const userData = await fetchUser();
          if (userData?.profileImage) {
            setProfileImage(userData.profileImage);
          } else {
            setProfileImage(profile);
          }
        } catch (error) {
          console.error('프로필 이미지를 가져오는데 실패했습니다:', error);
          setProfileImage(profile);
        }
      }
    };

    getUserImage();
  }, [isLogin]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    checkToken();
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="left-[76.39%] h-full whitespace-nowrap my-auto absolute inline-flex justify-start items-center gap-[41px]">
      <HeaderNavButton
        text="프리미엄"
        color="text-[#FFC130]"
        onClick={() => {
          navigate('/premium');
          window.location.reload();
        }}
      />
      {isLogin ? (
        <>
          <HeaderNavButton text="로그아웃" color="text-DEFAULT" onClick={handleLogout} />
          <HeaderProfileButton profileImage={profileImage} />
        </>
      ) : (
        <>
          <HeaderNavButton
            text="로그인"
            color="text-DEFAULT"
            onClick={() => {
              navigate('/login');
            }}
          />
          <HeaderNavButton
            text="회원가입"
            color="text-DEFAULT"
            onClick={() => {
              navigate('/signup');
            }}
          />
        </>
      )}
    </div>
  );
};

export default HeaderUserMenu;
