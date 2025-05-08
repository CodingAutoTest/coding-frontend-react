import DropdownMenu from './DropdownMenu';

type DropdownProps = {
  isOpen: boolean;
  options: {
    text: string;
    value: string | number;
  }[];
  selectedValue: string;
  onChange: (value: string) => void;
};

const Dropdown = ({ isOpen, options, selectedValue, onChange }: DropdownProps) => {
  if (!isOpen) return null;

  return (
    <div
      role="radiogroup"
      className="absolute top-[40px] left-0 w-[111px] h-auto py-[15px] inline-flex flex-col justify-center items-center gap-2.5 bg-white rounded-[20px] shadow-[0px_13px_61px_0px_rgba(169,169,169,0.37)] z-5 "
    >
      <div className="flex flex-col justify-center items-start gap-2.5">
        {options.map((option) => (
          <DropdownMenu
            key={option.value.toString()}
            text={option.text}
            value={option.value.toString()}
            selectedValue={selectedValue}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
