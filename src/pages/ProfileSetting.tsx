import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MainHeader from '@/components/MainHeader';
import FileUpload from '@/features/profile-setting/components/FileUpload';
import TextInput from '@/features/profile-setting/components/TextInput';
import ActionButton from '@/features/profile-setting/components/ActionButton';
import ConfirmSection from '@/features/profile-setting/components/InfoAction';
import Modal, { ModalKind } from '@/features/profile-setting/components/Modal';
import UserDeleteModal from '@/features/profile-setting/components/UserDeleteModal';

import {
  modifyProfile,
  uploadImages,
  changePassword,
  removeUser,
} from '@/features/profile-setting/api/userSettingApi';

import defaultProfileImg from '@/assets/images/profileSetting.png';
import defaultBgImg from '@/assets/images/backgroundSetting.png';

/* ─────────────────────────────────────────────────────────── */
const ProfileSettingPage: FC = () => {
  const nav = useNavigate();

  /* ---------- 미리보기 ---------- */
  const [profilePreview, setProfilePreview] = useState(defaultProfileImg);
  const [bgPreview, setBgPreview] = useState(defaultBgImg);

  /* ---------- 업로드 URL ---------- */
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');

  /* ---------- 폼 값 ---------- */
  const [name, setName] = useState('');
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  /* ---------- 필드별 에러 ---------- */
  const [nameError, setNameError] = useState('');
  const [currentPwError, setCurrentPwError] = useState('');
  const [newPwError, setNewPwError] = useState('');
  const [confirmPwError, setConfirmPwError] = useState('');

  /* ---------- 모달 ---------- */
  const [modal, setModal] = useState<{ open: boolean; kind: ModalKind; msg: string }>({
    open: false,
    kind: 'loading',
    msg: '',
  });
  const show = (kind: ModalKind, msg = '') => setModal({ open: true, kind, msg });
  const hide = () => setModal((m) => ({ ...m, open: false }));

  /* =========================================================
     이미지 업로드
  ========================================================= */
  const handleBgFile = (file: File) => {
    setBgPreview(URL.createObjectURL(file));
    uploadImages(undefined, file).then(
      (dto) => dto?.backgroundImageUrl && setBackgroundImageUrl(dto.backgroundImageUrl),
    );
  };

  const handleProfileFile = (file: File) => {
    setProfilePreview(URL.createObjectURL(file));
    uploadImages(file).then(
      (dto) => dto?.profileImageUrl && setProfileImageUrl(dto.profileImageUrl),
    );
  };

  /* =========================================================
     프로필 수정
  ========================================================= */
  const handleSubmitProfile = async () => {
    // ❶ 세 항목 모두 비어 있으면 중단
    if (!name.trim() && !profileImageUrl && !backgroundImageUrl) {
      show('info', '변경된 내용이 없습니다.');
      return;
    }

    // ❷ 서버에 보낼 DTO – 비어 있는 값은 제거
    const payload = {
      ...(name.trim() && { name: name.trim() }),
      ...(profileImageUrl && { profileImageUrl }),
      ...(backgroundImageUrl && { backgroundImageUrl }),
    };

    show('loading', '프로필을 수정 중입니다…');

    try {
      await modifyProfile(payload);
      show('success', '프로필이 수정되었습니다!');
    } catch (e: any) {
      if (e?.response?.status === 409) setNameError('사용자 이름이 중복되었습니다.');
      else show('info', '프로필 수정 중 오류가 발생했습니다.');
    }
  };

  /* =========================================================
     비밀번호 변경
  ========================================================= */
  const handlePwChange = async () => {
    // 1차 클라이언트 검증
    let invalid = false;
    if (!newPw.trim()) {
      setNewPwError('새 비밀번호를 입력해 주세요.');
      invalid = true;
    }
    if (newPw !== confirmPw) {
      setConfirmPwError('비밀번호가 일치하지 않습니다.');
      invalid = true;
    }
    if (invalid) return;

    show('loading', '비밀번호를 변경 중입니다…');

    try {
      await changePassword({ currentPassword: currentPw, newPassword: newPw });
      show('success', '비밀번호가 변경되었습니다!');
      setCurrentPw('');
      setNewPw('');
      setConfirmPw('');
    } catch (e: any) {
      if (e?.response?.status === 400) setCurrentPwError('현재 비밀번호가 일치하지 않습니다.');
      else show('info', '비밀번호 변경 중 오류가 발생했습니다.');
    }
  };

  /* ===== 비밀번호 onChange 헬퍼 ===== */
  const handleNewPwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setNewPw(val);

    // 길이 검사
    if (val.length < 8) setNewPwError('비밀번호를 8자리 이상 입력하세요.');
    else setNewPwError('');

    // 일치 검사 (확인 칸이 이미 입력돼 있을 때)
    if (confirmPw && val !== confirmPw) setConfirmPwError('비밀번호가 일치하지 않습니다.');
    else setConfirmPwError('');
  };

  const handleConfirmPwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setConfirmPw(val);

    if (val !== newPw) setConfirmPwError('비밀번호가 일치하지 않습니다.');
    else setConfirmPwError('');
  };

  /* =========================================================
     계정 삭제
  ========================================================= */
  const [delOpen, setDelOpen] = useState(false);

  const confirmDelete = () => {
    show('loading', '계정을 삭제하는 중입니다…');
    removeUser()
      .then(() => {
        show('success', '계정이 삭제되었습니다.');
        nav('/');
      })
      .catch(() => show('info', '계정 삭제 중 오류가 발생했습니다.'))
      .finally(() => {
        setDelOpen(false);
      });
  };

  /* ========================================================= */
  return (
    <main className="flex min-h-screen flex-col items-center gap-8 bg-neutral-100">
      <MainHeader />

      {/* ================= 기본 정보 ================= */}
      <section className="w-[912px] rounded-2xl bg-white p-6 shadow-md flex flex-col gap-5">
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
          onChange={(e) => {
            setName(e.target.value);
            setNameError('');
          }}
          placeholder="Please enter your username"
          error={nameError}
        />

        <div className="mt-4 flex gap-3">
          <ActionButton
            text="프로필 수정"
            onClick={handleSubmitProfile}
            className="h-10 w-28 bg-indigo-600"
          />
          <ActionButton
            text="초기화"
            onClick={() => {
              setName('');
              setProfilePreview(defaultProfileImg);
              setBgPreview(defaultBgImg);
              setProfileImageUrl('');
              setBackgroundImageUrl('');
              setNameError('');
            }}
            className="h-10 w-24 bg-zinc-400"
          />
        </div>
      </section>

      {/* ================= 비밀번호 변경 ================= */}
      <section className="w-[912px] rounded-2xl bg-white p-6 shadow-md flex flex-col gap-5">
        <h2 className="text-xl font-bold text-neutral-800">비밀번호 변경</h2>

        <TextInput
          label="현재 비밀번호"
          type="password"
          value={currentPw}
          onChange={(e) => {
            setCurrentPw(e.target.value);
            setCurrentPwError('');
          }}
          error={currentPwError}
        />

        <TextInput
          label="비밀번호"
          type="password"
          value={newPw}
          onChange={handleNewPwChange}
          placeholder="영문, 숫자, 특수문자 포함 8~20자"
          error={newPwError}
        />

        <TextInput
          label="비밀번호 확인"
          type="password"
          value={confirmPw}
          onChange={handleConfirmPwChange}
          error={confirmPwError}
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
              setCurrentPwError('');
              setNewPwError('');
              setConfirmPwError('');
            }}
            className="h-10 w-24 bg-zinc-400"
          />
        </div>
      </section>

      {/* ================= 계정 삭제 ================= */}
      <ConfirmSection
        title="계정 삭제"
        description="계정 삭제 시 프로필 및 풀이 정보가 삭제됩니다."
        buttonText="계정 삭제"
        onClick={() => setDelOpen(true)}
      />

      {/* ================= 프리미엄 ================= */}
      <div className="mb-10">
        <ConfirmSection
          title="프리미엄"
          description="프리미엄을 구독하여 다양한 혜택을 이용해 보세요!"
          buttonText="구독하기"
          onClick={() => nav('/premium')}
        />
      </div>

      {/* ---------------- 공통 모달 ---------------- */}
      <Modal open={modal.open} kind={modal.kind} message={modal.msg} onClose={hide} />

      {/* ---------------- 계정 삭제 확인 모달 ---------------- */}
      <UserDeleteModal open={delOpen} onClose={() => setDelOpen(false)} onConfirm={confirmDelete} />
    </main>
  );
};

export default ProfileSettingPage;
