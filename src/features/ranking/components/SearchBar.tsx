// features/ranking/components/SearchBar.tsx
import { FC, FormEvent, useState } from 'react';

type Props = {
  onSearch: (name: string) => void;
};

const SearchBar: FC<Props> = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(input.trim());
  };

  return (
    <section className="mb-4" aria-labelledby="search">
      <header id="search" className="sr-only">
        랭킹 검색
      </header>
      <form onSubmit={handleSubmit} className="flex justify-end">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="닉네임 검색"
          className="border border-gray-300 px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-60"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
        >
          검색
        </button>
      </form>
    </section>
  );
};

export default SearchBar;
