import React from "react";
import Hero from "../components/Hero";
import RecentReviews from "../components/RecentReviews";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Hero />
      <RecentReviews />
      <Footer />
      {/* <Modal /> */}
      {/* <InsertReview />
      <InsertAccount /> */}
    </>
  );
};

export default Home;
