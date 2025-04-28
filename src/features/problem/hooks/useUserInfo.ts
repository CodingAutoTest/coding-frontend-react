import { useEffect, useState } from 'react';
import { fetchUser } from '../api/problem.api';
import { UserType } from '../types/problem.api.type';

export const useUserInfo = (userId: number) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await fetchUser(userId);
        setUser(userInfo);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user info:', err);
        setError('사용자 정보를 불러오는데 실패했습니다.');
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, [userId]);

  return { user, loading, error };
};
