// src/features/profile-setting/components/TextInput.tsx
import { FC, ChangeEvent } from 'react';

type Props = {
  label: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const TextInput: FC<Props> = ({ label, type = 'text', value, onChange, placeholder }) => (
  <label className="flex flex-col gap-1">
    <span className="font-medium text-gray-600">{label}</span>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="h-10 rounded border border-gray-200 bg-slate-100 px-4"
    />
  </label>
);

export default TextInput;
