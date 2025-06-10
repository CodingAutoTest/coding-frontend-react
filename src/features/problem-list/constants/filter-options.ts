import { FilterOption, ProblemStatus, Difficulty } from '../types/filter';

export const PROBLEM_STATUS_OPTIONS: FilterOption<ProblemStatus>[] = [
  { text: '미해결', value: 'unsolved' },
  { text: '해결중', value: 'solving' },
  { text: '해결완료', value: 'solved' },
];

export const DIFFICULTY_OPTIONS: FilterOption<Difficulty>[] = [
  { text: '브론즈', value: 'bronze' },
  { text: '실버', value: 'silver' },
  { text: '골드', value: 'gold' },
  { text: '플래티넘', value: 'platinum' },
  { text: '다이아', value: 'diamond' },
  { text: '마스터', value: 'master' },
];
