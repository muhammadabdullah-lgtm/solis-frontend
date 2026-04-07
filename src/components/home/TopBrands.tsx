import { useNavigate } from "react-router-dom";
import { useBrands } from "../../hooks/useBrands";
import SectionError from "../ui/SectionError";
import SectionEmpty from "../ui/SectionEmpty";
import SectionTitle from "../common/SectionTitle";
import BrandPill from "../common/BrandPill";

const TopBrands = () => {
  const navigate = useNavigate();
  const { brands, loading, error, retry } = useBrands();

  if (loading) return null;

  return (
    <section>
      <SectionTitle>Top Brands</SectionTitle>

      {error ? (
        <SectionError onRetry={retry} />
      ) : brands.length === 0 ? (
        <SectionEmpty icon="🏷️" message="No brands available right now." />
      ) : (
        <div className="flex flex-wrap gap-2">
          {brands.map((brand) => (
            <BrandPill
              key={brand.id}
              name={brand.name}
              onClick={() => navigate(`/products?brand_id=${brand.id}`)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default TopBrands;
