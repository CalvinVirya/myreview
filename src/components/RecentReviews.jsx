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
        <p className="montserrat-semibold text-3xl text-black mt-20">
          Recent Reviews
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start">
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
