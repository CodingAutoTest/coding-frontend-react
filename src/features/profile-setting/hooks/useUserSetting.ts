// src/features/profile-setting/hooks/useUserSetting.ts
import { useParams } from 'react-router-dom';
import { useCallback, useState } from 'react';

import {
  uploadImages as uploadImagesApi,
  modifyProfile as modifyProfileApi,
  changePassword as changePasswordApi,
  removeUser as removeUserApi,
} from '@/features/profile-setting/api/userSettingApi';

export const useUserSetting = () => {
  /* ------ 파라미터 & 공통 ------ */
  const { userId = '' } = useParams<'userId'>();
  /** 문자열→숫자 변환 (빈 값이면 0) */
  const numericId = Number(userId || 0);

  const [uploading, setUploading] = useState(false);

  /* ------ 1. 이미지 업로드 ------ */
  const uploadImages = useCallback(
    async (files: { profileImage?: File; backgroundImage?: File }) => {
      if (!numericId) return null; // 방어 코드
      setUploading(true);
      try {
        // API 시그니처: (userId, profileFile?, bgFile?)
        return await uploadImagesApi(numericId, files.profileImage, files.backgroundImage);
      } finally {
        setUploading(false);
      }
    },
    [numericId],
  );

  /* ------ 2. 프로필 수정 ------ */
  const modifyProfile = useCallback(
    (data: {
      name: string;
      email?: string;
      profileImageUrl?: string;
      backgroundImageUrl?: string;
    }) => {
      if (!numericId) return Promise.reject(new Error('잘못된 userId'));
      return modifyProfileApi(numericId, {
        // API 쪽 dto 타입이 모두 필수이므로 기본값 보강
        name: data.name,
        email: data.email ?? '',
        profileImageUrl: data.profileImageUrl ?? '',
        backgroundImageUrl: data.backgroundImageUrl ?? '',
      });
    },
    [numericId],
  );

  /* ------ 3. 비밀번호 변경 ------ */
  const changePassword = useCallback(
    (data: { currentPassword: string; newPassword: string }) => {
      if (!numericId) return Promise.reject(new Error('잘못된 userId'));
      return changePasswordApi(numericId, data);
    },
    [numericId],
  );

  /* ------ 4. 계정 삭제 ------ */
  const removeUser = useCallback(() => {
    if (!numericId) return Promise.reject(new Error('잘못된 userId'));
    return removeUserApi(numericId);
  }, [numericId]);

  return {
    uploading,
    uploadImages,
    modifyProfile,
    changePassword,
    removeUser,
  };
};
