import React, { useState, useEffect } from 'react';
import AlgorithmButton from './AlgorithmButton';
import SearchBar from '@/components/SearchBar';

type AlgorithmButtonProps = {
  isOpen: boolean;
  options: {
    text: string;
    value: number;
  }[];
  selectedValue: number;
  onChange: (value: number) => void;
  onClose: () => void;
  onApply: (value: number) => void;
  isLoading?: boolean;
  onSearch: (value: string) => void;
};

const AlgorithmPopup = ({
  isOpen,
  options,
  selectedValue,
  onChange,
  onClose,
  onApply,
  isLoading = false,
  onSearch,
}: AlgorithmButtonProps) => {
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue, onSearch]);

  if (!isOpen) return null;

  const handleChange = (value: number) => {
    if (value === selectedValue) {
      onChange(0);
    } else {
      onChange(value);
    }
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

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-40"
      onClick={handleOverlayClick}
    >
      <div
        className="relative flex flex-col items-center justify-start w-[521px] h-auto gap-5 px-6 py-5 bg-white rounded-[26px] shadow-[0px_13px_61px_0px_rgba(169,169,169,0.37)]"
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
          />
        </header>

        <main className="flex flex-wrap content-start items-start justify-start w-full h-[434px] gap-4 overflow-y-auto scrollbar-hide">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-DISABLED">로딩 중...</div>
            </div>
          ) : options.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-DISABLED">검색 결과가 없습니다.</div>
            </div>
          ) : (
            options.map((option) => (
              <AlgorithmButton
                key={option.value}
                text={option.text}
                value={option.value}
                selectedValue={selectedValue}
                onChange={handleChange}
              />
            ))
          )}
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
