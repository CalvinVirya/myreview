import React, { useEffect, useState } from "react";
import MapComponent from "../components/MapComponent";
import Searchbar from "./Searchbar";
import BusinessCard from "./BusinessCard";
import { fetchBusiness } from "../lib/businessController";

const Search = () => {
  const [business, setBusiness] = useState([]);

  useEffect(() => {
    const getBusiness = async () => {
      const data = await fetchBusiness();
      setBusiness(data);
    };
    getBusiness();
  }, []);

  return (
    <div className="flex">
      <div className="flex flex-col items-center px-32">
        <Searchbar />
        {business.map((business) => (
          <BusinessCard
            key={business._id}
            businessTitle={business.title}
            businessImage={business.imageUrl}
            businessAddress={business.address}
            businessCategory={business.category}
            businessDescription={business.description}
          />
        ))}
      </div>

      <MapComponent />
    </div>
  );
};

export default Search;
