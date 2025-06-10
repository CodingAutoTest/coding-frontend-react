import closeIcon from '@/assets/problem-list/close-icon.svg';

type TagButtonProps = {
  text: string;
  onRemove?: () => void;
};

const TagButton = ({ text, onRemove }: TagButtonProps) => {
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove?.();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className="inline-flex items-center w-fit justify-center h-[20px] gap-1.5 px-2.5 py-px bg-[#f0f0fa] rounded-[10px]"
    >
      <div className="text-xs font-medium text-center text-PRIMARY font-inter overflow-hidden text-ellipsis whitespace-nowrap">
        {text}
      </div>
      {onRemove && (
        <button
          type="button"
          onClick={handleRemove}
          className="cursor-pointer p-0.5"
          aria-label={`${text} 태그 제거`}
        >
          <img src={closeIcon} alt="닫기" draggable={false} />
        </button>
      )}
    </div>
  );
};

export default TagButton;
