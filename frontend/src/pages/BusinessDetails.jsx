import React from "react";
import Header from "../components/Header";
import BusinessProfile from "../components/BusinessProfile";
import { useLocation } from "react-router-dom";

const BusinessDetails = () => {
  const { state } = useLocation();
  const businessId = state?.businessId;

  return (
    <>
      <Header />
      <BusinessProfile businessId={businessId}/>
    </>
  );
};

export default BusinessDetails;
