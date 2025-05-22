// src/features/profile-setting/hooks/useUserSetting.ts
import { useCallback, useState } from 'react';

import {
  uploadImages as uploadImagesApi,
  modifyProfile as modifyProfileApi,
  changePassword as changePasswordApi,
  removeUser as removeUserApi,
} from '@/features/profile-setting/api/userSettingApi';

export const useUserSetting = () => {
  /* ---------- 상태 ---------- */
  const [uploading, setUploading] = useState(false);

  /* ---------- 1. 이미지 업로드 ---------- */
  const uploadImages = useCallback(
    async (files: { profileImage?: File; backgroundImage?: File }) => {
      setUploading(true);
      try {
        // API 시그니처: (profileFile?, bgFile?)
        return await uploadImagesApi(files.profileImage, files.backgroundImage);
      } finally {
        setUploading(false);
      }
    },
    [],
  );

  /* ---------- 2. 프로필 수정 ---------- */
  const modifyProfile = useCallback(
    (data: { name: string; profileImageUrl?: string; backgroundImageUrl?: string }) =>
      modifyProfileApi({
        // DTO 의 모든 필드는 필수이므로 기본값 보강
        name: data.name,
        profileImageUrl: data.profileImageUrl ?? '',
        backgroundImageUrl: data.backgroundImageUrl ?? '',
      }),
    [],
  );

  /* ---------- 3. 비밀번호 변경 ---------- */
  const changePassword = useCallback(
    (data: { currentPassword: string; newPassword: string }) => changePasswordApi(data),
    [],
  );

  /* ---------- 4. 계정 삭제 ---------- */
  const removeUser = useCallback(() => removeUserApi(), []);

  /* ---------- export ---------- */
  return {
    uploading,
    uploadImages,
    modifyProfile,
    changePassword,
    removeUser,
  };
};
