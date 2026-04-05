import { useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { getProducts } from "../api/productsApi";
import type { ApiProduct } from "../api/productsApi";
import { getBrands } from "../api/brandsApi";
import type { ApiBrand } from "../api/brandsApi";
import { useCategories } from "../context/CategoriesContext";
import ApiProductCard from "../components/product/ApiProductCard";
import LiveFilterSidebar from "../components/plp/LiveFilterSidebar";
import type { LiveFilterDraft } from "../components/plp/LiveFilterSidebar";
import SectionError from "../components/ui/SectionError";
import SectionEmpty from "../components/ui/SectionEmpty";

const SORT_OPTIONS = [
  { value: "", label: "Recommended" },
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

function draftFromParams(params: URLSearchParams): LiveFilterDraft {
  return {
    categoryId: params.get("category_id")
      ? Number(params.get("category_id"))
      : null,
    brandIds: params.get("brand_id") ? [Number(params.get("brand_id"))] : [],
    minPrice: params.get("min_price") ?? "",
    maxPrice: params.get("max_price") ?? "",
  };
}

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories } = useCategories();

  const [draft, setDraft] = useState<LiveFilterDraft>(() =>
    draftFromParams(searchParams),
  );

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [sort, setSort] = useState(searchParams.get("sort") ?? "");
  const queryInputRef = useRef<HTMLInputElement>(null);

  const [brands, setBrands] = useState<ApiBrand[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getBrands()
      .then(({ brands }) => setBrands(brands))
      .catch(() => {});
  }, []);

  const fetchProducts = useCallback(() => {
    setLoading(true);
    setError(false);

    const params = {
      category_id: searchParams.get("category_id")
        ? Number(searchParams.get("category_id"))
        : undefined,
      brand_id: searchParams.get("brand_id")
        ? Number(searchParams.get("brand_id"))
        : undefined,
      min_price: searchParams.get("min_price")
        ? Number(searchParams.get("min_price"))
        : undefined,
      max_price: searchParams.get("max_price")
        ? Number(searchParams.get("max_price"))
        : undefined,
      q: searchParams.get("q") ?? undefined,
      sort: searchParams.get("sort") ?? undefined,
    };

    getProducts(params)
      .then(({ products, total }) => {
        setProducts(products);
        setTotal(total);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setDraft(draftFromParams(searchParams));
    setQuery(searchParams.get("q") ?? "");
    setSort(searchParams.get("sort") ?? "");
  }, [searchParams]);

  const applyFilters = () => {
    // Start from current URL to preserve category_id (applied immediately on click)
    const next = new URLSearchParams(searchParams);
    // Brands
    next.delete("brand_id");
    draft.brandIds.forEach((id) => next.append("brand_id", String(id)));
    // Price
    if (draft.minPrice) next.set("min_price", draft.minPrice);
    else next.delete("min_price");
    if (draft.maxPrice) next.set("max_price", draft.maxPrice);
    else next.delete("max_price");
    // Preserve search + sort
    if (query) next.set("q", query);
    else next.delete("q");
    if (sort) next.set("sort", sort);
    else next.delete("sort");
    setSearchParams(next);
    setSidebarOpen(false);
  };

  const clearAll = () => {
    setDraft({ categoryId: null, brandIds: [], minPrice: "", maxPrice: "" });
    setQuery("");
    setSort("");
    setSearchParams(new URLSearchParams());
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    const next = new URLSearchParams(searchParams);
    if (value) next.set("sort", value);
    else next.delete("sort");
    setSearchParams(next);
  };

  const handleSearch = () => {
    const next = new URLSearchParams(searchParams);
    if (query) next.set("q", query);
    else next.delete("q");
    setSearchParams(next);
  };

  const activeChips: { label: string; onRemove: () => void }[] = [];
  if (draft.categoryId) {
    const findName = (id: number): string => {
      for (const cat of categories) {
        if (cat.id === id) return cat.name;
        for (const sub of cat.subcategories ?? []) {
          if (sub.id === id) return sub.name;
          for (const leaf of sub.subcategories ?? []) {
            if (leaf.id === id) return leaf.name;
          }
        }
      }
      return `Category ${id}`;
    };
    activeChips.push({
      label: findName(draft.categoryId),
      onRemove: () => {
        const d = { ...draft, categoryId: null };
        setDraft(d);
        const next = new URLSearchParams(searchParams);
        next.delete("category_id");
        setSearchParams(next);
      },
    });
  }
  draft.brandIds.forEach((bid) => {
    const brand = brands.find((b) => b.id === bid);
    if (brand) {
      activeChips.push({
        label: brand.name,
        onRemove: () => {
          const d = {
            ...draft,
            brandIds: draft.brandIds.filter((id) => id !== bid),
          };
          setDraft(d);
          const next = new URLSearchParams(searchParams);
          next.delete("brand_id");
          setSearchParams(next);
        },
      });
    }
  });
  if (draft.minPrice || draft.maxPrice) {
    activeChips.push({
      label: `AED ${draft.minPrice || "0"} – ${draft.maxPrice || "∞"}`,
      onRemove: () => {
        setDraft({ ...draft, minPrice: "", maxPrice: "" });
        const next = new URLSearchParams(searchParams);
        next.delete("min_price");
        next.delete("max_price");
        setSearchParams(next);
      },
    });
  }

  const sidebar = (
    <LiveFilterSidebar
      categories={categories}
      brands={brands}
      draft={draft}
      onCategorySelect={(id) => {
          // Category applies immediately — no need to click Apply
          const next = new URLSearchParams(searchParams);
          if (id === null) {
            next.delete("category_id");
          } else {
            next.set("category_id", String(id));
          }
          setSearchParams(next);
          // draft is synced from URL params by the existing useEffect
        }}
      onBrandToggle={(id) =>
        setDraft((d) => ({
          ...d,
          brandIds: d.brandIds.includes(id)
            ? d.brandIds.filter((b) => b !== id)
            : [...d.brandIds, id],
        }))
      }
      onPriceChange={(field, value) =>
        setDraft((d) => ({ ...d, [field]: value }))
      }
      onApply={applyFilters}
      onClearAll={clearAll}
    />
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="flex gap-6 items-start">
          <aside className="hidden lg:block w-64 shrink-0 sticky top-[120px]">
            {sidebar}
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <div className="relative flex-1">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
                <input
                  ref={queryInputRef}
                  type="text"
                  placeholder="Search products…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white outline-none focus:border-[#feee00] focus:ring-2 focus:ring-[#feee00]/30 transition"
                />
                {query && (
                  <button
                    onClick={() => {
                      setQuery("");
                      const next = new URLSearchParams(searchParams);
                      next.delete("q");
                      setSearchParams(next);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <select
                value={sort}
                onChange={(e) => handleSortChange(e.target.value)}
                className="px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white outline-none focus:border-[#feee00] focus:ring-2 focus:ring-[#feee00]/30 transition cursor-pointer"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white font-medium hover:bg-gray-50 transition"
              >
                <SlidersHorizontal size={15} />
                Filters
              </button>
            </div>
            {activeChips.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {activeChips.map((chip) => (
                  <span
                    key={chip.label}
                    className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-1 text-xs font-medium text-gray-700"
                  >
                    {chip.label}
                    <button
                      onClick={chip.onRemove}
                      className="text-gray-400 hover:text-gray-700"
                    >
                      <X size={11} />
                    </button>
                  </span>
                ))}
              </div>
            )}
            {!loading && !error && (
              <p className="text-sm text-gray-500 mb-4">
                {total} {total === 1 ? "product" : "products"} found
              </p>
            )}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl border border-gray-100 h-72 animate-pulse"
                  />
                ))}
              </div>
            ) : error ? (
              <SectionError onRetry={fetchProducts} />
            ) : products.length === 0 ? (
              <SectionEmpty
                icon="🔍"
                message="No products found. Try adjusting your filters."
              />
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ApiProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="w-72 bg-gray-50 h-full overflow-y-auto p-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">Filters</h2>
              <button onClick={() => setSidebarOpen(false)}>
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            {sidebar}
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
