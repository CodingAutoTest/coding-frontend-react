import { useEffect, useState } from 'react';
import { getUserProfile, UserProfileResponse } from '@/features/profile/api/getProfile';

const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getUserProfile();
        setProfile(data);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : '프로필 정보를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { profile, loading, error };
};

export default useUserProfile;
