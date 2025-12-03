import React, { useEffect, useState } from "react";
import ReviewBox from "./ReviewBox";
import { fetchReviews } from "../lib/reviewController";
import { Activity } from "react-feather";

const RecentReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      const data = await fetchReviews();
      setReviews(data ? data.slice(0, 6) : []); 
    };
    getReviews();
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 mb-4">
            <Activity size={16} className="text-ivy" />
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 montserrat-medium">Community Activity</span>
          </div>
          <h2 className="text-3xl md:text-4xl montserrat-bold text-serpentine mb-4">
            Ulasan Terbaru
          </h2>
          <p className="text-gray-500 montserrat-regular max-w-2xl mx-auto">
            Lihat apa yang sedang hangat dibicarakan oleh komunitas MyReview hari ini.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review._id} className="h-full">
                <ReviewBox
                  username={review.name}
                  userImage={review.userImage}
                  uploadTIme={new Date(review.dateCreated).toLocaleDateString("id-ID", {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                  reviewImage={review.imageUrl}
                  reviewTitle={review.title}
                  reviewDescription={review.description}
                  rating={review.rating}
                />
              </div>
            ))
          ) : (
            [1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-gray-200 rounded-3xl animate-pulse"></div>
            ))
          )}
        </div>

        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-white border border-gray-300 hover:border-ivy text-gray-700 hover:text-ivy rounded-full font-semibold transition-all duration-300 shadow-sm hover:shadow-md">
            Lihat Semua Ulasan
          </button>
        </div>

      </div>
    </section>
  );
};

export default RecentReviews;