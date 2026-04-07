import { useNavigate } from "react-router-dom";
import { useCategories } from "../../features/categories/hooks/useCategories";
import SectionError from "../ui/SectionError";
import SectionEmpty from "../ui/SectionEmpty";
import SectionTitle from "../common/SectionTitle";
import CategoryPill from "../common/CategoryPill";

const SLUG_EMOJI: Record<string, string> = {
  electronics: "💻",
  fashion: "👗",
  "home-living": "🏠",
  beauty: "💄",
  "beauty-health": "💄",
  sports: "⚽",
  grocery: "🛒",
  toys: "🧸",
  "toys-baby": "🧸",
  automotive: "🚗",
  books: "📚",
  mobiles: "📱",
  laptops: "💻",
};

const FeaturedCategories = () => {
  const { categories, loading, error, retry } = useCategories();
  const navigate = useNavigate();

  if (loading) return null;

  return (
    <section>
      <SectionTitle>Shop by Category</SectionTitle>

      {error ? (
        <SectionError onRetry={retry} />
      ) : categories.length === 0 ? (
        <SectionEmpty icon="🗂️" message="No categories available right now." />
      ) : (
        <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {categories.map((cat) => (
            <CategoryPill
              key={cat.id}
              emoji={SLUG_EMOJI[cat.slug] ?? "🏷️"}
              label={cat.name}
              onClick={() => navigate(`/products?category_id=${cat.id}`)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedCategories;
