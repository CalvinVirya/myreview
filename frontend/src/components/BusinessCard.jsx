import React, { useState } from "react";
import logo from "../assets/logo.svg";
import { Link, useLocation } from "react-router-dom";
import StarRating from "./StarRating";

const BusinessCard = ({
  businessTitle = "No Name",
  businessImage = null,
  businessDescription = "No Description",
  businessAddress = "No Address",
  businessCategory = "No Category",
  businessId = "No Id",
  businessRating = 0,
}) => {
  return (
    <Link to="/business-details" state={{ businessId }}>
      <div className="h-[20rem] w-[42.625rem] flex flex-row justify-center bg-khaki-linen p-4 rounded-[1rem] mb-[1rem]">
        <img
          src={businessImage}
          alt=""
          className="object-cover w-[17rem] h-[17rem] ml-6"
        />
        <div className="flex flex-col justify-center gap-[0.5rem]">
          <p className="font-semibold text-[1.5rem]">{businessTitle}</p>
          <StarRating isEditable={false} showRating={businessRating} />
          <p className="text-[0.875rem]">{businessAddress}</p>
          <div className="bg-first-frost rounded-[0.5rem]">
            <p className="text-[0.875rem] line-clamp-3 m-[1rem]">
              {businessDescription}
            </p>
          </div>
          <div className="bg-first-frost rounded-[0.5rem]">
            <p className="text-[0.875rem] m-[0.5rem]">{businessCategory}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BusinessCard;
