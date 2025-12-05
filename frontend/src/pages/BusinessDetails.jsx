import React from "react";
import Header from "../components/Header";
import BusinessProfile from "../components/BusinessProfile";
import { useSearchParams } from "react-router-dom";

const BusinessDetails = () => {
  const [searchParams] = useSearchParams();
  const businessId = searchParams.get("businessId");

  return (
    <>
      <Header />
      <BusinessProfile businessId={businessId} />
    </>
  );
};

export default BusinessDetails;
