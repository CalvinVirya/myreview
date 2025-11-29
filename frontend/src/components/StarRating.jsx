import React, { useState } from "react";
import { Star } from "react-feather";

const StarRating = ({ isEditable = true, showRating = 0, onRatingChange }) => {
  const [rating, setRating] = useState(showRating);
  const [hover, setHover] = useState(null);

  const displayValue = isEditable ? hover ?? rating : showRating;

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const starNumber = index + 1;

        const diff = displayValue - (starNumber - 1);
        const fillPercent = Math.max(0, Math.min(diff, 1)) * 100;

        const handleRating = (value) => {
          setRating(value);

          if (onRatingChange) {
            onRatingChange(value);
          }
        };

        return (
          <label key={index} className="relative w-6 h-6 cursor-pointer">
            {isEditable && (
              <input
                type="radio"
                name="rate"
                className="hidden"
                value={starNumber}
                onClick={() => handleRating(starNumber)}
              />
            )}

            <Star color="grey" fill="grey" className="absolute top-0 left-0" />

            {fillPercent > 0 && (
              <Star
                color="yellow"
                fill="yellow"
                className="absolute top-0 left-0"
                style={{
                  clipPath: `inset(0 ${100 - fillPercent}% 0 0)`,
                }}
              />
            )}

            {isEditable && (
              <div
                className="absolute inset-0"
                onMouseEnter={() => setHover(starNumber)}
                onMouseLeave={() => setHover(null)}
              />
            )}
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
