import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BusinessCard from "../components/BusinessCard";
import { fetchBookmarkBusiness } from "../lib/businessController";
import { useState, useEffect } from "react";
import { Bookmark as BookmarkIcon, Heart, Layout } from "react-feather";

const Bookmark = () => {
  const [business, setBusiness] = useState([]);

  useEffect(() => {
    const getBusiness = async () => {
      try {
        const data = await fetchBookmarkBusiness();
        setBusiness(data);
      } catch (error) {
        console.log(error);
      }
    };
    getBusiness();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-montserrat-regular">
      <Header />

      <div className="relative bg-gradient-to-r from-serpentine to-ivy pt-28 pb-28 md:pt-32 md:pb-32 px-4 sm:px-6 lg:px-8 shadow-xl overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-4">
            <div className="w-full md:w-auto">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-1.5 rounded-full text-white/90 text-xs md:text-sm font-medium mb-4 border border-white/20">
                <Heart size={14} className="fill-current" />
                <span>Saved Collection</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-montserrat-bold text-white mb-2 tracking-tight">
                Saved
              </h1>
              <p className="text-white/80 max-w-xl text-base md:text-lg font-montserrat-medium leading-relaxed">
                A list of favorite places you want to visit or review again.
              </p>
            </div>
            
            <div className="w-full md:w-auto text-white/90 font-montserrat-semibold bg-white/20 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 flex items-center justify-between md:justify-center">
              <div className="flex items-center">
                <span className="text-2xl md:text-3xl">{business.length}</span>
                <span className="text-sm ml-2 font-normal opacity-80">Saved Items</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
            <BookmarkIcon size={300} className="text-white transform -rotate-12 translate-x-20 -translate-y-20" />
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-20 relative z-20 pb-20">
        
        {business.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {business.map((item, index) => (
              <div 
                key={item._id} 
                style={{ animationDelay: `${index * 100}ms` }}
                className="hover:-translate-y-1 transition-transform duration-300"
              >
                <BusinessCard
                  businessTitle={item.title}
                  businessImage={item.imageUrl}
                  businessAddress={item.address}
                  businessCategory={item.category}
                  businessDescription={item.description}
                  businessId={item._id}
                  businessRating={item.avgRating}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 text-center flex flex-col items-center justify-center min-h-[300px] md:min-h-[400px]">
            <div className="bg-gray-50 p-6 rounded-full mb-6">
              <Layout size={48} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-montserrat-bold text-gray-800 mb-2">
              No Saved Collection
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-8 text-sm md:text-base">
              Find exciting places near you and save them here for easy access anytime.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Bookmark;