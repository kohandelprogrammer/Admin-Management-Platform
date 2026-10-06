import { useQuery } from "@tanstack/react-query";
import { PRODUCT_CATEGORIES } from "../../../../constants";
import { getCategoryList } from "../api/productApi";

export const useProductCategories = () => {
  return useQuery({
    queryKey: [PRODUCT_CATEGORIES],
    queryFn: () => getCategoryList(),
    staleTime: 30_000,
  });
};
