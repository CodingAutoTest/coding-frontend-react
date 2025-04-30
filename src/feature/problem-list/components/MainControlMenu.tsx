import MainFilterMenu from './MainFilterMenu';
import SearchBar from '@/components/SearchBar';

const MainControlMenu = () => {
  return (
    <div className="flex justify-between items-center">
      <MainFilterMenu />
      <SearchBar placeholder="문제 검색" />
    </div>
  );
};

export default MainControlMenu;
