import { useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import type { ReactNode } from "react";

/* ── Static data (replaced by API later) ── */

export const CATEGORY_DATA: Record<string, { label: string; subs: string[] }> = {
  electronics: {
    label: "Electronics & Mobiles",
    subs: ["All Electronics", "Smartphones", "Laptops", "Tablets", "Headphones", "Smart Watches", "Cameras", "Gaming"],
  },
  fashion: {
    label: "Fashion",
    subs: ["Men's Fashion", "Women's Fashion", "Kids' Fashion", "Shoes", "Bags", "Accessories", "Watches"],
  },
  "home-living": {
    label: "Home & Living",
    subs: ["Furniture", "Kitchen & Dining", "Bedding", "Home Decor", "Appliances", "Lighting"],
  },
  "beauty-health": {
    label: "Beauty & Health",
    subs: ["Skincare", "Makeup", "Fragrances", "Hair Care", "Personal Care", "Vitamins"],
  },
  grocery: {
    label: "Grocery",
    subs: ["Fresh Produce", "Dairy & Eggs", "Beverages", "Snacks", "Bakery", "Frozen Foods"],
  },
  sports: {
    label: "Sports",
    subs: ["Fitness Equipment", "Outdoor Sports", "Team Sports", "Swimming", "Cycling", "Sportswear"],
  },
  "toys-baby": {
    label: "Toys & Baby",
    subs: ["Baby Gear", "Toys", "Learning & Education", "Outdoor Play", "Arts & Crafts"],
  },
  automotive: {
    label: "Automotive",
    subs: ["Car Accessories", "Tyres & Wheels", "Car Electronics", "Exterior", "Interior"],
  },
  books: {
    label: "Books",
    subs: ["Fiction", "Non-Fiction", "Children's Books", "Academic", "Comics", "Self-Help"],
  },
  default: {
    label: "All Categories",
    subs: ["Electronics", "Fashion", "Home & Living", "Beauty & Health", "Grocery", "Sports", "Toys & Baby"],
  },
};

const ALL_BRANDS = [
  "Apple", "Samsung", "Sony", "LG", "Huawei", "Xiaomi", "OnePlus",
  "Dell", "HP", "Lenovo", "Asus", "Acer", "Canon", "Nikon",
  "Nike", "Adidas", "Puma", "Zara", "H&M", "Philips", "Anker",
];

/* ── Props ── */

export interface FilterState {
  selectedSubs: string[];
  selectedBrands: string[];
  priceMin: string;
  priceMax: string;
}

interface FilterSidebarProps {
  categorySlug: string;
  filters: FilterState;
  onSubToggle: (sub: string) => void;
  onBrandToggle: (brand: string) => void;
  onPriceChange: (field: "priceMin" | "priceMax", value: string) => void;
  onApplyPrice: () => void;
  onClearAll: () => void;
}

/* ── Component ── */

function FilterSidebar({
  categorySlug,
  filters,
  onSubToggle,
  onBrandToggle,
  onPriceChange,
  onApplyPrice,
  onClearAll,
}: FilterSidebarProps) {
  const [brandSearch, setBrandSearch] = useState("");
  const category = CATEGORY_DATA[categorySlug] ?? CATEGORY_DATA.default;

  const visibleBrands = ALL_BRANDS.filter((b) =>
    b.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const activeCount =
    filters.selectedSubs.length +
    filters.selectedBrands.length +
    (filters.priceMin || filters.priceMax ? 1 : 0);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <h2 className="text-sm font-bold text-gray-900">
          Filters
          {activeCount > 0 && (
            <span className="ml-2 bg-[#feee00] text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {activeCount}
            </span>
          )}
        </h2>
        {activeCount > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs text-red-500 hover:text-red-600 font-medium flex items-center gap-1"
          >
            <X size={12} /> Clear All
          </button>
        )}
      </div>

      {/* ── Category ── */}
      <AccordionSection title="Category">
        <ul className="space-y-1.5">
          {category.subs.map((sub) => (
            <li key={sub}>
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.selectedSubs.includes(sub)}
                  onChange={() => onSubToggle(sub)}
                  className="w-4 h-4 rounded border-gray-300 accent-black cursor-pointer"
                />
                <span className="text-sm text-gray-700 group-hover:text-black transition-colors">
                  {sub}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </AccordionSection>

      {/* ── Brand ── */}
      <AccordionSection title="Brand">
        {/* Brand search */}
        <div className="relative mb-3">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search brands"
            value={brandSearch}
            onChange={(e) => setBrandSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#feee00] focus:ring-2 focus:ring-[#feee00]/30 transition"
          />
        </div>

        <ul className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {visibleBrands.map((brand) => (
            <li key={brand}>
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.selectedBrands.includes(brand)}
                  onChange={() => onBrandToggle(brand)}
                  className="w-4 h-4 rounded border-gray-300 accent-black cursor-pointer"
                />
                <span className="text-sm text-gray-700 group-hover:text-black transition-colors">
                  {brand}
                </span>
              </label>
            </li>
          ))}
          {visibleBrands.length === 0 && (
            <p className="text-xs text-gray-400 py-1">No brands found.</p>
          )}
        </ul>
      </AccordionSection>

      {/* ── Price ── */}
      <AccordionSection title="Price" noBorder>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.priceMin}
            onChange={(e) => onPriceChange("priceMin", e.target.value)}
            min={0}
            className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#feee00] focus:ring-2 focus:ring-[#feee00]/30 transition"
          />
          <span className="text-gray-400 text-sm shrink-0">—</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.priceMax}
            onChange={(e) => onPriceChange("priceMax", e.target.value)}
            min={0}
            className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#feee00] focus:ring-2 focus:ring-[#feee00]/30 transition"
          />
        </div>
        <button
          onClick={onApplyPrice}
          className="mt-3 w-full bg-[#feee00] text-black text-sm font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          Apply
        </button>
      </AccordionSection>
    </div>
  );
}

/* ── Accordion section ── */

function AccordionSection({
  title,
  children,
  noBorder = false,
}: {
  title: string;
  children: ReactNode;
  noBorder?: boolean;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className={noBorder ? "px-4 py-4" : "px-4 py-4 border-b border-gray-100"}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full mb-0"
      >
        <span className="text-sm font-semibold text-gray-900">{title}</span>
        <ChevronDown
          size={15}
          className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

export default FilterSidebar;
