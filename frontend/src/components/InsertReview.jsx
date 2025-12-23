import React, { useState } from "react";
import { insertReview } from "../lib/reviewController";
import { X, Image, Star, UploadCloud } from "react-feather";
import StarRating from "./StarRating";
import toast from "react-hot-toast";

const InsertReview = ({
  isVisible,
  onClose,
  businessId = "No Business Id",
  businessTitle = "No Title",
  username = "No Username",
  userImage = null,
  onReviewAdded,
}) => {
  const [reviewDescription, setReviewDescription] = useState("");
  const [reviewImage, setReviewImage] = useState(null);
  const [rating, setRating] = useState(0);

  if (!isVisible) return null;

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const optimisticReview = {
      _id: Date.now(), // temp id
      title: businessTitle,
      description: reviewDescription,
      rating,
      imageUrl: reviewImage ? URL.createObjectURL(reviewImage) : null,
      dateCreated: new Date(),
      name: username,
      userImage: userImage,
    };

    // 🔥 update UI langsung
    onReviewAdded?.(optimisticReview);

    onClose();
    setReviewDescription("");
    setReviewImage(null);
    setRating(0);

    try {
      const result = await insertReview(
        businessTitle,
        reviewDescription,
        reviewImage,
        businessId,
        rating
      );

      if (!result.success) {
        throw new Error("Failed");
      }

      toast.success("Review added successfully! 🎉");
    } catch (error) {
      toast.error("Failed to add review");

      // rollback kalau gagal
      onReviewAdded?.((prev) =>
        prev.filter((r) => r._id !== optimisticReview._id)
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-all">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden transform transition-all scale-100">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Write a Review</h2>
            <p className="text-sm text-gray-500 mt-1">
              Sharing your experience at{" "}
              <span className="font-semibold text-gray-700">
                {businessTitle}
              </span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex flex-col items-center justify-center space-y-3 py-2">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Rate your experience
            </span>
            <div className="scale-125">
              <StarRating
                isEditable={true}
                showRating={rating}
                onRatingChange={handleRatingChange}
              />
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Review
              </label>
              <textarea
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ivy/20 focus:border-ivy transition-all resize-none text-sm text-gray-700 placeholder-gray-400 min-h-[120px]"
                placeholder="Tell us about your experience. Was the service good? How was the food?"
                value={reviewDescription}
                onChange={(e) => setReviewDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Photo
              </label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 hover:border-ivy transition-all group">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {reviewImage ? (
                    <div className="flex items-center gap-2 text-ivy">
                      <Image size={24} />
                      <p className="text-sm font-medium">{reviewImage.name}</p>
                    </div>
                  ) : (
                    <>
                      <UploadCloud className="w-8 h-8 text-gray-400 mb-2 group-hover:text-ivy transition-colors" />
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold text-ivy">
                          Click to upload
                        </span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        SVG, PNG, JPG or GIF
                      </p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => setReviewImage(e.target.files[0])}
                />
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-ivy hover:bg-[#1a4a3b] text-white rounded-xl font-bold shadow-lg shadow-ivy/30 transform active:scale-95 transition-all duration-200 mt-4">
              Post Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InsertReview;
