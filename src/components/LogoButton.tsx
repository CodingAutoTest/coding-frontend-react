import React from 'react';
import logo from '@/assets/problem-list/logo.svg';
import { useNavigate } from 'react-router-dom';

const LogoButton = () => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/problems');
    window.location.reload();
  };

  return (
    <img
      src={logo}
      onClick={handleClick}
      className="w-[116px] h-[116px] left-[5.56%] top-0 absolute cursor-pointer"
      draggable={false}
    />
  );
};

export default LogoButton;
