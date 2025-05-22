// src/features/profile-setting/components/TextInput.tsx
import { FC, ChangeEvent } from 'react';

type Props = {
  label: string;
  type?: 'text' | 'password' | 'email';
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
};

const TextInput: FC<Props> = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error,
}) => (
  <label className="flex flex-col gap-1">
    <span className="font-medium text-gray-600">{label}</span>

    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`
        h-10 rounded px-4
        bg-slate-100
        border ${error ? 'border-red-500' : 'border-gray-200'}
        focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-400' : 'focus:ring-indigo-500'}
      `}
    />

    {/* 에러 메시지 */}
    {error && <p className="mt-0.5 text-xs text-red-500">{error}</p>}
  </label>
);

export default TextInput;
