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


  useEffect(
    () => () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    },
    [],
  );

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="What are you looking for?"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="h-11 w-full rounded-md border-none bg-white pl-4 pr-12 text-sm font-medium text-gray-800 outline-none ring-0 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500"
      />

      {query ? (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-gray-400 transition-colors hover:text-gray-700"
        >
          <X size={16} />
        </button>
      ) : (
        <button
          type="button"
          onClick={handleSubmit}
          aria-label="Search"
          className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-gray-500 transition-colors hover:text-gray-700"
        >
          <Search size={18} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
