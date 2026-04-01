import { useState } from "react";

interface Category {
  name: string;
  subcategories: string[];
}

const categories: Category[] = [
  {
    name: "Electronics",
    subcategories: ["Mobiles", "Laptops", "Headphones", "Cameras"],
  },
  {
    name: "Men's Fashion",
    subcategories: ["T-Shirts", "Shoes", "Watches"],
  },
  {
    name: "Women's Fashion",
    subcategories: ["Dresses", "Handbags", "Makeup"],
  },
];

function CategoriesMenu() {
  const [active, setActive] = useState<Category | null>(null);

  return (
    <div
      className="bg-white border-b relative"
      onMouseLeave={() => setActive(null)} // 🔥 important
    >
      {/* Top Row */}
      <div className="flex gap-6 px-6 py-3 text-sm font-medium">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onMouseEnter={() => setActive(cat)}
            className="cursor-pointer"
          >
            {cat.name}
          </div>
        ))}
      </div>

      {active && (
        <div className="absolute left-0 top-full w-full bg-white shadow-lg p-6 grid grid-cols-4 gap-4 z-50">
          {active.subcategories.map((sub) => (
            <div
              key={sub}
              className="text-gray-600 hover:text-black cursor-pointer"
            >
              {sub}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoriesMenu;