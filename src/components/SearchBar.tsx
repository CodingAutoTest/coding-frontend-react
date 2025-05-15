import { useState, useEffect } from 'react';
import searchIcon from '@/assets/problem-list/search-icon.svg';

type SearchBarProps = {
  placeholder: string;
  onSearch: (value: string) => void;
  icon?: boolean;
  width?: string;
  debounceTime?: number;
};

const SearchBar = ({
  placeholder,
  onSearch,
  icon = true,
  width = '407px',
  debounceTime = 300,
}: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchValue);
    }, debounceTime);

    return () => clearTimeout(timer);
  }, [searchValue, onSearch, debounceTime]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div
      style={{ width }}
      className="h-[38px] px-[17px] py-[9px] bg-[#f5f6fa] rounded-[19px] outline outline-[0.60px] outline-offset-[-0.60px] outline-neutral-300 inline-flex justify-start items-center gap-3.5"
    >
      {icon && <img src={searchIcon} className="w-4 h-4" />}
      <input
        type="text"
        value={searchValue}
        onChange={handleChange}
        draggable={false}
        placeholder={placeholder}
        className="w-full bg-transparent text-DEFAULT text-sm font-normal font-nunito-sans focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
