import React, { useState } from "react";
import { insertReview } from "../lib/reviewController";
import { X } from "react-feather";
import StarRating from "./StarRating";

const InsertReview = ({
  isVisible,
  onClose,
  businessId = "No Business Id",
  businessTitle = "No Title",
}) => {
  const [reviewDescription, setReviewDescription] = useState("");
  const [reviewImage, setReviewImage] = useState(null);
  const [rating, setRating] = useState(0);

  if (!isVisible) return null;

  const handleRatingChange = (value) => {
    setRating(value);
  };

  return (
    <div className="fixed inset-0 bg-black/25 backdrop-blur-sm flex justify-center items-center z-2">
      <div className="w-[600px] flex flex-col gap-1">
        <button className="place-self-end" onClick={() => onClose()}>
          <X color="white" />
        </button>
        <div className="bg-white p-2 rounded">
          <StarRating
            isEditable={true}
            showRating={0}
            onRatingChange={handleRatingChange}
          />
          <form className="flex flex-col gap-4" action="">
            <input
              className="border-black rounded-md border"
              value={reviewDescription}
              onChange={(e) => setReviewDescription(e.target.value)}
              type="text"
            />
            <input
              type="file"
              accept="image/*"
              name="reviewImage"
              id="ReviewUploader"
              onChange={(e) => setReviewImage(e.target.files[0])}
            />
          </form>
          <button
            type="submit"
            onClick={() => {
              // HandleInsertReview(reviewTitle, reviewDescription, reviewImage);
              console.log(reviewImage);
              insertReview(
                businessTitle,
                reviewDescription,
                reviewImage,
                businessId,
                rating
              );
              setReviewDescription("");
              setReviewImage(null);
            }}
            className="w-35 h-14 bg-ivy rounded-2xl montserrat-regular text-first-frost">
            Add Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsertReview;
