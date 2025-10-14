import React, { useState } from "react";
import HandleInsertReview from "../lib/HandleInsertReview";

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
          name="reviewImage"
          id="ReviewUploader"
          onChange={setReviewImage}
        />
      </form>
      <button
        type="submit"
        onClick={() => {
          HandleInsertReview(reviewTitle, reviewDescription, reviewImage);
          setReviewTitle("");
          setReviewDescription("");
          setReviewImage(null);
        }}
        className="w-35 h-14 bg-ivy rounded-2xl montserrat-regular text-first-frost">
        Login
      </button>
    </section>
  );
};

export default InsertReview;
