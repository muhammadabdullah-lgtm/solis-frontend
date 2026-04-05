import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getProducts } from "../api/productsApi";
import type { ApiProduct } from "../api/productsApi";
import ApiProductCard from "../components/product/ApiProductCard";
import SectionError from "../components/ui/SectionError";
import SectionEmpty from "../components/ui/SectionEmpty";

function Products() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const categoryId = searchParams.get("category_id")
    ? Number(searchParams.get("category_id"))
    : undefined;
  const brandId = searchParams.get("brand_id")
    ? Number(searchParams.get("brand_id"))
    : undefined;
  const sort = searchParams.get("sort") ?? undefined;

  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetch = useCallback(() => {
    setLoading(true);
    setError(false);
    getProducts({ category_id: categoryId, brand_id: brandId, sort })
      .then(({ products }) => setProducts(products))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [categoryId, brandId, sort]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {loading ? "Loading…" : error ? "Products" : `${products.length} Products`}
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-500 hover:text-black transition-colors"
          >
            ← Back
          </button>
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
        ) : products.length === 0 ? (
          <SectionEmpty icon="🔍" message="No products found for this selection." />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ApiProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
