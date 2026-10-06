import type { Product } from "../types/product";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
};

export default function ProductList({ products }: Props) {
  return (
    <div className="product-list">
      {products?.map((product, index) => (
        <ProductCard key={`${product.id} index-${index}`} product={product} />
      ))}
    </div>
  );
}
