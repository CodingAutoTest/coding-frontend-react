import uncheckedIcon from '@/assets/problem-list/unchecked-icon.svg';
import checkedIcon from '@/assets/problem-list/checked-icon.svg';

type DropdownMenuProps<T extends string> = {
  text: string;
  value: T;
  selectedValue: T;
  onChange: (value: T) => void;
};

const DropdownMenu = <T extends string>({
  text,
  value,
  selectedValue,
  onChange,
}: DropdownMenuProps<T>) => {
  const isChecked = value === selectedValue;

  const handleClick = () => {
    if (isChecked) {
      onChange('' as T);
    } else {
      onChange(value);
    }
  };

  return (
    <button
      role="radio"
      aria-checked={isChecked}
      className="w-auto inline-flex gap-2.5 items-center"
      onClick={handleClick}
    >
      <img
        src={isChecked ? checkedIcon : uncheckedIcon}
        alt={isChecked ? '선택됨' : '선택되지 않음'}
      />
      <div className="text-DEFAULT text-sm font-medium font-nunito-sans">{text}</div>
    </button>
  );
};

export default DropdownMenu;
