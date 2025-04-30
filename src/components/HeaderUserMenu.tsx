import HeaderNavButton from './HeaderNavButton';
import HeaderProfileButton from './ProfileButton';
import { useNavigate } from 'react-router-dom';
type HeaderUserMenuProps = {
  isLogin: boolean; // 로그인 여부
};

const HeaderUserMenu = ({ isLogin }: HeaderUserMenuProps) => {
  const profileImage = '';
  // 값이 null, undefined, ''(빈 문자열), 0, false 등의 falsy한 값일 경우 기본 이미지 사용
  // API 사용 시 제거(Test 용 이미지)
  const navigate = useNavigate();
  return (
    <div className="left-[1100px] h-full whitespace-nowrap my-auto absolute inline-flex justify-start items-center gap-[41px]">
      <HeaderNavButton
        text="프리미엄"
        color="text-[#FFC130]"
        onClick={() => {
          navigate('/premium');
        }}
      />
      {isLogin ? (
        <>
          <HeaderNavButton text="로그아웃" color="text-DEFAULT" onClick={() => {}} />
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
