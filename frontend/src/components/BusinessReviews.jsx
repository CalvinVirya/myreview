import React from "react";
import StarRating from "./StarRating";
import { User } from "react-feather";

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
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col gap-4 hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
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
          <div className="flex flex-col">
            <h4 className="font-bold text-gray-900 text-sm">{username}</h4>
            <span className="text-xs text-gray-400">
              {new Date(uploadTIme).toLocaleDateString() !== "Invalid Date"
                ? new Date(uploadTIme).toLocaleDateString()
                : uploadTIme}
            </span>
          </div>
        </div>
        <div className="bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100/50">
          <StarRating isEditable={false} showRating={rating} />
        </div>
      </div>

      <div className="flex-1">
        <h3 className="font-bold text-gray-800 mb-2 text-base">
          {reviewTitle}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
          {reviewDescription}
        </p>
      </div>

      {reviewImage && (
        <div className="mt-2 rounded-xl overflow-hidden h-48 border border-gray-100 bg-gray-50 group">
          <img
            src={reviewImage}
            alt="Review"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
    </div>
  );
};

export default BusinessReviews;
