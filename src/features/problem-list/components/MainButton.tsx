import { forwardRef } from 'react';
import ArrowIcon from './ArrowIcon';

type MainButtonProps = {
  text: string;
  icon?: boolean;
  disabled?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
};

const MainButton = forwardRef<HTMLButtonElement, MainButtonProps>(
  ({ text, icon = false, disabled = false, isSelected = false, onSelect }, ref) => {
    const handleClick = () => {
      if (disabled) return;
      onSelect?.();
    };

    const textColor = disabled ? 'text-DISABLED' : isSelected ? 'text-white' : 'text-DEFAULT';
    const bgColor = disabled ? 'bg-white' : isSelected ? 'bg-PRIMARY' : 'bg-white';
    const outlineColor = disabled
      ? 'outline-DISABLED'
      : isSelected
        ? 'outline-PRIMARY'
        : 'outline-DEFAULT';
    const iconColor = disabled ? 'text-DISABLED' : isSelected ? 'text-white' : 'text-DEFAULT';

    return (
      <button
        ref={ref}
        role="radio"
        aria-checked={isSelected}
        onClick={handleClick}
        disabled={disabled}
        className={`w-[111px] h-[34px] rounded-[50px] outline outline-1 outline-offset-[-1px]
          inline-flex justify-center items-center gap-[3px]
          font-nunito-sans text-[15px] font-medium
          ${bgColor} ${textColor} ${outlineColor}
        `}
      >
        {text}
        {icon && <ArrowIcon color={iconColor} />}
      </button>
    );
  },
);

MainButton.displayName = 'MainButton';

export default MainButton;
