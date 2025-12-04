import React, { useState } from "react";
import { Search } from "react-feather";

const Searchbar = ({ onSearch }) => {
  const [prefix, setPrefix] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(prefix);
  };

  return (
    <form className="w-full relative" onSubmit={handleSubmit}>
      <div className="relative">
        <input
          type="search"
          placeholder="Search ..."
          className="w-full p-4 pr-14 rounded-full bg-first-frost text-chrysler-cottonwood-gray outline-none focus:ring-2 focus:ring-ivy/20 transition-all"
          value={prefix}
          onChange={(e) => setPrefix(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full text-chrysler-cottonwood-gray hover:text-ivy transition-colors">
          <Search size={20} />
        </button>
      </div>
    </form>
  );
};

export default Searchbar;
