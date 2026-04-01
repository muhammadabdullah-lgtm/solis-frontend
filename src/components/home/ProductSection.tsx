import ProductCard from "../product/ProductCard";
import type { Product } from "../../types";

interface Props {
  title: string;
  products: Product[];
  addToCart: (product: Product) => void;
}

function ProductSection({ title, products, addToCart }: Props) {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductSection;