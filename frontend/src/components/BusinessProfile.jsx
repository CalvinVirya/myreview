import React, { useEffect, useState } from "react";
import { fetchBusinessId } from "../lib/businessController";
import { fetchBusinessReviews } from "../lib/reviewController";
import BusinessReviews from "./BusinessReviews";
import InsertReview from "./InsertReview";
import LiveChat from "./LiveChat";
import StarRating from "./StarRating";

const BusinessProfile = ({ businessId }) => {
  const [business, setBusiness] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getBusiness = async () => {
      const data = await fetchBusinessId(businessId);
      setBusiness(data);
    };
    const getBusinessReviews = async () => {
      const data = await fetchBusinessReviews(businessId);
      setReviews(data);
    };
    getBusiness();
    getBusinessReviews();
  }, []);

  return (
    <main>
      <div className="flex items-center gap-1">
        <img
          src={business.imageUrl}
          alt=""
          srcSet=""
          className="rounded-full w-[10rem] h-[10rem] object-cover"
        />
        <div>
          <p className="font-semibold text-[1.5rem]">{business.title}</p>
          <div className="flex flex-row items-center">
            <StarRating isEditable={false} showRating={business.avgRating} />
            <p>
              {business.avgRating} ({business.totalReviews})
            </p>
          </div>
        </div>
      </div>
      <div className="gap-1 flex">
        <button
          className="py-2 px-6 bg-serpentine rounded-md montserrat-regular text-white cursor-pointer w-full sm:w-auto "
          onClick={() => setShowModal(true)}>
          Write A Review
        </button>
        <button className="py-2 px-6 border border-serpentine rounded-md montserrat-regular text-black cursor-pointer w-full sm:w-auto">
          Share
        </button>
        <button className="py-2 px-6 border border-serpentine rounded-md montserrat-regular text-black cursor-pointer w-full sm:w-auto">
          Bookmark
        </button>
      </div>
      <LiveChat businessId={businessId}/>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start">
        {reviews.map((review) => (
          <BusinessReviews
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
      <InsertReview
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        businessId={business._id}
        businessTitle={business.title}
      />
    </main>
  );
};

export default BusinessProfile;
