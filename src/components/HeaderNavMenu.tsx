import HeaderNavButton from './HeaderNavButton';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';

const HeaderNavMenu = () => {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);

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
      <HeaderNavButton
        text="클래스"
        color={
          user?.role === 'teacher' || user?.role === 'student' ? 'text-DEFAULT' : 'text-DISABLED'
        }
        disabled={!user || (user.role !== 'teacher' && user.role !== 'student')}
        onClick={() => {
          if (user?.role === 'teacher' || user?.role === 'student') {
            navigate('/class');
          }
        }}
      />
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
