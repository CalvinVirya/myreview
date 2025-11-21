import React, { useState } from "react";
import { insertReview } from "../lib/reviewController";

const InsertReview = () => {
  const [reviewTitle, setReviewTitle] = useState(""); // declare
  const [reviewDescription, setReviewDescription] = useState("");
  const [reviewImage, setReviewImage] = useState(null);

  return (
    <section className="w-140 m-20 flex flex-col gap-4">
      <form className="flex flex-col gap-4" action="">
        <input
          className="border-black rounded-md border"
          value={reviewTitle}
          onChange={(e) => setReviewTitle(e.target.value)}
          type="text"
        />
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
          insertReview(reviewTitle, reviewDescription, reviewImage);
          setReviewTitle("");
          setReviewDescription("");
          setReviewImage(null);
        }}
        className="w-35 h-14 bg-ivy rounded-2xl montserrat-regular text-first-frost">
        Add Review
      </button>
    </section>
  );
};

export default InsertReview;
