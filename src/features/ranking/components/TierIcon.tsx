const tierImages = import.meta.glob('@/assets/tiers/*.svg', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

export const getTierImage = (tier: string) => {
  const key = `/src/assets/tiers/${tier}.svg`;
  return tierImages[key] || '/tiers/default-profile.svg';
};
