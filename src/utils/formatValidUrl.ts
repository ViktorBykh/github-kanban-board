export const formatValidUrl = (url: string) => {
  const pattern = /^https:\/\/github\.com\/[\w-]+\/[\w-]+$/;
  return pattern.test(url);
};