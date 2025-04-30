// features/ranking/components/Pagination.tsx
import { FC } from 'react';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  const generatePages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 6) {
      // 총 페이지가 적을 때
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 항상 1페이지
      pages.push(0);

      if (currentPage > 2) {
        pages.push('...');
      }

      const start = Math.max(1, currentPage - 1);
      const end = Math.min(totalPages - 2, currentPage + 2);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 3) {
        pages.push('...');
      }

      // 항상 마지막 페이지
      pages.push(totalPages - 1);
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <nav className="flex justify-center mt-6 space-x-3">
      {/* ◀️ Prev */}
      <button
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
      >
        &lt;
      </button>

      {/* 숫자, ... 표시 */}
      {pages.map((item, idx) =>
        typeof item === 'number' ? (
          <button
            key={idx}
            onClick={() => onPageChange(item)}
            className={`px-5 py-3 rounded-md text-base font-semibold border ${
              currentPage === item
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {item + 1}
          </button>
        ) : (
          <span key={idx} className="px-3 py-3 text-gray-500">
            {item}
          </span>
        ),
      )}

      {/* ▶️ Next */}
      <button
        disabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
      >
        &gt;
      </button>
    </nav>
  );
};

export default Pagination;
