import { useEffect, useState } from 'react';
import { getUserProfile, UserProfileResponse } from '@/features/profile/api/getProfile';

const useUserProfile = (userId: number | null) => {
  const [profile, setProfile] = useState<UserProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ❶ userId가 null이면 즉시 종료
    if (userId === null) {
      setLoading(false);
      setError('잘못된 접근입니다.');
      return;
    }

    (async () => {
      try {
        const data = await getUserProfile(userId);
        setProfile(data);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : '프로필 정보를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  return { profile, loading, error };
};

export default useUserProfile;
