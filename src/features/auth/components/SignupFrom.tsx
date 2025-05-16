import { useState } from 'react';
import { FaEnvelope, FaLock, FaPen } from 'react-icons/fa';
import LabeledInput from './LabeledInput';
import SingleCheckbox from './SingleCheckbox';
import { useAgreementStore } from '../stores/useAgreementStore';
import { signup } from '../api/getAuth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function SignupForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [pwError, setPwError] = useState('');
  const [rePwError, setRePwError] = useState('');

  const {
    allChecked,
    terms,
    privacy,
    marketing,
    toggleAll,
    toggleTerms,
    togglePrivacy,
    toggleMarketing,
  } = useAgreementStore();

  const validateEmail = (value: string) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmailError(isValid ? '' : '유효한 이메일 형식이 아닙니다.');
    setEmail(value);
  };

  const validatePassword = (value: string) => {
    const isValid = value.length >= 8;
    setPwError(isValid ? '' : '비밀번호는 최소 8자 이상이어야 합니다.');
    setPw(value);
  };

  const validateRePassword = (value: string) => {
    setRePwError(value !== pw ? '비밀번호가 일치하지 않습니다.' : '');
    setRePassword(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !pw || !rePassword || !name) return;
    if (!terms || !privacy) {
      setError('필수 항목에 동의해주세요.');
      return;
    }
    if (emailError || pwError || rePwError) return;

    setLoading(true);
    setError('');

    try {
      await signup({ email, pw, name });
      navigate('/login');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const errorMsg = err.response?.data;
        setError(typeof errorMsg === 'string' ? errorMsg : '회원가입 실패');
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[49%] ml-auto bg-white rounded-l-3xl shadow-2xl flex items-center justify-center px-12 py-16">
      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-6 text-base">
        <h2 className="text-3xl font-bold text-center">CAT 회원가입</h2>

        <div className="flex flex-col gap-4">
          <LabeledInput
            icon={<FaEnvelope />}
            label="이메일"
            placeholder="이메일을 입력해주세요"
            type="email"
            value={email}
            onChange={(e) => validateEmail(e.target.value)}
          />
          {emailError && <p className="text-red-500 text-sm mt-[-10px] ml-1">{emailError}</p>}

          <LabeledInput
            icon={<FaLock />}
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            type="password"
            value={pw}
            onChange={(e) => validatePassword(e.target.value)}
          />
          {pwError && <p className="text-red-500 text-sm mt-[-10px] ml-1">{pwError}</p>}

          <LabeledInput
            icon={<FaLock />}
            label="비밀번호 확인"
            placeholder="비밀번호를 재입력해주세요"
            type="password"
            value={rePassword}
            onChange={(e) => validateRePassword(e.target.value)}
          />
          {rePwError && <p className="text-red-500 text-sm mt-[-10px] ml-1">{rePwError}</p>}

          <LabeledInput
            icon={<FaPen />}
            label="이름"
            placeholder="이름을 입력해주세요"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-4 text-sm text-gray-700">
          <SingleCheckbox checked={terms} onChange={toggleTerms} label="이용약관 동의" />
          <SingleCheckbox
            checked={privacy}
            onChange={togglePrivacy}
            label="개인정보 수집 및 이용 동의"
            highlight
          />
          <SingleCheckbox
            checked={marketing}
            onChange={toggleMarketing}
            label="마케팅 활용 동의 및 광고 수신 동의"
          />
          <hr className="my-2 border-gray-300" />
          <SingleCheckbox checked={allChecked} onChange={toggleAll} label="전체 동의" />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#6D89F6] text-white py-3 rounded-md hover:bg-[#5c75e4] transition text-lg disabled:opacity-50"
        >
          {loading ? '처리 중...' : '회원가입'}
        </button>

        {error && <p className="text-sm text-red-500 text-center mt-2">{error}</p>}
      </form>
    </div>
  );
}
