import { useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight } from "lucide-react";
import { getProducts } from "../services/products.service";
import type { ApiProduct, Pagination } from "../services/products.service";
import { getBrands } from "../services/brands.service";
import type { ApiBrand } from "../services/brands.service";
import { useCategories } from "../features/categories/context/CategoriesContext";
import ProductCard from "../components/product/ProductCard";
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

const PER_PAGE = 12;

function draftFromParams(params: URLSearchParams): LiveFilterDraft {
  return {
    categoryId: params.get("category_id")
      ? Number(params.get("category_id"))
      : null,
    brandIds: params.getAll("brand_id").map(Number).filter(Boolean),
    minPrice: params.get("min_price") ?? "",
    maxPrice: params.get("max_price") ?? "",
    minRating: params.get("min_rating") ? Number(params.get("min_rating")) : null,
  };
}

// ─── Pagination ───────────────────────────────────────────────────────────────

function getPageNumbers(current: number, total: number): (number | null)[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | null)[] = [1];
  if (current > 3) pages.push(null);
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) {
    pages.push(p);
  }
  if (current < total - 2) pages.push(null);
  pages.push(total);
  return pages;
}

function PaginationBar({
  pagination,
  onPageChange,
}: {
  pagination: Pagination;
  onPageChange: (page: number) => void;
}) {
  const { current_page, total_pages, total_count, per_page } = pagination;
  if (total_pages <= 1) return null;

  const from = (current_page - 1) * per_page + 1;
  const to = Math.min(current_page * per_page, total_count);

  return (
    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p className="text-sm text-gray-500 shrink-0">
        Showing {from}–{to} of {total_count} products
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(current_page - 1)}
          disabled={current_page === 1}
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        {getPageNumbers(current_page, total_pages).map((p, i) =>
          p === null ? (
            <span key={`e-${i}`} className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
                p === current_page
                  ? "bg-[#feee00] text-black border border-[#feee00]"
                  : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {p}
            </button>
          ),
        )}

        <button
          onClick={() => onPageChange(current_page + 1)}
          disabled={current_page === total_pages}
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

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
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const currentPage = Number(searchParams.get("page") ?? "1");

  useEffect(() => {
    getBrands()
      .then(({ brands }) => setBrands(brands))
      .catch(() => {});
  }, []);

  const fetchProducts = useCallback(() => {
    setLoading(true);
    setError(false);

    const brandIds = searchParams.getAll("brand_id").map(Number).filter(Boolean);

    const params = {
      category_id: searchParams.get("category_id")
        ? Number(searchParams.get("category_id"))
        : undefined,
      brand_id: brandIds.length > 0
        ? (brandIds.length === 1 ? brandIds[0] : brandIds)
        : undefined,
      min_price: searchParams.get("min_price")
        ? Number(searchParams.get("min_price"))
        : undefined,
      max_price: searchParams.get("max_price")
        ? Number(searchParams.get("max_price"))
        : undefined,
      min_rating: searchParams.get("min_rating")
        ? Number(searchParams.get("min_rating"))
        : undefined,
      q: searchParams.get("q") ?? undefined,
      sort: searchParams.get("sort") ?? undefined,
      page: currentPage,
      per_page: PER_PAGE,
    };

    getProducts(params)
      .then(({ products, pagination }) => {
        setProducts(products);
        setPagination(pagination);
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

  const handlePageChange = (page: number) => {
    const next = new URLSearchParams(searchParams);
    if (page === 1) next.delete("page");
    else next.set("page", String(page));
    setSearchParams(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Brand toggle applies immediately to the URL
  const handleBrandToggle = (id: number) => {
    const current = searchParams.getAll("brand_id").map(Number).filter(Boolean);
    const next = new URLSearchParams(searchParams);
    next.delete("brand_id");
    const updated = current.includes(id)
      ? current.filter((b) => b !== id)
      : [...current, id];
    updated.forEach((b) => next.append("brand_id", String(b)));
    next.delete("page");
    setSearchParams(next);
  };

  const handleRatingSelect = (rating: number | null) => {
    const next = new URLSearchParams(searchParams);
    if (rating !== null) next.set("min_rating", String(rating));
    else next.delete("min_rating");
    next.delete("page");
    setSearchParams(next);
  };

  const applyFilters = () => {
    const next = new URLSearchParams(searchParams);
    if (draft.minPrice) next.set("min_price", draft.minPrice);
    else next.delete("min_price");
    if (draft.maxPrice) next.set("max_price", draft.maxPrice);
    else next.delete("max_price");
    if (query) next.set("q", query);
    else next.delete("q");
    if (sort) next.set("sort", sort);
    else next.delete("sort");
    next.delete("page");
    setSearchParams(next);
    setSidebarOpen(false);
  };

  const clearAll = () => {
    setDraft({ categoryId: null, brandIds: [], minPrice: "", maxPrice: "", minRating: null });
    setQuery("");
    setSort("");
    setSearchParams(new URLSearchParams());
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    const next = new URLSearchParams(searchParams);
    if (value) next.set("sort", value);
    else next.delete("sort");
    next.delete("page");
    setSearchParams(next);
  };

  const handleSearch = () => {
    const next = new URLSearchParams(searchParams);
    if (query) next.set("q", query);
    else next.delete("q");
    next.delete("page");
    setSearchParams(next);
  };

  // ── Active filter chips ──
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
        const next = new URLSearchParams(searchParams);
        next.delete("category_id");
        next.delete("page");
        setSearchParams(next);
      },
    });
  }
  draft.brandIds.forEach((bid) => {
    const brand = brands.find((b) => b.id === bid);
    if (brand) {
      activeChips.push({
        label: brand.name,
        onRemove: () => handleBrandToggle(bid),
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
        next.delete("page");
        setSearchParams(next);
      },
    });
  }
  if (draft.minRating !== null) {
    activeChips.push({
      label: `${"★".repeat(draft.minRating)} & up`,
      onRemove: () => handleRatingSelect(null),
    });
  }

  const sidebar = (
    <LiveFilterSidebar
      categories={categories}
      brands={brands}
      draft={draft}
      onCategorySelect={(id) => {
        const next = new URLSearchParams(searchParams);
        if (id === null) next.delete("category_id");
        else next.set("category_id", String(id));
        next.delete("page");
        setSearchParams(next);
      }}
      onBrandToggle={handleBrandToggle}
      onPriceChange={(field, value) =>
        setDraft((d) => ({ ...d, [field]: value }))
      }
      onRatingSelect={handleRatingSelect}
      onApply={applyFilters}
      onClearAll={clearAll}
    />
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className=" mx-auto px-4 lg:px-8 py-8">
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
                      next.delete("page");
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

            {!loading && !error && pagination && (
              <p className="text-sm text-gray-500 mb-4">
                {pagination.total_count}{" "}
                {pagination.total_count === 1 ? "product" : "products"} found
              </p>
            )}

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: PER_PAGE }).map((_, i) => (
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
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {pagination && (
                  <PaginationBar
                    pagination={pagination}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
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
