import React, { useEffect, useState } from "react";
import MapComponent from "../components/MapComponent";
import Searchbar from "./Searchbar";
import BusinessCard from "./BusinessCard";
import { fetchBusiness } from "../lib/businessController";
import useGeolocation from "../lib/useGeolocation";
import { MapPin, AlertCircle } from "react-feather";
import { fetchBusinessPrefix } from "../lib/businessController";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [business, setBusiness] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const category = searchParams.get("category") || "";
  const prefix = searchParams.get("prefix") || "";
  const location = useGeolocation();

  useEffect(() => {
    if (location.loaded && !location.error) {
      setUserLocation([location.coordinates.lat, location.coordinates.lng]);
    }
  }, [location]);

  useEffect(() => {
    if (userLocation && userLocation[0] && userLocation[1]) {
      const getBusiness = async () => {
        setIsLoading(true);
        try {
          const data = await fetchBusiness(userLocation[0], userLocation[1]);
          setBusiness(data || []);
        } catch (error) {
          console.error("Failed to fetch business", error);
        } finally {
          setIsLoading(false);
        }
      };
      getBusiness();
    }
  }, [userLocation]);

  useEffect(() => {
    if (!userLocation) return;

    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchBusinessPrefix(
          userLocation[0],
          userLocation[1],
          prefix,
          category
        );
        setBusiness(data || []);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [prefix, category, userLocation]);

  const handleSearch = (value) => {
    setSearchParams({
      prefix: value,
      ...(category ? { category: category } : {}),
    });
  };

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-gray-50 relative">
      <div className="w-full md:w-[550px] lg:w-[700px] flex flex-col h-full bg-white shadow-xl z-10 flex-shrink-0 border-r border-gray-200 transition-all duration-300">
        <div className="p-6 border-b border-gray-100 bg-white sticky top-0 z-20">
          <h2 className="text-2xl montserrat-bold text-gray-800 mb-4">
            Discover Nearby
          </h2>

          <Searchbar onSearch={handleSearch} />

          <div className="relative mt-4">
            <select
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none transition-all appearance-none pr-12 montserrat-medium cursor-pointer"
              value={category}
              onChange={(e) => {
                const selectedCategory = e.target.value;

                const newParams = {
                  ...(prefix ? { prefix } : {}), 
                };

                if (selectedCategory !== "") {
                  newParams.category = selectedCategory;
                }

                setSearchParams(newParams);
                setCategory(selectedCategory);
              }}>
              <option value="">All Categories</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Shopping">Shopping</option>
              <option value="Nightlife">Nightlife</option>
              <option value="Active Life">Active Life</option>
              <option value="Beauty & Spas">Beauty & Spas</option>
              <option value="Automotive">Automotive</option>
              <option value="Home Services">Home Services</option>
              <option value="Education">Education</option>
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {userLocation && (
            <div className="mt-3 flex items-center text-xs text-gray-500 montserrat-medium">
              <MapPin size={14} className="mr-1 text-ivy" />
              <span>Current Location Active</span>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {!location.loaded ? (
            <div className="flex flex-col items-center justify-center h-40 text-gray-400">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ivy mb-2"></div>
              <p className="text-sm">Locating you...</p>
            </div>
          ) : isLoading ? (
            [1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex gap-4 p-4 border border-gray-100 rounded-2xl animate-pulse">
                <div className="w-32 h-32 bg-gray-200 rounded-xl shrink-0"></div>
                <div className="flex-1 space-y-3 py-2">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-16 bg-gray-200 rounded w-full mt-4"></div>
                </div>
              </div>
            ))
          ) : business.length > 0 ? (
            business.map((item) => (
              <BusinessCard
                key={item._id}
                businessTitle={item.title}
                businessImage={item.imageUrl}
                businessAddress={item.address}
                businessCategory={item.category}
                businessDescription={item.description}
                businessId={item._id}
                businessRating={item.avgRating}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center px-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                <AlertCircle size={32} />
              </div>
              <h3 className="text-gray-800 montserrat-bold mb-1">
                No businesses found
              </h3>
              <p className="text-gray-500 text-sm">
                Try moving the map or changing your search area.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 h-full relative bg-gray-200">
        <MapComponent />

        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md z-[1000] border border-gray-200 md:hidden">
          <span className="text-xs font-bold text-gray-700">Map View</span>
        </div>
      </div>
    </div>
  );
};

export default Search;
