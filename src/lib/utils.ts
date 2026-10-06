export const calculateTotalPages = (total: number = 0, size: number) => {
  const totalPages = Math.ceil(total / size);

  return totalPages;
};
