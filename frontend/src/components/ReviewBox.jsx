import React from "react";
import { ThumbsUp, Frown, Award } from "react-feather";

const ReviewBox = ({
  profilePicture = null,
  userImage = "",
  username = "No Username",
  uploadTIme = "No Upload Time",
  reviewTitle = "No Title",
  reviewDescription = "No Description",
  reviewImage = null,
}) => {
  return (
    // TODO: disini masih ada yang harus dibenerin karena kalo dikecilin dia gepeng nanti
    <div className="border border-khaki-linen rounded-2xl">
      <div className="flex items-center gap-2 py-6">
        <img
          className="rounded-full object-cover w-16 h-16 ml-6"
          src={userImage}
          alt=""
        />
        <div>
          <p className="montserrat-regular">{username}</p>
          <p className="text-chrysler-cottonwood-gray text-sm">{uploadTIme}</p>
        </div>
      </div>
      {reviewImage && (
        <img className="h-40 object-contain w-full" src={reviewImage} alt="" />
      )}

      <div className="mx-6 mt-4 flex flex-col gap-2">
        <p className="montserrat-semibold">{reviewTitle}</p>
        <div className="bg-gray-400 h-5"></div>
        <p className="montserrat-regular text-sm line-clamp-3">
          {reviewDescription}
        </p>
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
