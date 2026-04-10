import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCategories } from "../../features/categories/hooks/useCategories";
import Button from "../ui/Button";

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

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [hoveredCategoryId, setHoveredCategoryId] = useState<number | null>(
    null,
  );
  const accountRef = useRef<HTMLDivElement>(null);

  const { categories } = useCategories();
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  const catById = useMemo(
    () => new Map(categories.map((c) => [c.id, c])),
    [categories],
  );

  const { rootSlugById, subSlugById } = useMemo(() => {
    const rootSlugById = new Map<number, string>();
    const subSlugById = new Map<number, string>();
    for (const cat of categories) {
      for (const sub of cat.subcategories ?? []) {
        rootSlugById.set(sub.id, cat.slug);
        subSlugById.set(sub.id, sub.slug);
        for (const leaf of sub.subcategories ?? []) {
          rootSlugById.set(leaf.id, cat.slug);
          subSlugById.set(leaf.id, sub.slug);
        }
      }
    }
    return { rootSlugById, subSlugById };
  }, [categories]);

  const isActiveCat = (catId: number | null) => {
    if (catId === null) return pathname === "/";
    const cat = catById.get(catId);
    if (!cat) return false;
    return pathname.startsWith(`/products/${cat.slug}`);
  };

  const handleCategoryClick = (catId: number | null) => {
    if (catId === null) {
      navigate("/");
    } else {
      const cat = catById.get(catId);
      if (cat) {
        navigate(`/products/${cat.slug}`);
      } else {
        const rootSlug = rootSlugById.get(catId);
        const subSlug = subSlugById.get(catId);
        if (rootSlug && subSlug) {
          navigate(`/products/${rootSlug}/${subSlug}?category_id=${catId}`);
        }
      }
    }
    setHoveredCategoryId(null);
    setDrawerOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        accountRef.current &&
        !accountRef.current.contains(e.target as Node)
      ) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mega-menu on route change
  useEffect(() => {
    setHoveredCategoryId(null);
  }, [pathname, search]);

  const hoveredCategory = categories.find((c) => c.id === hoveredCategoryId);

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
            <Button
              key={cat.id}
              variant="chip"
              size="sm"
              data-active={isActiveCat(cat.id)}
              onClick={() => handleCategoryClick(cat.id)}
              onMouseEnter={() => setHoveredCategoryId(cat.id)}
              className="whitespace-nowrap shrink-0"
            >
              {cat.name}
            </Button>
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
              <svg
                width="24"
                height="26"
                viewBox="0 0 24 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.47705 19.9148L15.5232 12.8686L8.47705 5.82251"
                  stroke="#464B57"
                  strokeWidth="1.8"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
