import React from "react";
import { Search } from "react-feather";

const Searchbar = () => {
  return (
    <form className="w-110 relative">
      <div className="relative">
        <input
          type="search"
          placeholder="Search ..."
          className="w-full p-4 rounded-full bg-first-frost text-chrysler-cottonwood-gray"
        />
        <button className="absolute right-1 top-0.5 -translate-0.5 p-4 bg-first-frost rounded-full text-chrysler-cottonwood-gray">
          <Search />
        </button>
      </div>
      {/* <div className="absolute top-20 p-4 bg-first-frost text-chrysler-cottonwood-gray w-full rounded-xl left-0.5 -translate-0.5 flex flex-col gap-2">
      </div> */}
    </form>
  );
};

export default Searchbar;
