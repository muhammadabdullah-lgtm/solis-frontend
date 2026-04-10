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




      <div className="flex-1 min-w-0 mx-2 md:mx-0">
          <div className="flex items-center bg-white rounded-xl border border-black/[0.07] h-11 px-4 gap-3 w-full">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <path fillRule="evenodd" clipRule="evenodd" d="M2.4457 8.08609C2.4457 4.86959 5.0532 2.2621 8.26971 2.2621C11.4862 2.2621 14.0937 4.86959 14.0937 8.08609C14.0937 11.3026 11.4862 13.9101 8.26971 13.9101C5.0532 13.9101 2.4457 11.3026 2.4457 8.08609ZM8.26971 0.5C4.08001 0.5 0.683594 3.89641 0.683594 8.08609C0.683594 12.2758 4.08001 15.6722 8.26971 15.6722C10.0468 15.6722 11.6811 15.0611 12.9741 14.0377L16.8135 18.1564C17.2304 18.6036 17.935 18.6159 18.3673 18.1836C18.7995 17.7513 18.7872 17.0467 18.34 16.6299L14.2213 12.7906C15.2448 11.4975 15.8558 9.86318 15.8558 8.08609C15.8558 3.89641 12.4594 0.5 8.26971 0.5Z" fill="#101628"/>
            </svg>
            <input
              type="text"
               onChange={handleChange}
        onKeyDown={handleKeyDown}
              placeholder='Search for "Sunscreen"'
              className="flex-1 min-w-0 font-figtree text-[16px] text-[#101628] placeholder:text-[#101628]/60 outline-none bg-transparent"
            />
          </div>
        </div>



    // <div className="relative">
    //   <input
    //     type="text"
    //     placeholder="What are you looking for?"
    //     value={query}
    //     onChange={handleChange}
    //     onKeyDown={handleKeyDown}
    //     className="h-11 w-full rounded-md border-none bg-white pl-4 pr-12 text-sm font-medium text-gray-800 outline-none ring-0 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500"
    //   />

    //   {query ? (
    //     <button
    //       type="button"
    //       onClick={handleClear}
    //       aria-label="Clear search"
    //       className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-gray-400 transition-colors hover:text-gray-700"
    //     >
    //       <X size={16} />
    //     </button>
    //   ) : (
    //     <button
    //       type="button"
    //       onClick={handleSubmit}
    //       aria-label="Search"
    //       className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-gray-500 transition-colors hover:text-gray-700"
    //     >
    //       <Search size={18} />
    //     </button>
    //   )}
    // </div>
  );
}

export default SearchBar;
