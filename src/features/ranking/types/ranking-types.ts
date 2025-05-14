export type RankingItem = {
  rank: number;
  name: string;
  profileImage: string;
  tier: string;
  rating: number;
  solvedCount: number;
  marathonDays: number;
  userId: number;
};

export type RankingListResponse = {
  rankings: RankingItem[];
  totalPages: number;
  totalElements: number;
};
