import closeIcon from '@/assets/problem-list/close-icon.svg';

type TagButtonProps = {
  text: string;
  onRemove?: () => void;
};

const TagButton = ({ text, onRemove }: TagButtonProps) => {
  return (
    <div className="inline-flex items-center justify-center h-[20px] gap-1.5 px-2.5 py-px bg-[#f0f0fa] rounded-[10px]">
      <div className="text-xs font-medium text-center text-PRIMARY font-inter overflow-hidden text-ellipsis whitespace-nowrap">
        {text}
      </div>
      <img
        src={closeIcon}
        onClick={onRemove}
        className="cursor-pointer"
        alt="닫기"
        draggable={false}
      />
    </div>
  );
};

export default TagButton;
