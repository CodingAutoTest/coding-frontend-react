import { SingleCheckboxProps } from '../types/components.types';

export default function SingleCheckbox({
  checked,
  onChange,
  label,
  highlight = false,
}: SingleCheckboxProps) {
  return (
    <label className="flex items-center gap-2">
      <input type="checkbox" checked={checked} onChange={onChange} />
      {highlight ? (
        <span className="text-red-500 font-semibold">{label}</span>
      ) : (
        <span>{label}</span>
      )}
    </label>
  );
}
