import { useEffect, useState } from 'react';
import { UserType } from '../types/problem.type';

// JWT 토큰 디코딩 함수
function decodeJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

export const useUserInfo = () => {
  const [user, setUser] = useState<UserType | null>({
    name: '익명',
    profileImage: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const decoded = decodeJwt(token);
      if (!decoded) {
        throw new Error('Invalid token');
      }

      setUser({
        name: decoded.name || '익명',
        profileImage: decoded.profileImage || '',
      });
      setLoading(false);
    } catch (err) {
      console.error('Error decoding user info:', err);
      setError('사용자 정보를 불러오는데 실패했습니다.');
      setLoading(false);
    }
  }, []);

  return { user, loading, error };
};
