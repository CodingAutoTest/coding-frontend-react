import LogoButton from '@/components/LogoButton';
import HeaderNavMenu from '@/components/HeaderNavMenu';
import HeaderUserMenu from '@/components/HeaderUserMenu';

const MainHeader = () => {
  return (
    <header className="w-full h-[116px] bg-white sticky top-0 z-10">
      <LogoButton />
      <HeaderNavMenu />
      <HeaderUserMenu />
    </header>
  );
};

export default MainHeader;
