import React, { useEffect, useState } from "react";
import ReviewBox from "./ReviewBox";
import HandleListReview from "../lib/HandleListReview";

const RecentReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const fetchReviews = await HandleListReview();
        setReviews(fetchReviews);
      } catch (error) {
        console.error("Failed to load reviews:", error);
      }
    };
    getReviews();
  }, []);

  return (
    <section className="mx-12 flex flex-col gap-8 items-center">
      <div className="flex justify-center">
        <p className="montserrat-semibold text-[48px] text-black mt-20">
          Recent Reviews
        </p>
      </div>
      <div className="grid grid-flow-row grid-cols-4 gap-6 items-start">
        {reviews.map((review) => (
          <ReviewBox
            key={review.$id}
            reviewImage={review.imageLink}
            reviewTitle={review.title}
            reviewDescription={review.description}
          />
        ))}
      </div>
    </section>
  );
};

export default RecentReviews;
