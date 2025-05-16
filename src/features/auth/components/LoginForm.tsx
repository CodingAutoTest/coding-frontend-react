import { useState } from 'react';
import InputField from './InputField';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import SingleCheckbox from './SingleCheckbox';
import { useAgreementStore } from '../stores/useAgreementStore';
import { login } from '../api/getAuth';
import axios from 'axios';
import { useAuthStore } from '@/stores/useAuthStore';

export function LoginForm() {
  const { marketing, toggleMarketing } = useAgreementStore();
  const navigate = useNavigate();
  const checkToken = useAuthStore((state) => state.checkToken);

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !pw) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      await login({ email, pw });
      checkToken();
      navigate('/');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data || '로그인 실패');
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin();
  };

  return (
    <div className="w-[49%] ml-auto bg-white rounded-l-3xl shadow-2xl flex items-center justify-center px-12">
      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-10 text-base">
        <h2 className="text-3xl font-bold text-center">CAT 로그인</h2>

        <div className="flex flex-col gap-5">
          <InputField
            icon={<FaUser />}
            placeholder="아이디 / 이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            icon={<FaLock />}
            placeholder="비밀번호"
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 text-base">
          <SingleCheckbox checked={marketing} onChange={toggleMarketing} label="로그인 상태 유지" />
        </div>

        <button
          type="submit"
          className="w-full bg-[#6D89F6] text-white py-3 rounded-md hover:bg-[#5c75e4] transition text-base"
        >
          로그인
        </button>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <hr className="my-2" />

        <div className="text-sm text-gray-600 flex flex-col items-start gap-4">
          <Link to="/reset-password" className="text-blue-500 hover:underline">
            비밀번호 재설정
          </Link>
          <Link to="/signup" className="hover:underline">
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
}
