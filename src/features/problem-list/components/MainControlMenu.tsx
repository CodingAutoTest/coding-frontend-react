import MainFilterMenu from './MainFilterMenu';
import SearchBar from '@/components/SearchBar';
import { useFilterStore } from '../stores/useFilterStore';

const MainControlMenu = () => {
  const { setSearch } = useFilterStore();

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  return (
    <div className="flex justify-between items-center gap-[20px]">
      <MainFilterMenu />
      <SearchBar placeholder="문제 검색" onSearch={handleSearch} debounceTime={300} />
    </div>
  );
};

export default MainControlMenu;
