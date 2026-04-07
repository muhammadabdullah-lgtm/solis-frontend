import { useNavigate } from "react-router-dom";
import { useBrands } from "../../hooks/useBrands";
import SectionError from "../ui/SectionError";
import SectionEmpty from "../ui/SectionEmpty";

const TopBrands = () => {
  const navigate = useNavigate();
  const { brands, loading, error, retry } = useBrands();

  if (loading) return null;

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900">Top Brands</h2>
        <div className="h-0.5 w-10 bg-[#feee00] mt-1 rounded-full" />
      </div>

      {error ? (
        <SectionError onRetry={retry} />
      ) : brands.length === 0 ? (
        <SectionEmpty icon="🏷️" message="No brands available right now." />
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
