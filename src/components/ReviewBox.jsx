import React from "react";
import { ThumbsUp, Frown, Award } from "react-feather";

const ReviewBox = () => {
  return (
    <div className="bg-khaki-linen w-106 rounded-2xl">
      <div className="flex items-center gap-2 py-6">
        <img
          className="rounded-full object-cover w-16 h-16 mx-6"
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
        <p className="montserrat-semibold">Warung Bude Binus</p>
        <div className="bg-white h-5"></div>
        <p className="montserrat-regular text-sm">
          Wah enak banget cuy, tapi agak bau rokok ya... cuman kalo kalian cari
          makanan yang murah dan bergizi telor dadar disini enak banget rasanya.
        </p>
      </div>
      <div className="flex justify-around h-18 items-center bg-first-frost mt-4 rounded-b-2xl">
        <ThumbsUp />
        <Frown />
        <Award />
      </div>
    </div>
  );
};

export default ReviewBox;
