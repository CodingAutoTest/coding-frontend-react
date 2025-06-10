import React, { useState, useEffect } from 'react';
import AlgorithmButton from './AlgorithmButton';
import SearchBar from '@/components/SearchBar';
import { FilterOption } from '../types/filter';

type AlgorithmPopupProps = {
  isOpen: boolean;
  options: FilterOption<number>[];
  selectedValue: number;
  onChange: (value: number) => void;
  onClose: () => void;
  onApply: (value: number) => void;
  isLoading?: boolean;
};

const AlgorithmPopup = ({
  isOpen,
  options,
  selectedValue,
  onChange,
  onClose,
  onApply,
  isLoading = false,
}: AlgorithmPopupProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    const filtered =
      !searchValue || searchValue.trim() === ''
        ? options
        : options.filter((option) => option.text.toLowerCase().includes(searchValue.toLowerCase()));
    setFilteredOptions(filtered);
  }, [searchValue, options]);

  if (!isOpen) return null;

  const handleChange = (value: number) => {
    onChange(value === selectedValue ? 0 : value);
  };

  const handleOverlayClick = () => {
    onClose();
  };

  const handlePopupClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleApply = () => {
    onApply(selectedValue);
    onClose();
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-DISABLED">로딩 중...</div>
        </div>
      );
    }

    if (filteredOptions.length === 0) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-DISABLED">검색 결과가 없습니다.</div>
        </div>
      );
    }

    return filteredOptions.map((option) => (
      <AlgorithmButton
        key={option.value}
        text={option.text}
        value={option.value}
        selectedValue={selectedValue}
        onChange={handleChange}
      />
    ));
  };

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-40"
      onClick={handleOverlayClick}
    >
      <div
        className="relative flex flex-col items-center justify-start w-[523px] h-auto gap-5 px-6 py-5 bg-white rounded-[26px] shadow-[0px_13px_61px_0px_rgba(169,169,169,0.37)]"
        onClick={handlePopupClick}
      >
        <header className="inline-flex items-center justify-between w-full">
          <div className="text-lg font-bold text-DEFAULT font-nunito-sans">알고리즘 선택</div>
          <SearchBar
            placeholder="알고리즘 검색"
            icon={false}
            width="310px"
            onSearch={setSearchValue}
            debounceTime={300}
            value={searchValue}
          />
        </header>

        <main className="flex flex-wrap content-start items-start justify-start w-full h-[434px] gap-4 overflow-y-auto scrollbar-hide">
          {renderContent()}
        </main>

        <div className="w-full">
          <svg
            width="100%"
            height="2"
            viewBox="0 0 523 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.5"
              d="M1 1H522"
              stroke="#979797"
              strokeWidth="0.4"
              strokeLinecap="square"
            />
          </svg>
        </div>

        <button
          onClick={handleApply}
          className="flex items-center justify-center w-[129px] h-[34px] gap-2.5 px-[53px] py-[9px] text-xs font-bold text-center text-white bg-PRIMARY rounded-md font-nunito-sans"
        >
          적용
        </button>
      </div>
    </div>
  );
};

export default AlgorithmPopup;
