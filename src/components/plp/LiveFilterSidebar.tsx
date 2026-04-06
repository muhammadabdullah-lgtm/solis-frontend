import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import type { ApiCategory, ApiSubcategory } from "../../api/categoriesApi";
import type { ApiBrand } from "../../api/brandsApi";

export interface LiveFilterDraft {
  categoryId: number | null;
  brandIds: number[];
  minPrice: string;
  maxPrice: string;
  minRating: number | null;
}

interface Props {
  categories: ApiCategory[];
  brands: ApiBrand[];
  draft: LiveFilterDraft;
  onCategorySelect: (id: number | null) => void;
  onBrandToggle: (id: number) => void;
  onPriceChange: (field: "minPrice" | "maxPrice", value: string) => void;
  onRatingSelect: (rating: number | null) => void;
  onApply: () => void;
  onClearAll: () => void;
}

function LiveFilterSidebar({
  categories,
  brands,
  draft,
  onCategorySelect,
  onBrandToggle,
  onPriceChange,
  onRatingSelect,
  onApply,
  onClearAll,
}: Props) {
  const [brandSearch, setBrandSearch] = useState("");

  const visibleBrands = brands.filter((b) =>
    b.name.toLowerCase().includes(brandSearch.toLowerCase()),
  );

  const activeCount =
    (draft.categoryId !== null ? 1 : 0) +
    draft.brandIds.length +
    (draft.minPrice || draft.maxPrice ? 1 : 0) +
    (draft.minRating !== null ? 1 : 0);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
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

      <AccordionSection title="Category">
        <ul className="space-y-0.5">
          <li>
            <button
              onClick={() => onCategorySelect(null)}
              className={`w-full text-left text-sm px-2 py-1 rounded-md transition-colors ${
                draft.categoryId === null
                  ? "bg-[#feee00] font-semibold text-black"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              All
            </button>
          </li>
          {categories.map((cat) => (
            <CategoryNode
              key={cat.id}
              cat={cat}
              selectedId={draft.categoryId}
              onSelect={onCategorySelect}
            />
          ))}
        </ul>
      </AccordionSection>

      <AccordionSection title="Brand">
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
            <li key={brand.id}>
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={draft.brandIds.includes(brand.id)}
                  onChange={() => onBrandToggle(brand.id)}
                  className="w-4 h-4 rounded border-gray-300 accent-black cursor-pointer"
                />
                <span className="text-sm text-gray-700 group-hover:text-black transition-colors">
                  {brand.name}
                </span>
              </label>
            </li>
          ))}
          {visibleBrands.length === 0 && (
            <p className="text-xs text-gray-400 py-1">No brands found.</p>
          )}
        </ul>
      </AccordionSection>

      <RatingSlider
        value={draft.minRating}
        onSelect={onRatingSelect}
      />

      <AccordionSection title="Price Range" noBorder>
        <div className="flex items-center gap-2 mb-3">
          <input
            type="number"
            placeholder="Min"
            value={draft.minPrice}
            onChange={(e) => onPriceChange("minPrice", e.target.value)}
            min={0}
            className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#feee00] focus:ring-2 focus:ring-[#feee00]/30 transition"
          />
          <span className="text-gray-400 text-sm shrink-0">—</span>
          <input
            type="number"
            placeholder="Max"
            value={draft.maxPrice}
            onChange={(e) => onPriceChange("maxPrice", e.target.value)}
            min={0}
            className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#feee00] focus:ring-2 focus:ring-[#feee00]/30 transition"
          />
        </div>
        <button
          onClick={onApply}
          className="w-full bg-[#feee00] text-black text-sm font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          Apply Filters
        </button>
      </AccordionSection>
    </div>
  );
}

// ─── Rating Slider ────────────────────────────────────────────────────────────

const RATING_MIN = 1;
const RATING_MAX = 5;

function RatingSlider({
  value,
  onSelect,
}: {
  value: number | null;
  onSelect: (rating: number | null) => void;
}) {
  const [open, setOpen] = useState(true);
  const [localValue, setLocalValue] = useState<number>(value ?? RATING_MIN);

  // Sync local value when external value changes (e.g. Clear All)
  useEffect(() => {
    setLocalValue(value ?? RATING_MIN);
  }, [value]);

  const fillPercent =
    ((localValue - RATING_MIN) / (RATING_MAX - RATING_MIN)) * 100;

  const trackStyle = {
    background: `linear-gradient(to right, #e5e7eb 0%, #e5e7eb ${fillPercent}%, #3b82f6 ${fillPercent}%, #3b82f6 100%)`,
  };

  return (
    <div className="px-4 py-4 border-b border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex-1 text-left text-sm font-semibold text-gray-900"
        >
          Rating
        </button>
        {value !== null && (
          <button
            onClick={() => {
              setLocalValue(RATING_MIN);
              onSelect(null);
            }}
            className="text-xs border border-gray-300 text-gray-600 rounded px-2 py-0.5 mr-2 hover:bg-gray-50 transition-colors"
          >
            Clear
          </button>
        )}
        <button onClick={() => setOpen((o) => !o)}>
          <ChevronDown
            size={15}
            className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {open && (
        <div className="mt-3">
          <p className="text-sm font-medium text-blue-600 mb-3">
            {localValue} Stars or more
          </p>

          <input
            type="range"
            min={RATING_MIN}
            max={RATING_MAX}
            step={0.5}
            value={localValue}
            onChange={(e) => setLocalValue(Number(e.target.value))}
            onMouseUp={(e) => onSelect(Number((e.target as HTMLInputElement).value))}
            onTouchEnd={(e) => onSelect(Number((e.target as HTMLInputElement).value))}
            style={trackStyle}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:border-2
              [&::-webkit-slider-thumb]:border-blue-500
              [&::-webkit-slider-thumb]:shadow-md
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-moz-range-thumb]:w-5
              [&::-moz-range-thumb]:h-5
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-white
              [&::-moz-range-thumb]:border-2
              [&::-moz-range-thumb]:border-blue-500
              [&::-moz-range-thumb]:shadow-md
              [&::-moz-range-thumb]:cursor-pointer
              [&::-moz-range-thumb]:border-none"
          />

          <div className="flex justify-between text-xs text-gray-400 mt-1.5">
            <span>{localValue}</span>
            <span>{RATING_MAX}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function CategoryNode({
  cat,
  selectedId,
  onSelect,
  depth = 0,
}: {
  cat: ApiCategory | ApiSubcategory;
  selectedId: number | null;
  onSelect: (id: number) => void;
  depth?: number;
}) {
  const subs = "subcategories" in cat ? (cat.subcategories ?? []) : [];
  const isSelected = selectedId === cat.id;
  const [open, setOpen] = useState(false);

  return (
    <li>
      <div
        className="flex items-center gap-1"
        style={{ paddingLeft: `${depth * 12}px` }}
      >
        {subs.length > 0 && (
          <button
            onClick={() => setOpen((o) => !o)}
            className="text-gray-400 hover:text-gray-600 shrink-0"
          >
            <ChevronDown
              size={13}
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
        )}
        <button
          onClick={() => onSelect(cat.id)}
          className={`flex-1 text-left text-sm px-2 py-1 rounded-md transition-colors ${
            isSelected
              ? "bg-[#feee00] font-semibold text-black"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          {cat.name}
        </button>
      </div>
      {open && subs.length > 0 && (
        <ul className="mt-0.5 space-y-0.5">
          {subs.map((sub) => (
            <CategoryNode
              key={sub.id}
              cat={sub}
              selectedId={selectedId}
              onSelect={onSelect}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

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
    <div
      className={noBorder ? "px-4 py-4" : "px-4 py-4 border-b border-gray-100"}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full"
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

export default LiveFilterSidebar;
