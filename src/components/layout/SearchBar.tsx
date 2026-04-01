import { useState } from "react";
import type {ChangeEvent} from "react";
import { Search } from "lucide-react";

function SearchBar() {
  const [query, setQuery] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex items-center bg-white rounded-md overflow-hidden shadow-sm">
      
      <input
        type="text"
        placeholder="What are you looking for?"
        value={query}
        onChange={handleChange}
        className="w-full px-4 py-2 outline-none text-sm"
      />

      <button className="bg-black text-white px-4 py-2 flex items-center justify-center">
        <Search size={18} />
      </button>
    </div>
  );
}

export default SearchBar;