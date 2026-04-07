import { useEffect, useCallback, useRef, useReducer } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { getProducts } from "../services/products.service";
import type { ApiProduct, Pagination } from "../services/products.service";
import { useBrands } from "../hooks/useBrands";
import { useCategories } from "../features/categories/context/CategoriesContext";
import { PER_PAGE, SORT_OPTIONS } from "../lib/constants";
import { pluralise } from "../lib/utils";
import type { ApiCategory } from "../services/categories.service";
import ProductCard from "../components/product/ProductCard";
import LiveFilterSidebar from "../components/plp/LiveFilterSidebar";
import type { LiveFilterDraft } from "../components/plp/LiveFilterSidebar";
import SectionError from "../components/ui/SectionError";
import SectionEmpty from "../components/ui/SectionEmpty";
import PaginationBar from "../components/common/PaginationBar";



type ProductsState = {
  draft: LiveFilterDraft;
  query: string;
  sort: string;
  sidebarOpen: boolean;
  products: ApiProduct[];
  pagination: Pagination | null;
  loading: boolean;
  error: boolean;
};

type ProductsAction =
  | { type: "SYNC_FROM_URL"; params: URLSearchParams }
  | { type: "SET_QUERY"; query: string }
  | { type: "SET_SORT"; sort: string }
  | { type: "PATCH_DRAFT"; patch: Partial<LiveFilterDraft> }
  | { type: "OPEN_SIDEBAR" }
  | { type: "CLOSE_SIDEBAR" }
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; products: ApiProduct[]; pagination: Pagination }
  | { type: "FETCH_ERROR" };

function draftFromParams(params: URLSearchParams): LiveFilterDraft {
  return {
    categoryId: params.get("category_id") ? Number(params.get("category_id")) : null,
    brandIds: params.getAll("brand_id").map(Number).filter(Boolean),
    minPrice: params.get("min_price") ?? "",
    maxPrice: params.get("max_price") ?? "",
    minRating: params.get("min_rating") ? Number(params.get("min_rating")) : null,
  };
}

function initialState(params: URLSearchParams): ProductsState {
  return {
    draft: draftFromParams(params),
    query: params.get("q") ?? "",
    sort: params.get("sort") ?? "",
    sidebarOpen: false,
    products: [],
    pagination: null,
    loading: true,
    error: false,
  };
}

function reducer(state: ProductsState, action: ProductsAction): ProductsState {
  switch (action.type) {
    case "SYNC_FROM_URL":
      return {
        ...state,
        draft: draftFromParams(action.params),
        query: action.params.get("q") ?? "",
        sort: action.params.get("sort") ?? "",
      };
    case "SET_QUERY":
      return { ...state, query: action.query };
    case "SET_SORT":
      return { ...state, sort: action.sort };
    case "PATCH_DRAFT":
      return { ...state, draft: { ...state.draft, ...action.patch } };
    case "OPEN_SIDEBAR":
      return { ...state, sidebarOpen: true };
    case "CLOSE_SIDEBAR":
      return { ...state, sidebarOpen: false };
    case "FETCH_START":
      return { ...state, loading: true, error: false };
    case "FETCH_SUCCESS":
      return { ...state, products: action.products, pagination: action.pagination, loading: false };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: true };
  }
}



function findCategoryName(categories: ApiCategory[], id: number): string {
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
}



