import { useState } from 'react';
import { signup, SignupPayload } from '../api/getAuth';
import axios from 'axios';

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (payload: SignupPayload, onSuccess?: () => void) => {
    try {
      setLoading(true);
      setError(null);
      await signup(payload);
      onSuccess?.();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || '회원가입에 실패했습니다.');
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
}
