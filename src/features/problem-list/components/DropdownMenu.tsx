import uncheckedIcon from '@/assets/problem-list/unchecked-icon.svg';
import checkedIcon from '@/assets/problem-list/checked-icon.svg';

type DropdownMenuProps = {
  text: string;
  value: string;
  selectedValue: string;
  onChange: (value: string) => void;
};

const DropdownMenu = ({ text, value, selectedValue, onChange }: DropdownMenuProps) => {
  const isChecked = value === selectedValue;

  const handleClick = () => {
    if (isChecked) {
      onChange('');
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
      <img src={isChecked ? checkedIcon : uncheckedIcon} />
      <div className="text-DEFAULT text-sm font-medium font-nunito-sans">{text}</div>
    </button>
  );
};

export default DropdownMenu;
