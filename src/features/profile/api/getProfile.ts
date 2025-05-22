// src/features/profile/api/getProfile.ts
import { api, unwrap } from '@/lib/axios';

export interface UserProfileResponse {
  name: string;
  rating: number;
  solvedCount: number;
  profileImage: string;
  backgroundImage: string | null;
  tierCount: Record<number, number>;
  tagCount: Record<string, number>;
  solvedCountByDate: Record<string, number>;
}

const FILE_BASE = 'http://127.0.0.1:8080';

/** 공통: 이미지 URL 보정 */
const normalize = (dto: UserProfileResponse): UserProfileResponse => ({
  ...dto,
  profileImage: dto.profileImage ? `${FILE_BASE}${dto.profileImage}` : '',
  backgroundImage: dto.backgroundImage ? `${FILE_BASE}${dto.backgroundImage}` : null,
});

/* ------------------------------------------------------------------ */
/** 1) 내 프로필 조회 – JWT 에서 userId 주입                                     */
export const getUserProfile = async () => {
  const dto = await api.get('/users/profile').then(unwrap<UserProfileResponse>);
  return normalize(dto);
};

/* ------------------------------------------------------------------ */
/** 2) 다른 유저 프로필 조회 – userName 으로 검색                             */
export const getUserProfileByName = async (userName: string) => {
  const dto = await api
    .get(`/users/profile/${encodeURIComponent(userName)}`)
    .then(unwrap<UserProfileResponse>);
  return normalize(dto);
};
