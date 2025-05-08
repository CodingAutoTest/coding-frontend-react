export type UserMyPageType = {
  name: string;
  rating: number;
  solvedCount: number;
  profileImage: string;
  backgroundImage: string | null;
  tierCount: Record<string, number>;
  tagCount: Record<string, number>;
  solvedCountByDate: Record<string, number>;
};
