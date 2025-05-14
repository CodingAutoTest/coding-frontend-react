import { create } from 'zustand';

type SortStore = {
  sort: 'rating' | 'solvedCount';
  order: 'asc' | 'desc';
  setSort: (key: 'rating' | 'solvedCount') => void;
};

export const useRankingSortStore = create<SortStore>((set, get) => ({
  sort: 'rating',
  order: 'desc',
  setSort: (key) => {
    const { sort, order } = get();
    if (sort === key) {
      set({ order: order === 'asc' ? 'desc' : 'asc' });
    } else {
      set({ sort: key, order: 'desc' });
    }
  },
}));
