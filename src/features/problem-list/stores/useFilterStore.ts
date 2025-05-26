import { create } from 'zustand';

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

export const useFilterStore = create<FilterMenuState>((set) => ({
  selectedButton: '',
  selectedProblemStatus: '',
  selectedDifficulty: '',
  selectedAlgorithm: 0,
  appliedAlgorithm: 0,
  search: '',
  currentPage: 0,

  setSelectedButton: (buttonId) => set({ selectedButton: buttonId }),
  setSelectedProblemStatus: (status) => set({ selectedProblemStatus: status }),
  setSelectedDifficulty: (difficulty) => set({ selectedDifficulty: difficulty }),
  setSelectedAlgorithm: (algorithm) => set({ selectedAlgorithm: algorithm }),
  setAppliedAlgorithm: (algorithm) => set({ appliedAlgorithm: algorithm }),
  setSearch: (search) => set({ search }),
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
}));
