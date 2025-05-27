import { useState } from 'react';
import { LeftBanner } from '../components/LeftBanner';
import InputField from '../components/InputField';
import { FaEnvelope } from 'react-icons/fa';
import axios from 'axios';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (value: string) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmail(value);
    setError(isValid ? '' : '유효한 이메일 형식이 아닙니다.');
  };

  const handleReset = async () => {
    if (!email) return setError('이메일을 입력해주세요.');
    if (error) return;

    setLoading(true);
    setSuccess('');
    try {
      await axios.post('/auth/reset-password', { email });
      setSuccess('비밀번호 재설정 메일이 전송되었습니다.');
      setError('');
    } catch (err: any) {
      setSuccess('');
      setError(err.response?.data || '메일 전송 중 오류 발생');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#4B61D1]">
      <LeftBanner title="CAT" subtitle="codingAutoTest입니다" />

      <div className="w-[49%] ml-auto bg-white rounded-l-3xl shadow-2xl flex items-center justify-center px-12 py-16">
        <div className="w-full max-w-md flex flex-col text-base space-y-[30px]">
          {/* 제목 */}
          <h2 className="text-3xl font-bold text-center">비밀번호 재설정</h2>

          {/* 설명 */}
          <p className="text-sm text-gray-500 text-center leading-relaxed">
            비밀번호를 재설정할 이메일을 입력해주세요. <br />
            입력된 메일로 자세한 사항을 보내드립니다.
          </p>

          {/* 입력 필드 */}
          <InputField
            icon={<FaEnvelope />}
            placeholder="이메일을 입력해주세요."
            type="email"
            value={email}
            onChange={(e) => validateEmail(e.target.value)}
          />

          {/* 에러 및 성공 메시지 */}
          <div>
            {error && <p className="text-red-500 text-sm mb-2 ml-1">{error}</p>}
            {success && <p className="text-green-500 text-sm mb-2 ml-1">{success}</p>}
          </div>

          {/* 버튼 */}
          <button
            onClick={handleReset}
            disabled={loading}
            className="w-full bg-[#6D89F6] text-white py-3 rounded-md hover:bg-[#5c75e4] transition text-base disabled:opacity-50"
          >
            {loading ? '메일 전송 중...' : '비밀번호 재설정 메일 보내기'}
          </button>
        </div>
      </div>
    </div>
  );
}
