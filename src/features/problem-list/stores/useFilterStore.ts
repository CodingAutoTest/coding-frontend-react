import { create } from 'zustand';

type FilterMenuState = {
  selectedButton: string;
  selectedProblemStatus: number | undefined;
  selectedDifficulty: string;
  selectedAlgorithm: number;
  appliedAlgorithm: number;
  search: string;
  setSelectedButton: (buttonId: string) => void;
  setSelectedProblemStatus: (status: number | undefined) => void;
  setSelectedDifficulty: (difficulty: string) => void;
  setSelectedAlgorithm: (algorithm: number) => void;
  setAppliedAlgorithm: (algorithm: number) => void;
  setSearch: (search: string) => void;
  handleButtonSelect: (buttonId: string) => void;
  handleAlgorithmClose: () => void;
};

export const useFilterStore = create<FilterMenuState>((set) => ({
  selectedButton: '',
  selectedProblemStatus: undefined,
  selectedDifficulty: '',
  selectedAlgorithm: 0,
  appliedAlgorithm: 0,
  search: '',

  setSelectedButton: (buttonId) => set({ selectedButton: buttonId }),
  setSelectedProblemStatus: (status) => set({ selectedProblemStatus: status }),
  setSelectedDifficulty: (difficulty) => set({ selectedDifficulty: difficulty }),
  setSelectedAlgorithm: (algorithm) => set({ selectedAlgorithm: algorithm }),
  setAppliedAlgorithm: (algorithm) => set({ appliedAlgorithm: algorithm }),
  setSearch: (search) => set({ search }),

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
}));
