import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { ApiCategory, ApiSubcategory } from "../../services/categories.service";

const  CategoryNode = ({
  cat,
  selectedId,
  onSelect,
  depth = 0,
}: {
  cat: ApiCategory | ApiSubcategory;
  selectedId: number | null;
  onSelect: (id: number) => void;
  depth?: number;
}) => {
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




export default CategoryNode;