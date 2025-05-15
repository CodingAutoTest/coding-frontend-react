import HeaderNavButton from './HeaderNavButton';
import { useNavigate } from 'react-router-dom';

const HeaderNavMenu = () => {
  const navigate = useNavigate();
  return (
    <div className="left-[21.39%] h-full whitespace-nowrap my-auto absolute inline-flex justify-start items-center gap-[52px]">
      <HeaderNavButton
        text="문제"
        color="text-DEFAULT"
        onClick={() => {
          navigate('/problems');
          window.location.reload();
        }}
      />
      <HeaderNavButton text="클래스" color="text-DISABLED" disabled />
      <HeaderNavButton
        text="랭킹"
        color="text-DEFAULT"
        onClick={() => {
          navigate('/rankings');
          window.location.reload();
        }}
      />
      <HeaderNavButton text="실전테스트" color="text-DISABLED" disabled />
    </div>
  );
};

export default HeaderNavMenu;
