import React, { useState, useEffect } from "react";
import { Star } from "react-feather";

const StarRating = ({
  isEditable = true,
  showRating = 0,
  onRatingChange,
  size = 20,
}) => {
  const [rating, setRating] = useState(showRating);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    setRating(showRating);
  }, [showRating]);

  const displayValue = isEditable ? hover ?? rating : showRating;

  const activeColor = "#fbbf24";
  const inactiveColor = "#e5e7eb";

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, index) => {
        const starNumber = index + 1;
        const diff = displayValue - (starNumber - 1);
        const fillPercent = Math.max(0, Math.min(diff, 1)) * 100;

        const handleRating = (value) => {
          if (isEditable) {
            setRating(value);
            if (onRatingChange) onRatingChange(value);
          }
        };

        return (
          <label
            key={index}
            className={`relative cursor-pointer transition-transform duration-200 ${isEditable ? "hover:scale-110" : ""
              }`}
            style={{ width: size, height: size }}
          >
            {isEditable && (
              <input
                type="radio"
                name="rate"
                className="hidden"
                value={starNumber}
                onClick={() => handleRating(starNumber)}
              />
            )}

            <Star
              size={size}
              color={inactiveColor}
              fill={inactiveColor}
              className="absolute top-0 left-0"
              strokeWidth={0}
            />

            {fillPercent > 0 && (
              <Star
                size={size}
                color={activeColor}
                fill={activeColor}
                className="absolute top-0 left-0 z-10"
                strokeWidth={0}
                style={{
                  clipPath: `inset(0 ${100 - fillPercent}% 0 0)`,
                }}
              />
            )}

            {isEditable && (
              <div
                className="absolute inset-0 z-20"
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