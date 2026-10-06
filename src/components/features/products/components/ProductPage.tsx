import { useSearchParams } from "react-router-dom";
import Pagination from "../../../ui/Pagination";
import { useProducts } from "../hooks/useProducts";
import ProductList from "./ProductList";
import { PRODUCT_SIZE } from "../../../../constants";
import { calculateTotalPages } from "../../../../lib/utils";
import Filters from "../../../ui/Filters";
import { useProductCategories } from "../hooks/useProductCategory";
import type { SortOrder } from "../../../../types";

export default function ProductPage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") ?? "";
  const categoryParam = searchParams.get("category") ?? "";
  const orderParam = searchParams.get("order");
  const category = categoryParam === "all" ? undefined : categoryParam;
  const sortBy = searchParams.get("sortBy") ?? "asc";
  const order: SortOrder | undefined =
    orderParam === "asc" || orderParam === "desc" ? orderParam : undefined;

  const { data, isLoading, isError, error } = useProducts({
    page,
    search,
    category,
    sortBy,
    order,
  });
  const { data: categories } = useProductCategories();
  const totalPages = calculateTotalPages(data?.total, PRODUCT_SIZE);

  return (
    <div className="product-page">
      <Filters
        category={category}
        order={order}
        sort={sortBy}
        filterName="category"
        filterItems={categories}
        inputPlaceholder="search products..."
      />

      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>{error.message}</div>
      ) : data?.products && data.products.length > 0 ? (
        <ProductList products={data.products} />
      ) : (
        <div>not found</div>
      )}

      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}
