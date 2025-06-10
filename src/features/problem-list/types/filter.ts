export type FilterOption<T = string | number> = {
  text: string;
  value: T;
};

export type ProblemStatus = 'unsolved' | 'solving' | 'solved';
export type Difficulty = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'master';

export type FilterButtonType = 'problemStatus' | 'difficulty' | 'algorithm';

export type FilterState = {
  selectedButton: FilterButtonType | '';
  selectedProblemStatus: ProblemStatus | '';
  selectedDifficulty: Difficulty | '';
  selectedAlgorithm: number;
  appliedAlgorithm: number;
  search: string;
  currentPage: number;
};
