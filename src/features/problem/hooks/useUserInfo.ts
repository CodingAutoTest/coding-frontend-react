import { useEffect, useState } from 'react';
import { UserType } from '../types/problem.type';
import { fetchMe } from '@/features/auth/api/getAuth';
export const useUserInfo = () => {
  const [user, setUser] = useState<UserType | null>({
    name: '익명',
    profileImage: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userInfo = await fetchMe();
        setUser(userInfo);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user info:', err);
        setError('사용자 정보를 불러오는데 실패했습니다.');
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  return { user, loading, error };
};
