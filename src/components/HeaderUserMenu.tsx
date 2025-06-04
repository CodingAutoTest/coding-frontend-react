import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HeaderNavButton from './HeaderNavButton';
import HeaderProfileButton from './ProfileButton';

import { useAuthStore } from '@/stores/useAuthStore';
import { fetchMe } from '@/features/auth/api/getAuth'; // 프로필 보강용
import defaultProfile from '@/assets/problem-list/default-profile.svg';

export default function HeaderUserMenu() {
  /* 전역 인증 상태 */
  const user = useAuthStore((s) => s.user); // user가 있으면 로그인 상태
  const logout = useAuthStore((s) => s.logout);

  /* 라우터 */
  const navigate = useNavigate();

  /* 프로필 이미지 상태 */
  const [profileImage, setProfileImage] = useState<string>(defaultProfile);

  /* 1) user가 바뀔 때 프로필 이미지 결정 */
  useEffect(() => {
    (async () => {
      if (!user) {
        // 미로그인
        setProfileImage(defaultProfile);
        return;
      }

      // user 객체에 profileImage 필드가 이미 있으면 사용
      if ((user as any).profileImage) {
        setProfileImage((user as any).profileImage);
        return;
      }

      // 없으면 /auth/me(혹은 /user/me) 재호출해서 보강
      try {
        const me = await fetchMe();
        setProfileImage(me.profileImage ?? defaultProfile);
      } catch {
        setProfileImage(defaultProfile);
      }
    })();
  }, [user]);

  /* 로그아웃 */
  const handleLogout = () => {
    logout(); // 토큰·user 초기화
    navigate('/');
  };

  return (
    <div className="absolute left-[76.39%] h-full my-auto inline-flex items-center gap-[41px] whitespace-nowrap">
      {/* 프리미엄 버튼 (공통) */}
      <HeaderNavButton
        text="프리미엄"
        color="text-[#FFC130]"
        onClick={() => navigate('/premium')}
      />

      {/* 로그인 상태별 분기 */}
      {user ? (
        <>
          <HeaderNavButton text="로그아웃" color="text-DEFAULT" onClick={handleLogout} />
          <HeaderProfileButton profileImage={profileImage} />
        </>
      ) : (
        <>
          <HeaderNavButton text="로그인" color="text-DEFAULT" onClick={() => navigate('/login')} />
          <HeaderNavButton
            text="회원가입"
            color="text-DEFAULT"
            onClick={() => navigate('/signup')}
          />
        </>
      )}
    </div>
  );
}
