type AlgorithmButtonProps = {
  text: string;
  value: number;
  selectedValue: number;
  onChange: (value: number) => void;
};

const getButtonStyles = (isSelected: boolean) => ({
  text: isSelected ? 'text-white' : 'text-DEFAULT',
  bg: isSelected ? 'bg-PRIMARY' : 'bg-white',
  outline: isSelected ? 'outline-PRIMARY' : 'outline-DISABLED',
});

const AlgorithmButton = ({ text, value, selectedValue, onChange }: AlgorithmButtonProps) => {
  const handleClick = () => {
    onChange(value);
  };

  const isSelected = selectedValue === value;
  const { text: textColor, bg: bgColor, outline: outlineColor } = getButtonStyles(isSelected);

  return (
    <button
      role="radio"
      aria-checked={isSelected}
      onClick={handleClick}
      className={`w-[147px] h-[34px] py-[7px] rounded-[17px] outline outline-1 outline-offset-[-1px] flex justify-center items-center text-sm font-semibold font-nunito-sans
        ${bgColor} ${textColor} ${outlineColor}
      `}
      title={text}
    >
      <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap px-2">{text}</span>
    </button>
  );
};

export default AlgorithmButton;
