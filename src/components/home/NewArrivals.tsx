import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useProducts } from "../../hooks/useProducts";
import ProductCard from "../product/ProductCard";
import SectionError from "../ui/SectionError";
import SectionEmpty from "../ui/SectionEmpty";

const NewArrivals = () => {
  const navigate = useNavigate();
  const { products, loading, error, retry } = useProducts({ sort: "newest", per_page: 8 });

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">New Arrivals</h2>
          <div className="h-0.5 w-10 bg-[#feee00] mt-1 rounded-full" />
        </div>
        {!error && !loading && products.length > 0 && (
          <button
            onClick={() => navigate("/products?sort=newest")}
            className="flex items-center gap-0.5 text-sm text-gray-500 hover:text-black transition-colors font-medium"
          >
            View All <ChevronRight size={15} />
          </button>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-100 h-72 animate-pulse"
            />
          ))}
        </div>
      ) : error ? (
        <SectionError onRetry={retry} />
      ) : products.length === 0 ? (
        <SectionEmpty icon="📦" message="No new arrivals yet. Check back soon!" />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default NewArrivals;
