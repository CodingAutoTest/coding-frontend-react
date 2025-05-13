// src/features/profile-setting/components/ActionButton.tsx
import { FC } from 'react';

type Props = {
  text: string;
  onClick: () => void;
  className?: string;
};

const ActionButton: FC<Props> = ({ text, onClick, className = '' }) => (
  <button type="button" onClick={onClick} className={`${className} text-white font-bold rounded`}>
    {text}
  </button>
);

export default ActionButton;
