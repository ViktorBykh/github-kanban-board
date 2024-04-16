export const formatStarCount = (count: number): string => {
  return count >= 1000 ? `${Math.floor(count / 1000)} K` : count.toString();
};
