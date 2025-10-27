import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import RecentReviews from "../components/RecentReviews";
import Footer from "../components/Footer";
import Categories from "../components/Categories";
import InsertReview from "../components/InsertReview";

const Home = () => {

  return (
    <>
      <Hero />
      <RecentReviews />
      <Categories />
      <InsertReview />
      <Footer />
    </>
  );
};

export default Home;
