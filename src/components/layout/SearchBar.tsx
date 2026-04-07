import { useState, useEffect, useRef } from "react";
import type { KeyboardEvent } from "react";
import { Search, X } from "lucide-react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const isProductsPage = pathname === "/products";

  const [query, setQuery] = useState(() =>
    isProductsPage ? (searchParams.get("q") ?? "") : "",
  );
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);


  useEffect(() => {
    if (isProductsPage) {
      setQuery(searchParams.get("q") ?? "");
    }
  }, [searchParams, isProductsPage]);

  // Clear input when navigating away from /products
  useEffect(() => {
    if (!isProductsPage) setQuery("");
  }, [isProductsPage]);

  const doSearch = (q: string) => {
    const trimmed = q.trim();
    if (isProductsPage) {
      const next = new URLSearchParams(searchParams);
      if (trimmed) next.set("q", trimmed);
      else next.delete("q");
      next.delete("page");
      navigate(`/products?${next.toString()}`, { replace: true });
    } else {
      if (trimmed) navigate(`/products?q=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(val), 400);
  };

  const handleSubmit = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    doSearch(query);
  };

  const handleClear = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setQuery("");
    if (isProductsPage) {
      const next = new URLSearchParams(searchParams);
      next.delete("q");
      navigate(`/products?${next.toString()}`, { replace: true });
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  // Cleanup on unmount
  useEffect(
    () => () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    },
    [],
  );

  return (
    <div className="flex items-center bg-white rounded-md overflow-hidden h-10 shadow-sm">
      <div className="relative flex-1 flex items-center">
        <input
          type="text"
          placeholder="What are you looking for?"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full pl-4 pr-8 h-10 outline-none text-sm text-gray-700 placeholder:text-gray-400"
        />
        {query && (
          <button
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute right-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>
      <button
        onClick={handleSubmit}
        aria-label="Search"
        className="bg-black text-[#feee00] px-4 h-full flex items-center justify-center hover:bg-gray-900 transition-colors shrink-0"
      >
        <Search size={18} />
      </button>
    </div>
  );
}

export default SearchBar;
