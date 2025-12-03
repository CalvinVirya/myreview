import React, { useEffect, useState } from "react";
import MapComponent from "../components/MapComponent";
import Searchbar from "./Searchbar";
import BusinessCard from "./BusinessCard";
import { fetchBusiness } from "../lib/businessController";
import useGeolocation from "../lib/useGeolocation";
import { MapPin, AlertCircle } from "react-feather";

const Search = () => {
  const [business, setBusiness] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-gray-50 relative">
      {/* Left Sidebar: List Area 
        Width diperbesar: md:w-[550px] dan lg:w-[700px] 
        Agar list lebih lega dan peta lebih kecil.
      */}
      <div className="w-full md:w-[550px] lg:w-[700px] flex flex-col h-full bg-white shadow-xl z-10 flex-shrink-0 border-r border-gray-200 transition-all duration-300">
        
        {/* Fixed Search Header */}
        <div className="p-6 border-b border-gray-100 bg-white sticky top-0 z-20">
          <h2 className="text-2xl montserrat-bold text-gray-800 mb-4">Discover Nearby</h2>
          <Searchbar />
          
          {userLocation && (
            <div className="mt-3 flex items-center text-xs text-gray-500 montserrat-medium">
              <MapPin size={14} className="mr-1 text-ivy" />
              <span>Current Location Active</span>
            </div>
          )}
        </div>

        {/* Scrollable List Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {!location.loaded ? (
             // Geolocation Loading
             <div className="flex flex-col items-center justify-center h-40 text-gray-400">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ivy mb-2"></div>
               <p className="text-sm">Locating you...</p>
             </div>
          ) : isLoading ? (
            // Data Loading Skeleton
            [1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 p-4 border border-gray-100 rounded-2xl animate-pulse">
                <div className="w-32 h-32 bg-gray-200 rounded-xl shrink-0"></div>
                <div className="flex-1 space-y-3 py-2">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-16 bg-gray-200 rounded w-full mt-4"></div>
                </div>
              </div>
            ))
          ) : business.length > 0 ? (
            // Business List
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
            // Empty State
            <div className="flex flex-col items-center justify-center h-64 text-center px-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                <AlertCircle size={32} />
              </div>
              <h3 className="text-gray-800 montserrat-bold mb-1">No businesses found</h3>
              <p className="text-gray-500 text-sm">Try moving the map or changing your search area.</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Area: Map */}
      <div className="flex-1 h-full relative bg-gray-200">
        <MapComponent />
        
        {/* Mobile Toggle Hint */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md z-[1000] border border-gray-200 md:hidden">
          <span className="text-xs font-bold text-gray-700">Map View</span>
        </div>
      </div>
    </div>
  );
};

export default Search;