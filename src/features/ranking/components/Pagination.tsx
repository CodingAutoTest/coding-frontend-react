// features/ranking/components/Pagination.tsx
import { FC } from 'react';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <nav className="flex justify-center mt-6 space-x-5">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-5 py-3 rounded-md text-base font-semibold border ${
            i === currentPage
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
          }`}
        >
          {i + 1}
        </button>
      ))}
    </nav>
  );
};

export default Pagination;
