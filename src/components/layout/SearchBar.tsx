import { useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import { Search } from "lucide-react";

function SearchBar() {
  const [query, setQuery] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query.trim()) {
      console.log("Search:", query);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex items-center bg-white rounded-md overflow-hidden h-10 shadow-sm">
      <input
        type="text"
        placeholder="What are you looking for?"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="flex-1 px-4 h-full outline-none text-sm text-gray-700 placeholder:text-gray-400"
      />
      <button
        onClick={handleSearch}
        aria-label="Search"
        className="bg-black text-[#feee00] px-4 h-full flex items-center justify-center hover:bg-gray-900 transition-colors"
      >
        <Search size={18} />
      </button>
    </div>
  );
}

export default SearchBar;