const  Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories } = useCategories();
  const { brands } = useBrands();
  const queryInputRef = useRef<HTMLInputElement>(null);

  const [state, dispatch] = useReducer(reducer, searchParams, initialState);
  const { draft, query, sort, sidebarOpen, products, pagination, loading, error } = state;

  const currentPage = Number(searchParams.get("page") ?? "1");


  const fetchProducts = useCallback(() => {
    dispatch({ type: "FETCH_START" });

    const brandIds = searchParams.getAll("brand_id").map(Number).filter(Boolean);
    const params = {
      category_id: searchParams.get("category_id")
        ? Number(searchParams.get("category_id"))
        : undefined,
      brand_id: brandIds.length > 0
        ? (brandIds.length === 1 ? brandIds[0] : brandIds)
        : undefined,
      min_price: searchParams.get("min_price") ? Number(searchParams.get("min_price")) : undefined,
      max_price: searchParams.get("max_price") ? Number(searchParams.get("max_price")) : undefined,
      min_rating: searchParams.get("min_rating") ? Number(searchParams.get("min_rating")) : undefined,
      q: searchParams.get("q") ?? undefined,
      sort: searchParams.get("sort") ?? undefined,
      page: currentPage,
      per_page: PER_PAGE,
    };

    getProducts(params)
      .then(({ products, pagination }) =>
        dispatch({ type: "FETCH_SUCCESS", products, pagination }),
      )
      .catch(() => dispatch({ type: "FETCH_ERROR" }));
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);


  useEffect(() => {
    dispatch({ type: "SYNC_FROM_URL", params: searchParams });
  }, [searchParams]);

  // ── URL helpers ──
  const handlePageChange = (page: number) => {
    const next = new URLSearchParams(searchParams);
    if (page === 1) next.delete("page");
    else next.set("page", String(page));
    setSearchParams(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBrandToggle = (id: number) => {
    const current = searchParams.getAll("brand_id").map(Number).filter(Boolean);
    const next = new URLSearchParams(searchParams);
    next.delete("brand_id");
    const updated = current.includes(id) ? current.filter((b) => b !== id) : [...current, id];
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

  const handleSortChange = (value: string) => {
    dispatch({ type: "SET_SORT", sort: value });
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

  const handleClearQuery = () => {
    dispatch({ type: "SET_QUERY", query: "" });
    const next = new URLSearchParams(searchParams);
    next.delete("q");
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
    dispatch({ type: "CLOSE_SIDEBAR" });
  };

  const clearAll = () => {
    dispatch({
      type: "PATCH_DRAFT",
      patch: { categoryId: null, brandIds: [], minPrice: "", maxPrice: "", minRating: null },
    });
    dispatch({ type: "SET_QUERY", query: "" });
    dispatch({ type: "SET_SORT", sort: "" });
    setSearchParams(new URLSearchParams());
  };


  const activeChips: { label: string; onRemove: () => void }[] = [];
  if (draft.categoryId) {
    activeChips.push({
      label: findCategoryName(categories, draft.categoryId),
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
      activeChips.push({ label: brand.name, onRemove: () => handleBrandToggle(bid) });
    }
  });
  if (draft.minPrice || draft.maxPrice) {
    activeChips.push({
      label: `AED ${draft.minPrice || "0"} – ${draft.maxPrice || "∞"}`,
      onRemove: () => {
        dispatch({ type: "PATCH_DRAFT", patch: { minPrice: "", maxPrice: "" } });
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
      onPriceChange={(field, value) => dispatch({ type: "PATCH_DRAFT", patch: { [field]: value } })}
      onRatingSelect={handleRatingSelect}
      onApply={applyFilters}
      onClearAll={clearAll}
    />
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto px-4 lg:px-8 py-8">
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
                  onChange={(e) => dispatch({ type: "SET_QUERY", query: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white outline-none focus:border-[#feee00] focus:ring-2 focus:ring-[#feee00]/30 transition"
                />
                {query && (
                  <button
                    onClick={handleClearQuery}
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
                onClick={() => dispatch({ type: "OPEN_SIDEBAR" })}
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
                    <button onClick={chip.onRemove} className="text-gray-400 hover:text-gray-700">
                      <X size={11} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {!loading && !error && pagination && (
              <p className="text-sm text-gray-500 mb-4">
                {pluralise(pagination.total_count, "product")} found
              </p>
            )}

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: PER_PAGE }).map((_, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-100 h-72 animate-pulse" />
                ))}
              </div>
            ) : error ? (
              <SectionError onRetry={fetchProducts} />
            ) : products.length === 0 ? (
              <SectionEmpty icon="🔍" message="No products found. Try adjusting your filters." />
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                {pagination && (
                  <PaginationBar pagination={pagination} onPageChange={handlePageChange} />
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
            onClick={() => dispatch({ type: "CLOSE_SIDEBAR" })}
          />
          <div className="w-72 bg-gray-50 h-full overflow-y-auto p-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">Filters</h2>
              <button onClick={() => dispatch({ type: "CLOSE_SIDEBAR" })}>
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
