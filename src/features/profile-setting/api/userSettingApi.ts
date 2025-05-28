import { api } from '@/lib/axios';

/* DTO */
export interface ModifyProfileDto {
  name?: string;
  profileImageUrl?: string;
  backgroundImageUrl?: string;
}
export interface UploadImageResponseDto {
  profileImageUrl: string | null;
  backgroundImageUrl: string | null;
}
export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

/* 1) 프로필 수정 */
export const modifyProfile = (dto: ModifyProfileDto) => api.post('/users/modify', dto);

/* 2) 이미지 업로드 */
export const uploadImages = (
  profileImage?: File,
  backgroundImage?: File,
): Promise<UploadImageResponseDto | null> => {
  if (!profileImage && !backgroundImage) return Promise.resolve(null);

  const form = new FormData();
  if (profileImage) form.append('profileImage', profileImage);
  if (backgroundImage) form.append('backgroundImage', backgroundImage);

  return api
    .post('/users/upload-image', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((res) => res.data.result.urls ?? null)
    .catch(() => null);
};

/* 3) 비밀번호 변경 */
export const changePassword = (dto: ChangePasswordDto) =>
  api.post<void>('/users/change-password', dto);

/* 4) 계정 삭제 */
export const removeUser = () => api.post<void>('/users/remove');

/* 5) 프리미엄 해지 */
export const savePremium = (subscribe: boolean) =>
  api.post('/users/save', { subscribe }).then(() => {});
