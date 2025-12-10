import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Search from "../components/Search";
import { useSearchParams } from "react-router-dom";

const Nearby = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  return (
    <div>
      <Header />
      <Search />
      <Footer />
    </div>
  );
};

export default Nearby;
