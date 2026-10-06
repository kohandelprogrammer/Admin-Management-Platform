export type SortOrder = "asc" | "desc";

export type ResponseList<T> = {
  products: T[];
  total: number;
  skip: number;
  limit: number;
};
