import React from "react";
import Hero from "../components/Hero";
import RecentReviews from "../components/RecentReviews";
import Footer from "../components/Footer";
import Categories from "../components/Categories";

const Home = () => {
  return (
    <>
      <Hero />
      <RecentReviews />
      <Categories />
      <Footer />
    </>
  );
};

export default Home;
