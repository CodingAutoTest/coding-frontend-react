export const TABS = ['문제', '결과', '제출내역'] as const;
export type TabType = (typeof TABS)[number];
