import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import RecentReviews from "../components/RecentReviews";
import Footer from "../components/Footer";
import Categories from "../components/Categories";
import InsertReview from "../components/InsertReview";
import { HandleGetUser } from "../lib/AuthController";

const Home = () => {
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userId = sessionStorage.getItem("userId");
        console.log(userId);
        if (!userId) {
          await HandleGetUser();
        }
      } catch (err) {
        console.log(err);
      }
    };

    checkAuth();
  }, []);

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
