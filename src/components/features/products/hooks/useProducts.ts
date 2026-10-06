import { useQuery } from "@tanstack/react-query";
import { PRODUCT_API_KEY } from "../../../../constants";
import { getProducts } from "../api/productApi";
import type { ProductListQuery } from "../types/product";

export const useProducts = ({
  page,
  search,
  category,
  order,
  sortBy,
}: ProductListQuery) => {
  return useQuery({
    queryKey: [PRODUCT_API_KEY, { page, search, category, order, sortBy }],
    queryFn: () => getProducts({ page, search, category, order, sortBy }),
    staleTime: 30_000,
  });
};
