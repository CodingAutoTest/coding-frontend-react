import { create } from 'zustand';

// 스토어 상태의 타입을 정의합니다
type RankingState = {
  page: number;
  totalPages: number;
  sort: 'rating' | 'solvedCount';
  order: 'asc' | 'desc';
  name: string;
};

// 상태를 변경할 수 있는 액션들을 정의합니다
type RankingActions = {
  setPage: (page: number) => void;
  setTotalPages: (totalPages: number) => void;
  setSort: (newSort: 'rating' | 'solvedCount') => void;
  setSearchName: (name: string) => void;
};

// 스토어를 생성합니다
export const useRankingStore = create<RankingState & RankingActions>((set, get) => ({
  // 초기 상태
  page: 0,
  totalPages: 1,
  sort: 'rating',
  order: 'desc',
  name: '',

  // 현재 페이지를 설정하는 액션
  setPage: (page) => set({ page }),

  // 전체 페이지 수를 설정하는 액션
  setTotalPages: (totalPages) => set({ totalPages }),

  // 정렬 기준을 변경하는 액션 (페이지 리셋 포함)
  setSort: (newSort) => {
    const { sort, order } = get();
    if (sort === newSort) {
      set({ order: order === 'asc' ? 'desc' : 'asc', page: 0 });
    } else {
      set({ sort: newSort, order: 'desc', page: 0 });
    }
  },

  // 검색어를 변경하는 액션 (페이지 리셋 포함)
  setSearchName: (name) => {
    set({ name, page: 0 });
  },
}));
