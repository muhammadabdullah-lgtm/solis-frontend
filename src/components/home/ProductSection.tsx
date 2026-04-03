import { ChevronRight } from "lucide-react";
import ProductCard from "../product/ProductCard";
import type { Product } from "../../types";

interface Props {
  title: string;
  products: Product[];
  addToCart: (product: Product) => void;
}

function ProductSection({ title, products, addToCart }: Props) {
  return (
    <section className="mt-10">
      {/* Section heading */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <div className="h-0.5 w-10 bg-[#feee00] mt-1 rounded-full" />
        </div>
        <button className="flex items-center gap-0.5 text-sm text-gray-500 hover:text-black transition-colors font-medium">
          View All <ChevronRight size={15} />
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductSection;
