import React from 'react';

type HeaderNavButtonProps = {
  text: string; // 버튼 텍스트
  color: string; // 버튼 색상
  disabled?: boolean; // 버튼 비활성화 여부
  onClick?: () => void; // 클릭 이벤트 핸들러
};

const HeaderNavButton = ({ text, color, disabled, onClick }: HeaderNavButtonProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick?.();
  };

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={`${color} font-bold font-nunito-sans`}
    >
      {text}
    </button>
  );
};

export default HeaderNavButton;
