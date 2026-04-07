import { useState } from "react";


import type { ApiCategory } from "../../services/categories.service";
import type { ApiBrand } from "../../services/brands.service";
import RatingSlider from "../common/RatingSlider";
import CategoryNode from "./CategoryNode";
import AccordionSection from "../common/AccordionSection";
import { Search, XCircle } from "lucide-react";
import Button from "../ui/Button";

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

const LiveFilterSidebar = ({
  categories,
  brands,
  draft,
  onCategorySelect,
  onBrandToggle,
  onPriceChange,
  onRatingSelect,
  onApply,
  onClearAll,
}: Props) => {
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

          <Button
  variant="ghost"
  size="sm"
  onClick={onClearAll}
  className="
    text-xs text-red-500 hover:text-red-600 
    font-medium
    p-0 m-0
    hover:bg-transparent
    rounded-none
    w-auto h-auto
    min-w-0
  "
>
  <XCircle size={12} />
  Clear All
</Button>
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







export default LiveFilterSidebar;
