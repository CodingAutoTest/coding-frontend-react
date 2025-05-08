import { LabeledInputProps } from '../types/components.types';

export default function LabeledInput({
  icon,
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
}: LabeledInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center border border-gray-300 rounded-md px-4 py-3">
        <div className="text-gray-400 mr-3">{icon}</div>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full outline-none"
        />
      </div>
    </div>
  );
}
