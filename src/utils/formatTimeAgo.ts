export const formatTimeAgo = (created_at: string): string => {
  const createdDate = new Date(created_at);
  const currentDate = new Date();

  const differenceInTime = currentDate.getTime() - createdDate.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  if (differenceInDays < 1) {
    const differenceInHours = differenceInTime / (1000 * 3600);
    if (differenceInHours < 1) {
      const differenceInMinutes = differenceInTime / (1000 * 60);
      return `${Math.floor(differenceInMinutes)} minutes ago`;
    } else {
      return `${Math.floor(differenceInHours)} hours ago`;
    }
  } else {
    return differenceInDays >= 2
      ? `${Math.floor(differenceInDays)} days ago`
      : `${Math.floor(differenceInDays)} day ago`;
  }
};