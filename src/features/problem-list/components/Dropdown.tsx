import { useRef } from 'react';
import DropdownMenu from './DropdownMenu';
import useClickOutside from '@/hooks/useClickOutside';

type DropdownProps = {
  isOpen: boolean;
  options: {
    text: string;
    value: string;
  }[];
  selectedValue: string;
  onChange: (value: string) => void;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLElement>;
};

const Dropdown = ({
  isOpen,
  options,
  selectedValue,
  onChange,
  onClose,
  buttonRef,
}: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside([dropdownRef, buttonRef], () => {
    if (isOpen) {
      onClose();
    }
  });

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      role="radiogroup"
      className="absolute top-[40px] left-0 w-[111px] h-auto py-[15px] inline-flex flex-col justify-center items-center gap-2.5 bg-white rounded-[20px] shadow-[0px_13px_61px_0px_rgba(169,169,169,0.37)] z-5"
    >
      <div className="flex flex-col justify-center items-start gap-2.5">
        {options.map((option) => (
          <DropdownMenu
            key={option.value}
            text={option.text}
            value={option.value}
            selectedValue={selectedValue}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
