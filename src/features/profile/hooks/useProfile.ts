// src/features/profile/hooks/useProfile.ts
import { useEffect, useState } from 'react';
import {
  getUserProfile, // 내 프로필
  getUserProfileByName,
  UserProfileResponse,
} from '@/features/profile/api/getProfile';

const useUserProfile = (userName?: string) => {
  const [profile, setProfile] = useState<UserProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false; // 언마운트 race-condition 방지
    (async () => {
      setLoading(true);
      try {
        const data = userName
          ? await getUserProfileByName(userName) // ⭐ 다른 사용자
          : await getUserProfile(); // ⭐ 내 프로필
        if (!ignore) setProfile(data);
      } catch (err) {
        if (!ignore) {
          console.error(err);
          setError(err instanceof Error ? err.message : '프로필 정보를 불러오지 못했습니다.');
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [userName]);

  return { profile, loading, error };
};

export default useUserProfile;
