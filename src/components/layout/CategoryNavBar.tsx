import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const categories = [
  "Electronics",
  "Beauty & Fragrance",
  "Home & Kitchen",
  "Grocery",
  "Men's Fashion",
  "Women's Fashion",
  "Baby",
  "Toys",
  "Kids' Fashion",
  "Sports & Outdoors",
  "Health & Nutrition",
  "Stationery",
  "Books & Media",
  "Automotive",
  "Food",
];

export default function CategoryNav() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showRight, setShowRight] = useState(true);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  const scrollRight = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <nav className="bg-white  border-b border-[#D0D4DD] w-full">
      <div className="relative flex items-center px-4 md:px-[24px] h-[45px] w-[70%]">
        {/* Scrollable categories */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className=" flex items-center overflow-x-auto scrollbar-hide h-full px-4 md:px-[24px] gap-5"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/category/${cat.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              className="font-figtree font-semibold text-[15px] text-[#101628] whitespace-nowrap tracking-[0.2px] hover:text-[#101628]/70 transition-colors flex-shrink-0"
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Right scroll button - fades out when no more content */}
        {showRight && (
          <div className="absolute right-0 top-0 h-full flex items-center pointer-events-none">
            <div className="w-16 h-full bg-gradient-to-r from-transparent to-white" />
            <button
              className="pointer-events-auto flex items-center justify-center w-10 h-full bg-white"
              onClick={scrollRight}
              aria-label="Scroll categories right"
            >
              <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.47705 19.9148L15.5232 12.8686L8.47705 5.82251" stroke="#464B57" strokeWidth="1.8"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
