import React, { useState } from 'react';
import searchIcon from '@/assets/problem-list/search-icon.svg';

type SearchBarProps = {
  placeholder: string;
  icon?: boolean;
  width?: string;
  onSearch?: (value: string) => void;
};

const SearchBar = ({ placeholder, onSearch, icon = true, width = '407px' }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(searchValue);
    }
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
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className="w-full bg-transparent text-DEFAULT text-sm font-normal font-nunito-sans focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
