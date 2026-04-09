import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useProducts } from "../../hooks/useProducts";
import ProductCard from "../product/ProductCard";
import SectionError from "../ui/SectionError";
import SectionEmpty from "../ui/SectionEmpty";
import SectionTitle from "../common/SectionTitle";
import ProductGridSkeleton from "../common/ProductGridSkeleton";
import Button from "../ui/Button";

const NewArrivals = () => {
  const navigate = useNavigate();
  const { products, loading, error, retry } = useProducts({ sort: "newest", per_page: 8 });

  const viewAllAction = !error && !loading && products.length > 0 && (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => navigate("/products?sort=newest")}
    >
      View All <ChevronRight size={15} />
    </Button>
  );

  return (
    <section>
      <SectionTitle action={viewAllAction || undefined}>New Arrivals</SectionTitle>

      {loading ? (
        <ProductGridSkeleton count={8} />
      ) : error ? (
        <SectionError onRetry={retry} />
      ) : products.length === 0 ? (
        <SectionEmpty icon="📦" message="No new arrivals yet. Check back soon!" />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default NewArrivals;
