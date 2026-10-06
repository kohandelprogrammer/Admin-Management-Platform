import type { Product } from "../types/product";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <div className="product-card">
      <img src={product.thumbnail} style={{ objectFit: "contain" }} />

      <div className="product-content">
        <h3>{product.title}</h3>
        <div>
          <p>brand: {product.brand}</p>
          <p className="product-badge">{product.availabilityStatus}</p>
        </div>

        <p>{product.description}</p>
        <div>
          <p>price: {product.price}</p>
          <p>stock: {product.stock}</p>
          <p>{product.category}</p>
        </div>
      </div>
    </div>
  );
}
