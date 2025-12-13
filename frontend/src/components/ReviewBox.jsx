import React from "react";
import { ThumbsUp, Smile, Award, User } from "react-feather";
import StarRating from "./StarRating";

const ReviewBox = ({
  userImage = null,
  username = "No Username",
  uploadTIme = "No Upload Time",
  reviewTitle = "No Title",
  reviewDescription = "No Description",
  reviewImage = null,
  rating = 0,
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      <div className="flex items-center gap-4 mb-4">
        <div
          className="w-12 h-12 rounded-full border-2 border-white shadow-md bg-gray-200
                overflow-hidden flex items-center justify-center">
          {userImage ? (
            <img
              src={userImage}
              alt={username}
              className="w-full h-full object-cover"
            />
          ) : (
            <User size={20} className="text-serpentine" />
          )}
        </div>
        <div className="flex-grow min-w-0">
          <h4 className="montserrat-bold text-gray-800 text-sm truncate">
            {username}
          </h4>
          <p className="text-xs text-gray-400 montserrat-medium truncate">
            {uploadTIme}
          </p>
        </div>
      </div>

      <div className="mb-4 flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <StarRating isEditable={false} showRating={rating} size={18} />
          <span className="text-xs font-bold text-gray-400 mt-0.5">
            • {rating.toFixed(1)}
          </span>
        </div>

        {reviewTitle && (
          <h3 className="montserrat-bold text-lg text-gray-800 mb-2 leading-tight line-clamp-1">
            {reviewTitle}
          </h3>
        )}

        <p className="text-gray-600 text-sm montserrat-regular leading-relaxed line-clamp-4">
          {reviewDescription}
        </p>
      </div>

      {reviewImage && (
        <div className="mb-5 rounded-2xl overflow-hidden h-48 w-full relative group cursor-pointer">
          <img
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            src={reviewImage}
            alt="Review"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
        </div>
      )}

      <div className="mt-auto pt-4 border-t border-dashed border-gray-200 flex justify-between items-center px-1">
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all duration-200 group">
          <ThumbsUp
            size={16}
            className="group-hover:scale-110 transition-transform stroke-2"
          />
          <span className="text-xs font-bold montserrat-medium">Useful</span>
        </button>

        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all duration-200 group">
          <Smile
            size={16}
            className="group-hover:scale-110 transition-transform stroke-2"
          />
          <span className="text-xs font-bold montserrat-medium">Funny</span>
        </button>

        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all duration-200 group">
          <Award
            size={16}
            className="group-hover:scale-110 transition-transform stroke-2"
          />
          <span className="text-xs font-bold montserrat-medium">Cool</span>
        </button>
      </div>
    </div>
  );
};

export default ReviewBox;
