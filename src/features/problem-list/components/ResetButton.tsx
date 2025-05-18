import { IoMdRefresh } from 'react-icons/io';
import { useFilterStore } from '../stores/useFilterStore';

export const ResetButton = () => {
  const resetFilters = useFilterStore((state) => state.resetFilters);

  return (
    <button onClick={resetFilters} className="flex items-center gap-1 text-sm text-DEFAULT">
      <IoMdRefresh className="w-4 h-4" />
      <span>초기화</span>
    </button>
  );
};
