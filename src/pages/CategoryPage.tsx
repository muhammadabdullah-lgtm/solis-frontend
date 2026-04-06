import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useCategories } from "../context/CategoriesContext";

function CategoryPage() {
  const { rootSlug: slug = "" } = useParams<{ rootSlug: string }>();
  const navigate = useNavigate();
  const { categories, loading } = useCategories();

  const category = categories.find((c) => c.slug === slug);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
          <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse mb-8" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 h-48 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-4xl">😕</p>
          <p className="text-gray-500 text-sm">Category not found.</p>
          <button
            onClick={() => navigate("/")}
            className="text-sm font-medium text-gray-700 hover:text-black underline underline-offset-2"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const subcategories = category.subcategories ?? [];

  // If no subcategories, redirect to products filtered by this category
  if (subcategories.length === 0) {
    navigate(`/products?category_id=${category.id}`, { replace: true }); // no subcategories — go straight to products
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
          <button
            onClick={() => navigate("/")}
            className="hover:text-black transition-colors"
          >
            Home
          </button>
          <ChevronRight size={12} />
          <span className="text-gray-700 font-medium">{category.name}</span>
        </nav>

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{category.name}</h1>
          <div className="h-1 w-10 bg-[#feee00] rounded-full mt-2" />
        </div>

        {/* Subcategory cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {subcategories.map((sub) => {
            const leaves = sub.subcategories ?? [];
            return (
              <div
                key={sub.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Card body */}
                <div className="flex-1 px-5 pt-5 pb-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-3">
                    {sub.name}
                  </h3>

                  {leaves.length > 0 && (
                    <ul className="space-y-1.5">
                      {leaves.slice(0, 4).map((leaf) => (
                        <li key={leaf.id}>
                          <button
                            onClick={() =>
                              navigate(`/products/${slug}/${sub.slug}?category_id=${leaf.id}`)
                            }
                            className="text-xs text-gray-500 hover:text-black transition-colors text-left"
                          >
                            {leaf.name}
                          </button>
                        </li>
                      ))}
                      {leaves.length > 4 && (
                        <li className="text-xs text-gray-400">
                          +{leaves.length - 4} more
                        </li>
                      )}
                    </ul>
                  )}
                </div>

                {/* View All button */}
                <div className="px-5 pb-5">
                  <button
                    onClick={() =>
                      navigate(`/products/${slug}/${sub.slug}?category_id=${sub.id}`)
                    }
                    className="w-full bg-[#feee00] text-black text-sm font-semibold py-2 rounded-xl hover:opacity-90 transition-opacity"
                  >
                    View All
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
