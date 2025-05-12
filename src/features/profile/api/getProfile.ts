// src/features/profile/api/get-user-profile.ts
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

export const getUserProfile = async () => {
  const response = await api.get(`/users/profile`);
  return unwrap<UserProfileResponse>(response);
};
