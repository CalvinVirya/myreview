import React from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import { MapPin } from "react-feather";

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
    <Link to={`/business-details?businessId=${businessId}`} className="block w-full group mb-4">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 h-auto md:h-52">
        
        <div className="w-full md:w-64 h-48 md:h-full relative shrink-0 overflow-hidden bg-gray-200">
          {businessImage ? (
            <img
              src={businessImage}
              alt={businessTitle}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-medium">
              No Image
            </div>
          )}
          <div className="absolute top-3 left-3 md:hidden">
            <span className="px-2 py-1 bg-white/90 backdrop-blur text-xs font-bold text-gray-700 rounded-md shadow-sm">
              {businessCategory}
            </span>
          </div>
        </div>

        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-ivy transition-colors line-clamp-1 pr-2">
                {businessTitle}
              </h3>
              <span className="hidden md:inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full whitespace-nowrap">
                {businessCategory}
              </span>
            </div>
            
            <div className="mb-2">
              <StarRating isEditable={false} showRating={businessRating} />
            </div>

            <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
              <MapPin size={14} className="text-ivy shrink-0" />
              <p className="line-clamp-1">{businessAddress}</p>
            </div>
          </div>

          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {businessDescription}
            </p>
          </div>
        </div>

      </div>
    </Link>
  );
};

export default BusinessCard;