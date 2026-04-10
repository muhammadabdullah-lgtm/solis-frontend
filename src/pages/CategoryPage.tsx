import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useCategories } from "../features/categories/hooks/useCategories";
import SectionTitle from "../components/common/SectionTitle";
import DataNotFound from "../components/common/DataNotFound";
import Skelton from "../components/common/Skelton";
import Button from "../components/ui/Button";
import CategoriesTable from "../components/common/CategoriesTable";
import Layout from "../components/layout";

const CategoryPage = () => {
  const { rootSlug: slug = "" } = useParams<{ rootSlug: string }>();
  const navigate = useNavigate();
  const { categories, loading } = useCategories();

  if (loading) {
    return <Skelton />;
  }

  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return (
      <DataNotFound
        text="Category not found."
        routeBack=""
        backLabel="Back to Home"
      />
    );
  }

  const subcategories = category.subcategories ?? [];

  // No subcategories — redirect straight to products
  if (subcategories.length === 0) {
    navigate(`/products?category_id=${category.id}`, { replace: true });
    return null;
  }

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="
    hover:text-black 
    p-0 m-0
    hover:bg-transparent
    rounded-none
    w-auto h-auto
    min-w-0
    font-normal
  "
            >
              Home
            </Button>

            <ChevronRight size={12} />
            <span className="text-gray-700 font-medium">{category.name}</span>
          </nav>

          <SectionTitle>{category.name}</SectionTitle>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {subcategories.map((subcat) => {
              return <CategoriesTable subcat={subcat} slug={slug} />;
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
