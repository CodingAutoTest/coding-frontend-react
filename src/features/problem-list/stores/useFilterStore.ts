import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FilterMenuState = {
  selectedButton: string;
  selectedProblemStatus: string;
  selectedDifficulty: string;
  selectedAlgorithm: number;
  appliedAlgorithm: number;
  search: string;
  currentPage: number;
  setSelectedButton: (buttonId: string) => void;
  setSelectedProblemStatus: (status: string) => void;
  setSelectedDifficulty: (difficulty: string) => void;
  setSelectedAlgorithm: (algorithm: number) => void;
  setAppliedAlgorithm: (algorithm: number) => void;
  setSearch: (search: string) => void;
  setCurrentPage: (page: number) => void;
  handleButtonSelect: (buttonId: string) => void;
  handleAlgorithmClose: () => void;
  resetFilters: () => void;
};

export const useFilterStore = create<FilterMenuState>()(
  persist(
    (set) => ({
      selectedButton: '',
      selectedProblemStatus: '',
      selectedDifficulty: '',
      selectedAlgorithm: 0,
      appliedAlgorithm: 0,
      search: '',
      currentPage: 0,

      setSelectedButton: (buttonId) => set({ selectedButton: buttonId }),
      setSelectedProblemStatus: (status) => set({ selectedProblemStatus: status, currentPage: 0 }),
      setSelectedDifficulty: (difficulty) =>
        set({ selectedDifficulty: difficulty, currentPage: 0 }),
      setSelectedAlgorithm: (algorithm) => set({ selectedAlgorithm: algorithm }),
      setAppliedAlgorithm: (algorithm) => set({ appliedAlgorithm: algorithm, currentPage: 0 }),
      setSearch: (search) =>
        set((state) => {
          if (state.search !== search) {
            return { search, currentPage: 0 };
          }
          return { search };
        }),
      setCurrentPage: (page) => set({ currentPage: page }),

      handleButtonSelect: (buttonId) =>
        set((state) => {
          const newSelectedButton = state.selectedButton === buttonId ? '' : buttonId;
          return {
            selectedButton: newSelectedButton,
            selectedAlgorithm:
              buttonId !== 'algorithm' ? state.selectedAlgorithm : state.selectedAlgorithm,
          };
        }),

      handleAlgorithmClose: () =>
        set((state) => ({
          selectedButton: '',
          selectedAlgorithm: state.appliedAlgorithm,
        })),

      resetFilters: () =>
        set({
          selectedButton: '',
          selectedProblemStatus: '',
          selectedDifficulty: '',
          selectedAlgorithm: 0,
          appliedAlgorithm: 0,
          search: '',
          currentPage: 0,
        }),
    }),
    {
      name: 'problem-filter-storage',
    },
  ),
);
