import React from "react";
import ReviewBox from "./ReviewBox";

const RecentReviews = () => {
  return (
    <section className="mx-12 flex flex-col gap-8">
      <div className="flex justify-center">
        <p className="montserrat-semibold text-[48px] text-black mt-20">
          Recent Reviews
        </p>
      </div>
      <ReviewBox />
    </section>
  );
};

export default RecentReviews;
