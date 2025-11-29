import React, { useEffect, useState } from "react";
import ReviewBox from "./ReviewBox";
import { fetchReviews } from "../lib/reviewController";

const RecentReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      const data = await fetchReviews(); // tunggu hasil
      setReviews(data); // baru set state
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
            key={review._id}
            username={review.name}
            userImage={review.userImage}
            uploadTIme={review.dateCreated}
            reviewImage={review.imageUrl}
            reviewTitle={review.title}
            reviewDescription={review.description}
            rating={review.rating}
          />
        ))}
      </div>
    </section>
  );
};

export default RecentReviews;
