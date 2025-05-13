import { api, unwrap } from '@/lib/axios';

/* ───────── DTO 타입 ───────── */
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

/* ───────── API ───────── */

/** 1) 프로필 수정 */
export function modifyProfile(dto: ModifyProfileDto) {
  return api.post<void>('/users/modify', dto);
}

/** 2) 이미지 업로드 (multipart/form‑data) */
export async function uploadImages(profileImage?: File, backgroundImage?: File) {
  const form = new FormData();
  if (profileImage) form.append('profileImage', profileImage);
  if (backgroundImage) form.append('backgroundImage', backgroundImage);

  // axios 응답 전체 타입은 any 로 두고, unwrap 으로 딱 필요한 값만 꺼낸다
  const urls = await api
    .post('/users/upload-image', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((res) => unwrap<UploadImageResponseDto>(res));

  return urls; // {profileImageUrl : string|null, backgroundImageUrl : string|null}
}

/** 3) 비밀번호 변경 */
export function changePassword(dto: ChangePasswordDto) {
  return api.post<void>('/users/change-password', dto);
}

/** 4) 계정 삭제  */
export function removeUser() {
  return api.post<void>('/users/remove');
}
