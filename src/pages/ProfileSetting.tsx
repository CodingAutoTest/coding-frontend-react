// src/pages/profile-setting.tsx
import { FC, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainHeader from '@/components/MainHeader';

import FileUpload from '@/features/profile-setting/components/FileUpload';
import TextInput from '@/features/profile-setting/components/TextInput';
import ActionButton from '@/features/profile-setting/components/ActionButton';
import ConfirmSection from '@/features/profile-setting/components/InfoAction';

import {
  modifyProfile,
  uploadImages,
  changePassword,
  removeUser,
} from '@/features/profile-setting/api/userSettingApi';

import defaultProfileImg from '@/assets/images/profileSetting.png';
import defaultBgImg from '@/assets/images/backgroundSetting.png';

const ProfileSettingPage: FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const id = Number(userId);
  const navigate = useNavigate();

  // preview + uploaded-url state
  const [profilePreview, setProfilePreview] = useState(defaultProfileImg);
  const [bgPreview, setBgPreview] = useState(defaultBgImg);
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');

  // form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  // 배경 업로드 처리
  const handleBgFile = (file: File) => {
    setBgPreview(URL.createObjectURL(file));
    uploadImages(id, undefined, file).then((dto) => {
      if (dto.backgroundImageUrl) {
        setBackgroundImageUrl(dto.backgroundImageUrl);
      }
    });
  };

  // 프로필 업로드 처리
  const handleProfileFile = (file: File) => {
    setProfilePreview(URL.createObjectURL(file));
    uploadImages(id, file, undefined).then((dto) => {
      if (dto.profileImageUrl) {
        setProfileImageUrl(dto.profileImageUrl);
      }
    });
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setProfilePreview(defaultProfileImg);
    setBgPreview(defaultBgImg);
    setProfileImageUrl('');
    setBackgroundImageUrl('');
  };

  const handleSubmitProfile = () => {
    modifyProfile(id, {
      name,
      email,
      profileImageUrl,
      backgroundImageUrl,
    }).then(() => {
      alert('프로필 수정 완료');
    });
  };

  const handlePwChange = () => {
    if (newPw !== confirmPw) {
      alert('비밀번호 확인이 일치하지 않습니다.');
      return;
    }
    changePassword(id, {
      currentPassword: currentPw,
      newPassword: newPw,
    }).then(() => {
      alert('비밀번호 변경 완료');
      setCurrentPw('');
      setNewPw('');
      setConfirmPw('');
    });
  };

  const handleDelete = () => {
    if (!window.confirm('정말 계정을 삭제하시겠습니까?')) return;
    removeUser(id).then(() => {
      alert('계정 삭제 완료');
      navigate('/');
    });
  };

  const handlePremium = () => {
    navigate('/premium');
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center gap-8 bg-neutral-100">
      <MainHeader />

      {/* 기본 정보 */}
      <section className="flex w-[912px] flex-col gap-5 rounded-2xl bg-white p-6 shadow-md">
        <h2 className="text-xl font-bold text-neutral-800">기본 정보</h2>

        <FileUpload
          id="bg-upload"
          label="배경사진"
          previewUrl={bgPreview}
          onFileChange={handleBgFile}
          containerClasses="h-44 w-full"
        />
        <FileUpload
          id="profile-upload"
          label="프로필 사진"
          previewUrl={profilePreview}
          onFileChange={handleProfileFile}
          containerClasses="h-16 w-16"
        />

        <TextInput
          label="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Please enter your username"
        />

        <div className="mt-4 flex gap-3">
          <ActionButton
            text="프로필 수정"
            onClick={handleSubmitProfile}
            className="h-10 w-28 bg-indigo-600"
          />
          <ActionButton text="초기화" onClick={resetForm} className="h-10 w-24 bg-zinc-400" />
        </div>
      </section>

      {/* 비밀번호 변경 */}
      <section className="flex w-[912px] flex-col gap-5 rounded-2xl bg-white p-6 shadow-md">
        <h2 className="text-xl font-bold text-neutral-800">비밀번호 변경</h2>
        <TextInput
          label="현재 비밀번호"
          type="password"
          value={currentPw}
          onChange={(e) => setCurrentPw(e.target.value)}
        />
        <TextInput
          label="비밀번호"
          type="password"
          value={newPw}
          onChange={(e) => setNewPw(e.target.value)}
          placeholder="영문, 숫자, 특수문자 포함 8~20자"
        />
        <TextInput
          label="비밀번호 확인"
          type="password"
          value={confirmPw}
          onChange={(e) => setConfirmPw(e.target.value)}
        />
        <div className="mt-2 flex gap-3">
          <ActionButton
            text="비밀번호 변경"
            onClick={handlePwChange}
            className="h-10 w-28 bg-indigo-600"
          />
          <ActionButton
            text="취소"
            onClick={() => {
              setCurrentPw('');
              setNewPw('');
              setConfirmPw('');
            }}
            className="h-10 w-24 bg-zinc-400"
          />
        </div>
      </section>

      {/* 계정 삭제 */}
      <ConfirmSection
        title="계정 삭제"
        description="계정 삭제 시 프로필 및 풀이 정보가 삭제됩니다."
        buttonText="계정 삭제"
        onClick={handleDelete}
      />

      {/* 프리미엄 (아래쪽 마진 10) */}
      <div className="mb-10">
        <ConfirmSection
          title="프리미엄"
          description="프리미엄을 구독하여 다양한 혜택을 이용해 보세요!"
          buttonText="구독하기"
          onClick={handlePremium}
        />
      </div>
    </main>
  );
};

export default ProfileSettingPage;
