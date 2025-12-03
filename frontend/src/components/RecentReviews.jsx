import React, { useEffect, useState } from "react";
import ReviewBox from "./ReviewBox";
import { fetchReviews } from "../lib/reviewController";
import { Activity } from "react-feather";

const RecentReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const data = await fetchReviews();
        setReviews(data ? data.slice(0, 6) : []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setIsLoading(false);
      }
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
            Recent Reviews
          </h2>
          <p className="text-gray-500 montserrat-regular max-w-2xl mx-auto">
            Catch up on the latest reviews from the MyReview community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            [1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 h-full flex flex-col gap-4 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="flex flex-col gap-2">
                    <div className="w-32 h-3 bg-gray-200 rounded-full"></div>
                    <div className="w-20 h-2 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
                
                <div className="w-full h-56 bg-gray-200 rounded-2xl"></div>
                
                <div className="flex flex-col gap-3 mt-2">
                  <div className="w-3/4 h-4 bg-gray-200 rounded-full"></div>
                  <div className="w-full h-3 bg-gray-200 rounded-full"></div>
                  <div className="w-5/6 h-3 bg-gray-200 rounded-full"></div>
                </div>

                <div className="mt-auto pt-2 flex gap-1">
                   {[1,2,3,4,5].map(s => <div key={s} className="w-5 h-5 bg-gray-200 rounded-full"></div>)}
                </div>
              </div>
            ))
          ) : reviews.length > 0 ? (
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
            <div className="col-span-full text-center py-10">
              <p className="text-gray-400 montserrat-regular">No reviews found yet.</p>
            </div>
          )}
        </div>

        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-white border border-gray-300 hover:border-ivy text-gray-700 hover:text-ivy rounded-full font-semibold transition-all duration-300 shadow-sm hover:shadow-md">
            Load more reviews
          </button>
        </div>

      </div>
    </section>
  );
};

export default RecentReviews;