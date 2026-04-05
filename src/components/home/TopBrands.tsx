import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getBrands } from "../../api/brandsApi";
import type { ApiBrand } from "../../api/brandsApi";
import SectionError from "../ui/SectionError";

function TopBrands() {
  const [brands, setBrands] = useState<ApiBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const fetch = useCallback(() => {
    setLoading(true);
    setError(false);
    getBrands()
      .then(({ brands }) => setBrands(brands))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  if (loading) return null;

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900">Top Brands</h2>
        <div className="h-0.5 w-10 bg-[#feee00] mt-1 rounded-full" />
      </div>

      {error ? (
        <SectionError onRetry={fetch} />
      ) : (
        <div className="flex flex-wrap gap-2">
          {brands.map((brand) => (
            <button
              key={brand.id}
              onClick={() => navigate(`/products?brand_id=${brand.id}`)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-[#feee00] hover:bg-[#feee00]/10 transition-colors shadow-sm"
            >
              {brand.name}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

export default TopBrands;
