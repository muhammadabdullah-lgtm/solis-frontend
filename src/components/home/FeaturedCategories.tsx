import { useNavigate } from "react-router-dom";
import { useCategories } from "../../context/CategoriesContext";
import SectionError from "../ui/SectionError";

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

function FeaturedCategories() {
  const { categories, loading, error, retry } = useCategories();
  const navigate = useNavigate();

  if (loading) return null;

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900">Shop by Category</h2>
        <div className="h-0.5 w-10 bg-[#feee00] mt-1 rounded-full" />
      </div>

      {error ? (
        <SectionError onRetry={retry} />
      ) : (
        <div
          className="flex gap-3 overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none" }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate(`/products?category_id=${cat.id}`)}
              className="flex-shrink-0 flex flex-col items-center gap-2 bg-white rounded-xl px-5 py-4 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 min-w-[90px]"
            >
              <span className="text-2xl" aria-hidden>
                {SLUG_EMOJI[cat.slug] ?? "🏷️"}
              </span>
              <span className="text-xs font-medium text-gray-700 text-center leading-tight line-clamp-2">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

export default FeaturedCategories;
