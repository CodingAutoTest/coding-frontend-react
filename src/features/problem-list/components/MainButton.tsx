import { forwardRef } from 'react';
import ArrowIcon from './ArrowIcon';

type ButtonVariant = 'default' | 'selected' | 'disabled';

type MainButtonProps = {
  text: string;
  icon?: boolean;
  disabled?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
};

const getButtonStyles = (variant: ButtonVariant) => {
  const styles = {
    default: {
      text: 'text-DEFAULT',
      bg: 'bg-white',
      outline: 'outline-DEFAULT',
      icon: 'text-DEFAULT',
    },
    selected: {
      text: 'text-white',
      bg: 'bg-PRIMARY',
      outline: 'outline-PRIMARY',
      icon: 'text-white',
    },
    disabled: {
      text: 'text-DISABLED',
      bg: 'bg-white',
      outline: 'outline-DISABLED',
      icon: 'text-DISABLED',
    },
  };

  return styles[variant];
};

const MainButton = forwardRef<HTMLButtonElement, MainButtonProps>(
  ({ text, icon = false, disabled = false, isSelected = false, onSelect }, ref) => {
    const handleClick = () => {
      if (disabled) return;
      onSelect?.();
    };

    const variant: ButtonVariant = disabled ? 'disabled' : isSelected ? 'selected' : 'default';
    const {
      text: textColor,
      bg: bgColor,
      outline: outlineColor,
      icon: iconColor,
    } = getButtonStyles(variant);

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
