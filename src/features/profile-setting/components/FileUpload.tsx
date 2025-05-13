// src/features/profile-setting/components/FileUpload.tsx
import { FC } from 'react';

type FileUploadProps = {
  id: string;
  label: string;
  previewUrl: string;
  onFileChange: (file: File) => void;
  containerClasses?: string;
};

const FileUpload: FC<FileUploadProps> = ({
  id,
  label,
  previewUrl,
  onFileChange,
  containerClasses = '',
}) => {
  return (
    <div className="flex flex-col gap-2">
      {/* 레이블 클릭만으로 파일 선택창이 열립니다 */}
      <span className="font-medium text-gray-600">{label}</span>
      <label htmlFor={id} className={`cursor-pointer overflow-hidden ${containerClasses}`}>
        <img
          src={previewUrl}
          alt={`${label} 미리보기`}
          className="h-full w-full object-cover rounded-xl"
        />
      </label>
      <input
        id={id}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileChange(file);
        }}
      />
    </div>
  );
};

export default FileUpload;
