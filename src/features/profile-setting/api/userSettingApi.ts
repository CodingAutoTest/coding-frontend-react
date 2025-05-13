// src/features/profile-setting/api/userSettingApi.ts
import { api } from '@/lib/axios';

export interface ModifyProfileDto {
  name: string;
  email: string;
  profileImageUrl: string;
  backgroundImageUrl: string;
}

export interface UploadImageResponseDto {
  profileImageUrl: string | null;
  backgroundImageUrl: string | null;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

/** 1) 프로필 수정 */
export function modifyProfile(userId: number, dto: ModifyProfileDto) {
  return api.post<void>(`/user/${userId}/modify`, dto);
}

/** 2) 이미지 업로드 (multipart/form-data) */
export function uploadImages(userId: number, profileImage?: File, backgroundImage?: File) {
  const form = new FormData();
  if (profileImage) form.append('profileImage', profileImage);
  if (backgroundImage) form.append('backgroundImage', backgroundImage);
  return api
    .post<UploadImageResponseDto>(`/user/${userId}/upload-image`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((res) => res.data);
}

/** 3) 비밀번호 변경 */
export function changePassword(userId: number, dto: ChangePasswordDto) {
  return api.post<void>(`/user/${userId}/change-password`, dto);
}

/** 4) 계정 삭제 */
export function removeUser(userId: number) {
  return api.post<void>(`/user/${userId}/remove`);
}
