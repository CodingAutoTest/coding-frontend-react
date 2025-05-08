import LogoButton from '@/components/LogoButton';
import HeaderNavMenu from '@/components/HeaderNavMenu';
import HeaderUserMenu from '@/components/HeaderUserMenu';
import { useAuthStore } from '@/stores/useAuthStore';

const MainHeader = () => {
  const isLogin = useAuthStore((state) => state.isLogin);

  return (
    <header className="w-full h-[116px] bg-white sticky top-0 z-10">
      <LogoButton />
      <HeaderNavMenu />
      <HeaderUserMenu isLogin={isLogin} />
    </header>
  );
};

export default MainHeader;
