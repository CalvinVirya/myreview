import React from "react";
import StarRating from "./StarRating";

const BusinessReviews = ({
  userImage = null,
  username = "No Username",
  uploadTIme = "No Upload Time",
  reviewTitle = "No Title",
  reviewDescription = "No Description",
  reviewImage = null,
  rating = 0,
}) => {
  return (
    <div className="h-[20rem] w-[42.625rem] flex flex-row justify-center bg-khaki-linen p-4 rounded-[1rem] mb-[1rem]">
      <img
        src={reviewImage}
        alt=""
        className="object-cover w-[17rem] h-[17rem] ml-6"
      />
      <div className="flex flex-col justify-center gap-[0.5rem]">
        <p className="font-semibold text-[1.5rem]">{reviewTitle}</p>
        <StarRating isEditable={false} showRating={rating} />
        <p className="text-[0.875rem]">{reviewDescription}</p>
      </div>
    </div>
  );
};

export default BusinessReviews;
