// src/features/profile/api/get-user-profile.ts
import { api } from '@/lib/axios';

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

export const getUserProfile = async (userId: number) => {
  const res = await api.get(`/user/${userId}/profile`);
  return res.data.result.user as UserProfileResponse;
};
