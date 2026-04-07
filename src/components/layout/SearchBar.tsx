import { useState, useEffect, useRef } from "react";
import type { KeyboardEvent } from "react";
import { Search, X } from "lucide-react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import Button from "../ui/Button";
import Input from "../ui/Input";

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
          <Button
  variant="ghost"
  size="sm"
  onClick={handleClear}
  aria-label="Clear search"
  className="
    absolute right-2 
    p-0 m-0 
    text-gray-400 hover:text-gray-600 
    hover:bg-transparent
    rounded-none
    w-auto h-auto
    min-w-0
  "
>
  <X size={14} />
</Button>
     
        )}
      </div>
      <Button
        variant="dark"
        onClick={handleSubmit}
        aria-label="Search"
        className="h-full rounded-none shrink-0"
      >
        <Search size={18} />
      </Button>
    </div>
  );
}

export default SearchBar;
