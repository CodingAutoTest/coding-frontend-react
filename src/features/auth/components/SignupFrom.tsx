import { useState } from 'react';
import { FaEnvelope, FaLock, FaPen } from 'react-icons/fa';
import LabeledInput from './LabeledInput';
import SingleCheckbox from './SingleCheckbox';
import { useAgreementStore } from '../stores/useAgreementStore';
import { useSignup } from '../hooks/useSignup';
import { useNavigate } from 'react-router-dom';

export function SignupForm() {
  const navigate = useNavigate();
  const { mutate, loading, error } = useSignup();

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [name, setName] = useState('');

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

  const handleSubmit = () => {
    if (!email || !pw || !rePassword || !name) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    if (pw !== rePassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!terms || !privacy) {
      alert('필수 항목에 동의해주세요.');
      return;
    }

    mutate({ email, pw, name: name }, () => {
      alert('회원가입에 성공하셨습니다!');
      navigate('/login');
    });
  };

  return (
    <div className="w-[49%] ml-auto bg-white rounded-l-3xl shadow-2xl flex items-center justify-center px-12 py-16">
      <div className="w-full max-w-md flex flex-col gap-8 text-base">
        <h2 className="text-3xl font-bold text-center">CAT 회원가입</h2>

        <div className="flex flex-col gap-4">
          <LabeledInput
            icon={<FaEnvelope />}
            label="이메일"
            placeholder="이메일을 입력해주세요"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <LabeledInput
            icon={<FaLock />}
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
          <LabeledInput
            icon={<FaLock />}
            label="비밀번호 확인"
            placeholder="비밀번호를 재입력해주세요"
            type="password"
            onChange={(e) => setRePassword(e.target.value)}
          />
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
            highlight
          />

          <hr className="my-2 border-gray-300" />

          <SingleCheckbox checked={allChecked} onChange={toggleAll} label="전체 동의" />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#6D89F6] text-white py-3 rounded-md hover:bg-[#5c75e4] transition text-lg disabled:opacity-50"
        >
          {loading ? '처리 중...' : '회원가입'}
        </button>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
}
