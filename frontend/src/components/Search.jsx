import React, { useEffect, useState } from "react";
import MapComponent from "../components/MapComponent";
import Searchbar from "./Searchbar";
import BusinessCard from "./BusinessCard";
import { fetchBusiness } from "../lib/businessController";
import useGeolocation from "../lib/useGeolocation";

const Search = () => {
  const [business, setBusiness] = useState([]);
  const [userLocation, setUserLocation] = useState([]);
  const location = useGeolocation();

  useEffect(() => {
    function fetchAddress() {
      if (location.loaded && !location.error) {
        setUserLocation([location.coordinates.lat, location.coordinates.lng]);
      }
    }
    fetchAddress();
  }, [location]);

  useEffect(() => {
    if (userLocation[0] && userLocation[1]) {
      console.log(userLocation);
      const getBusiness = async () => {
        const data = await fetchBusiness(userLocation[0], userLocation[1]);
        setBusiness(data);
      };
      getBusiness();
    }
  }, [userLocation]);

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
            businessId={business._id}
            businessRating={business.avgRating}
          />
        ))}
      </div>

      <MapComponent />
    </div>
  );
};

export default Search;
