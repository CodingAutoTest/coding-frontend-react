import { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

import InputField from './InputField';
import SingleCheckbox from './SingleCheckbox';

import { useAgreementStore } from '../stores/useAgreementStore';
import { useAuthStore } from '@/stores/useAuthStore';

export default function LoginForm() {
  /* 체크박스(“로그인 상태 유지”) */
  const { marketing, toggleMarketing } = useAgreementStore();

  /* 전역 인증 스토어 */
  const login = useAuthStore((s) => s.login);

  /* 라우터 이동 */
  const navigate = useNavigate();

  /* 로컬 상태 */
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');

  /* 로그인 submit */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !pw) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      await login({ email, pw }); // <-- 스토어 액션 호출
      navigate('/'); // 성공 → 홈
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그인 실패');
    }
  };

  return (
    <div className="w-[49%] ml-auto bg-white rounded-l-3xl shadow-2xl flex items-center justify-center px-12">
      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-10 text-base">
        {/* 타이틀 */}
        <h2 className="text-3xl font-bold text-center">CAT 로그인</h2>

        {/* 이메일 · 비밀번호 입력 */}
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

        {/* 로그인 상태 유지 체크 */}
        <div className="flex items-center gap-2 text-base">
          <SingleCheckbox checked={marketing} onChange={toggleMarketing} label="로그인 상태 유지" />
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          className="w-full bg-[#6D89F6] text-white py-3 rounded-md hover:bg-[#5c75e4] transition text-base"
        >
          로그인
        </button>

        {/* 에러 메시지 */}
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <hr className="my-2" />

        {/* 보조 링크 */}
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
