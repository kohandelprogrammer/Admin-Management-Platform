import { PRODUCT_SIZE } from "../../../../constants";
import type { ResponseList } from "../../../../types";
import type { Product, ProductListQuery } from "../types/product";

export const getProducts = async ({
  page,
  limit = PRODUCT_SIZE,
  search,
  sortBy,
  order,
  category,
}: ProductListQuery): Promise<ResponseList<Product>> => {
  const skip = (page - 1) * limit;

  const params = new URLSearchParams({
    ...(search && {
      q: search,
    }),
    ...(sortBy && {
      sortBy,
    }),
    ...(order && {
      order,
    }),
    limit: String(limit),
    skip: String(skip),
  });

  let fetchUrl;

  if (category) {
    fetchUrl = `https://dummyjson.com/products/category/${category}?${params.toString()}`;
  } else if (search) {
    fetchUrl = `https://dummyjson.com/products/search?${params.toString()}`;
  } else {
    fetchUrl = `https://dummyjson.com/products?${params.toString()}`;
  }

  const response = await fetch(fetchUrl);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  return data;
};

export const getCategoryList = async (): Promise<string[]> => {
  const response = await fetch("https://dummyjson.com/products/category-list");

  if (!response.ok) {
    throw new Error("Failed to fetch category list");
  }

  const data = await response.json();

  return data;
};
