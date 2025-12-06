import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BusinessCard from "../components/BusinessCard";
import { fetchBookmarkBusiness } from "../lib/businessController";
import { useState, useEffect } from "react";

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
    <>
      <Header />
      {business.map((item) => (
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
      ))}
      <Footer />
    </>
  );
};

export default Bookmark;
