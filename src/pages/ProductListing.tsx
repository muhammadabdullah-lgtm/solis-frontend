import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { SlidersHorizontal, X, ChevronDown, ChevronRight } from "lucide-react";
import FilterSidebar, {
  CATEGORY_DATA,
  type FilterState,
} from "../components/plp/FilterSidebar";
import ProductCard from "../components/product/ProductCard";
import { mockProducts } from "../data/mockProduct";
import { useCart } from "../context/CartContext";

const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Best Rating" },
  { value: "newest", label: "Newest First" },
];

function ProductListing() {
  const { slug = "default" } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const category = CATEGORY_DATA[slug] ?? CATEGORY_DATA.default;

  /* ── Filter state ── */
  const [filters, setFilters] = useState<FilterState>({
    selectedSubs: [],
    selectedBrands: [],
    priceMin: "",
    priceMax: "",
  });
  // Separate "applied" price so it only filters after clicking Apply
  const [appliedPrice, setAppliedPrice] = useState({ min: "", max: "" });
  const [sortBy, setSortBy] = useState("recommended");
  const [sortOpen, setSortOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  /* ── Handlers ── */
  const toggleSub = (sub: string) =>
    setFilters((f) => ({
      ...f,
      selectedSubs: f.selectedSubs.includes(sub)
        ? f.selectedSubs.filter((s) => s !== sub)
        : [...f.selectedSubs, sub],
    }));

  const toggleBrand = (brand: string) =>
    setFilters((f) => ({
      ...f,
      selectedBrands: f.selectedBrands.includes(brand)
        ? f.selectedBrands.filter((b) => b !== brand)
        : [...f.selectedBrands, brand],
    }));

  const handlePriceChange = (field: "priceMin" | "priceMax", value: string) =>
    setFilters((f) => ({ ...f, [field]: value }));

  const applyPrice = () =>
    setAppliedPrice({ min: filters.priceMin, max: filters.priceMax });

  const clearAll = () => {
    setFilters({ selectedSubs: [], selectedBrands: [], priceMin: "", priceMax: "" });
    setAppliedPrice({ min: "", max: "" });
  };

  const removeActiveFilter = (type: string, label: string) => {
    if (type === "sub") toggleSub(label);
    if (type === "brand") toggleBrand(label);
    if (type === "price") {
      setFilters((f) => ({ ...f, priceMin: "", priceMax: "" }));
      setAppliedPrice({ min: "", max: "" });
    }
  };

  /* ── Active filter chips ── */
  const activeChips = [
    ...filters.selectedSubs.map((s) => ({ label: s, type: "sub" })),
    ...filters.selectedBrands.map((b) => ({ label: b, type: "brand" })),
    ...(appliedPrice.min || appliedPrice.max
      ? [{ label: `$${appliedPrice.min || 0} – $${appliedPrice.max || "∞"}`, type: "price" }]
      : []),
  ];

  /* ── Products (filtering wired to API later) ── */
  const products = mockProducts;

  const currentSort = SORT_OPTIONS.find((o) => o.value === sortBy)!;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">

        {/* ── Breadcrumb ── */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-5">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-gray-700 font-medium">{category.label}</span>
        </nav>

        {/* ── Mobile: filter toggle button ── */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMobileFiltersOpen((o) => !o)}
            className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:border-gray-300 transition-colors"
          >
            <SlidersHorizontal size={15} />
            Filters
            {activeChips.length > 0 && (
              <span className="bg-[#feee00] text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                {activeChips.length}
              </span>
            )}
          </button>
        </div>

        <div className="flex gap-6 items-start">
          {/* ── Left: Filter Sidebar ── */}
          <aside
            className={`w-full lg:w-60 xl:w-64 shrink-0 ${
              mobileFiltersOpen ? "block" : "hidden"
            } lg:block`}
          >
            <FilterSidebar
              categorySlug={slug}
              filters={filters}
              onSubToggle={toggleSub}
              onBrandToggle={toggleBrand}
              onPriceChange={handlePriceChange}
              onApplyPrice={applyPrice}
              onClearAll={clearAll}
            />
          </aside>

          {/* ── Right: Results ── */}
          <div className="flex-1 min-w-0">

            {/* Sort bar */}
            <div className="flex items-center justify-between bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 mb-4">
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-900">{products.length} Results</span>
                {" "}for{" "}
                <span className="font-semibold text-gray-900">&ldquo;{category.label}&rdquo;</span>
              </p>

              {/* Sort dropdown */}
              <div className="relative">
                <button
                  onClick={() => setSortOpen((o) => !o)}
                  className="flex items-center gap-2 text-sm text-gray-700 font-medium hover:text-black transition-colors"
                >
                  <span className="hidden sm:inline text-gray-400">Sort By:</span>
                  {currentSort.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${sortOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {sortOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl border border-gray-100 shadow-lg py-1 z-20">
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                        className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          sortBy === opt.value
                            ? "bg-[#feee00]/20 font-semibold text-black"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Active filter chips */}
            {activeChips.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {activeChips.map((chip) => (
                  <button
                    key={chip.label}
                    onClick={() => removeActiveFilter(chip.type, chip.label)}
                    className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-1 text-xs font-medium text-gray-700 hover:border-red-300 hover:text-red-500 transition-colors shadow-sm"
                  >
                    {chip.label}
                    <X size={11} />
                  </button>
                ))}
                <button
                  onClick={clearAll}
                  className="text-xs font-medium text-red-500 hover:text-red-600 px-2 py-1 transition-colors"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Product grid */}
            {products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    addToCart={addToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center py-20 text-center px-4">
                <p className="text-lg font-semibold text-gray-700">No products found</p>
                <p className="text-sm text-gray-400 mt-1">Try adjusting or clearing your filters.</p>
                <button
                  onClick={clearAll}
                  className="mt-4 bg-[#feee00] text-black font-semibold px-6 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductListing;
