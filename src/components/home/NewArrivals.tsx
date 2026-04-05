import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { getProducts } from "../../api/productsApi";
import type { ApiProduct } from "../../api/productsApi";
import ApiProductCard from "../product/ApiProductCard";
import SectionError from "../ui/SectionError";

function NewArrivals() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const fetch = useCallback(() => {
    setLoading(true);
    setError(false);
    getProducts({ sort: "newest", per_page: 8 })
      .then(({ products }) => setProducts(products.slice(0, 8)))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

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
        <SectionError onRetry={fetch} />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ApiProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default NewArrivals;
