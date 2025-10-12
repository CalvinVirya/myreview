import React from "react";
import { ThumbsUp, Frown, Award } from "react-feather";

const ReviewBox = ({
  reviewTitle = "No Title",
  reviewDescription = "No Description",
}) => {
  return (
    <div className="border-khaki-linen border-1 w-100 rounded-2xl">
      <div className="flex items-center gap-2 py-6">
        <img
          className="rounded-full object-cover w-16 h-16 ml-6"
          src="https://images.pexels.com/photos/3619972/pexels-photo-3619972.jpeg"
          alt=""
        />
        <div>
          <p className="montserrat-regular">Rayden Blezworth Arwan</p>
          <p className="text-chrysler-cottonwood-gray text-sm">1 minutes ago</p>
        </div>
      </div>
      <img
        className="h-40 w-full object-cover"
        src="https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg"
        alt=""
      />
      <div className="mx-6 mt-4 flex flex-col gap-2">
        <p className="montserrat-semibold">{reviewTitle}</p>
        <div className="bg-gray-400 h-5"></div>
        <p className="montserrat-regular text-sm line-clamp-3">{reviewDescription}</p>
      </div>
      <div className="flex justify-around h-18 items-center border-t-1 border-khaki-linen mt-4 rounded-b-2xl">
        <ThumbsUp />
        <Frown />
        <Award />
      </div>
    </div>
  );
};

export default ReviewBox;
