import HeaderLogo from '@/components/LogoButton';
import HeaderNavMenu from '@/components/HeaderNavMenu';
import HeaderUserMenu from '@/components/HeaderUserMenu';

const MainHeader = () => {
  const isLogin = false; // 로그인 여부

  return (
    <header className="w-full h-[116px] bg-white sticky top-0">
      <HeaderLogo />
      <HeaderNavMenu />
      <HeaderUserMenu isLogin={isLogin} />
    </header>
  );
};

export default MainHeader;
