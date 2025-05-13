import { api, unwrap } from '@/lib/axios';

export interface UserProfileResponse {
  name: string;
  rating: number;
  solvedCount: number;
  profileImage: string; // 백엔드가 주는 순수 path
  backgroundImage: string | null;
  tierCount: Record<number, number>;
  tagCount: Record<string, number>;
  solvedCountByDate: Record<string, number>;
}

/** 내 프로필 조회 – userId는 JWT 안에서 해결되므로 필요 없음 */
export const getUserProfile = async () => {
  // 1) 통신
  const dto = await api.get('/users/profile').then((res) => unwrap<UserProfileResponse>(res));

  return {
    ...dto,
    profileImage: dto.profileImage ? `http://127.0.0.1:8080${dto.profileImage}` : '',
    backgroundImage: dto.backgroundImage ? `http://127.0.0.1:8080${dto.backgroundImage}` : null,
  };
};
