export const formatTitleCase = (str: string) => {
  return str.includes("-") || str.match(/[A-Z]/)
    ? str
    : str.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
      );
};
