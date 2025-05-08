import { InputFieldProps } from '../types/components.types';

export default function InputField({
  icon,
  placeholder,
  type = 'text',
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
      <div className="text-gray-400 mr-2 text-base">{icon}</div>
      <input
        type={type}
        value={value} // ✅ 바인딩
        onChange={onChange} // ✅ 이벤트 핸들러
        placeholder={placeholder}
        className="w-full text-sm py-1 outline-none"
      />
    </div>
  );
}
