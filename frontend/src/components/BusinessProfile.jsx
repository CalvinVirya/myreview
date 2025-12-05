import React, { useEffect, useState } from "react";
import { fetchBusinessId } from "../lib/businessController";
import { fetchBusinessReviews } from "../lib/reviewController";
import { insertMessage, fetchMessages } from "../lib/messageController";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import osm from "../lib/osm-providers";
import BusinessReviews from "./BusinessReviews";
import InsertReview from "./InsertReview";
import LiveChat from "./LiveChat";
import StarRating from "./StarRating";
import {
  Star,
  Share2,
  Bookmark,
  MapPin,
  Clock,
  Globe,
  Phone,
  Camera,
  MessageCircle,
  Send,
  Smile,
  Navigation,
} from "react-feather";

const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const BusinessProfile = ({ businessId }) => {
  const [business, setBusiness] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [chatMessage, setChatMessage] = useState("");
  const [liveChat, setLiveChat] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const [businessData, reviewsData] = await Promise.all([
          fetchBusinessId(businessId),
          fetchBusinessReviews(businessId),
        ]);
        setBusiness(businessData);
        setReviews(reviewsData || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [businessId]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const messageData = await fetchMessages(businessId);
        setLiveChat(messageData);
      } catch (error) {
        console.error(error);
      }
    };
    getMessages();
  }, [businessId]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      insertMessage(chatMessage, businessId);
      setChatMessage("");
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (!business) return null;

  const position = business.position?.coordinates
    ? [business.position.coordinates[1], business.position.coordinates[0]]
    : [-6.2088, 106.8456];

  return (
    <main className="bg-white min-h-screen font-sans text-gray-800">
      <div className="relative">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              {business.title}
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex">
                <StarRating
                  isEditable={false}
                  showRating={business.avgRating}
                />
              </div>
              <span className="text-lg font-bold text-gray-700">
                {business.avgRating?.toFixed(1)}
              </span>
              <span className="text-gray-500 text-lg">
                ({business.totalReviews} reviews)
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <span className="text-blue-600 hover:underline cursor-pointer">
                {business.category || "Restaurant"}
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-green-600 font-bold">Open</span>
              <span className="text-gray-500">
                until {business.closeTime || "10:00 PM"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-64 md:h-96 bg-gray-100 overflow-hidden relative group">
        <div className="max-w-6xl mx-auto h-full grid grid-cols-1 md:grid-cols-4 gap-1">
          <div className="md:col-span-2 h-full relative">
            <img
              src={business.imageUrl}
              className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
              alt="Main"
            />
          </div>
          <div className="hidden md:block h-full relative">
            <img
              src={business.imageUrl}
              className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer brightness-90"
              alt="Side 1"
            />
          </div>
          <div className="hidden md:block h-full relative">
            <img
              src={business.imageUrl}
              className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer brightness-75"
              alt="Side 2"
            />
            <button className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md border border-white/50 text-white px-3 py-1 rounded text-sm font-bold flex items-center gap-2">
              <Camera size={14} /> See all photos
            </button>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 sticky top-0 bg-white z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="bg-serpentine text-white px-6 py-2.5 rounded-md font-bold text-base flex items-center gap-2 shadow-sm transition-colors">
            <Star size={18} fill="currentColor" /> Write a Review
          </button>
          <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-md font-semibold text-sm flex items-center gap-2 transition-colors">
            <Camera size={16} /> Add Photo
          </button>
          <button
            className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-md font-semibold text-sm flex items-center gap-2 transition-colors"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("Link copied to clipboard!");
            }}>
            <Share2 size={16} /> Share
          </button>
          <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-md font-semibold text-sm flex items-center gap-2 transition-colors">
            <Bookmark size={16} /> Save
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        <div className="lg:col-span-2 space-y-8">
          <section className="border-b border-gray-200 pb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Location & Hours
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-1 text-gray-600 shrink-0" size={18} />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {business.address || "No Address Provided"}
                    </p>
                    <p className="text-gray-600 text-sm">Jakarta, Indonesia</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <button className="text-gray-700 border border-gray-300 px-4 py-1.5 rounded text-sm font-semibold hover:bg-gray-50">
                    Get directions
                  </button>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 text-sm">
                  <Clock size={16} className="text-gray-500" />
                  <span className="font-semibold">Mon - Sun</span>
                  <span className="text-gray-600">
                    {business.openTime} - {business.closeTime}
                  </span>
                </div>
                <p className="text-green-600 text-sm font-medium">Open now</p>
              </div>
            </div>
          </section>

          <section className="border-b border-gray-200 pb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              About the Business
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {business.description || "No description available."}
            </p>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Recommended Reviews
              </h2>
            </div>

            <div className="lg:hidden mb-8 border border-gray-200 rounded-lg p-4 bg-gray-50">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <MessageCircle size={18} /> Live Chat
              </h3>
              <form
                className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 border border-gray-300 focus-within:ring-2 focus-within:ring-serpentine/20 focus-within:border-serpentine transition-all shadow-sm"
                onSubmit={handleSendMessage}>
                <input
                  type="text"
                  className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
                  placeholder="Type a message..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                />
                <button
                  type="submit"
                  className="text-serpentine hover:bg-serpentine/10 p-2 rounded-full transition-colors">
                  <Send size={18} />
                </button>
              </form>
            </div>

            <div className="space-y-6">
              {reviews.length === 0 ? (
                <div className="text-gray-500 text-sm mt-4">
                  No reviews yet — be the first to review!
                </div>
              ) : (
                reviews.map((review) => (
                  <div
                    key={review._id}
                    className="border-b border-gray-100 pb-6 last:border-0">
                    <BusinessReviews
                      username={review.name}
                      userImage={review.userImage}
                      uploadTIme={review.dateCreated}
                      reviewImage={review.imageUrl}
                      reviewTitle={review.title}
                      reviewDescription={review.description}
                      rating={review.rating}
                    />
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        <div className="hidden lg:block space-y-6">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-bold text-gray-700 text-sm">Live Chat</h3>
                <span className="text-green-600 text-xs font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>{" "}
                  Online
                </span>
              </div>

              <div className="h-[300px] bg-white p-4 overflow-y-auto flex flex-col space-y-4">
                {liveChat.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center mt-20">
                    Join the conversation about {business.title}.
                  </p>
                ) : (
                  liveChat.map((msg, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      {/* Avatar */}
                      <img
                        src={msg.user.userImage || "/default-avatar.png"}
                        className="w-10 h-10 rounded-full object-cover"
                        alt="avatar"
                      />

                      {/* Message Content */}
                      <div className="flex flex-col">
                        {/* Username + Time */}
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-gray-900 text-sm">
                            {msg.user.name || "Unknown User"}
                          </span>
                          <span className="text-gray-400 text-xs">
                            {new Date(msg.dateCreated).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>

                        {/* Message bubble */}
                        <div className="bg-gray-100 px-3 py-2 rounded-xl text-sm text-gray-800 max-w-[220px]">
                          {msg.message}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-3 border-t border-gray-200 bg-white">
                <form
                  className="flex items-center gap-2 bg-white rounded-xl px-2 py-2 border border-gray-200 focus-within:ring-2 focus-within:ring-serpentine/10 focus-within:border-serpentine transition-all duration-200 shadow-sm"
                  onSubmit={handleSendMessage}>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-serpentine p-2 rounded-full hover:bg-gray-50 transition-colors">
                    <Smile size={20} />
                  </button>
                  <input
                    type="text"
                    className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
                    placeholder="Type a message..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                  />
                  <button
                    type="submit"
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      chatMessage.trim()
                        ? "bg-serpentine text-white shadow-md transform scale-100"
                        : "bg-gray-100 text-gray-400 cursor-default scale-95"
                    }`}
                    disabled={!chatMessage.trim()}>
                    <Send
                      size={16}
                      className={chatMessage.trim() ? "ml-0.5" : ""}
                    />
                  </button>
                </form>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-bold text-gray-700 text-sm flex items-center gap-2">
                  <MapPin size={16} className="text-serpentine" /> Location
                </h3>
              </div>
              <div className="h-[400px] w-full relative z-0">
                <MapContainer
                  center={position}
                  zoom={15}
                  className="w-full h-full"
                  scrollWheelZoom={false}>
                  <TileLayer
                    url={osm.maptiler.url}
                    attribution={osm.maptiler.attribution}
                  />
                  <Marker position={position} icon={markerIcon}>
                    <Popup>
                      <div className="font-bold text-sm">{business.title}</div>
                      <div className="text-xs">{business.address}</div>
                    </Popup>
                  </Marker>
                </MapContainer>
                <div className="absolute bottom-4 right-4 z-[400]">
                  <button className="bg-white text-gray-700 p-2 rounded-lg shadow-md border border-gray-200 text-xs font-bold hover:bg-gray-50 flex items-center gap-2">
                    <Navigation size={14} /> Get Directions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <InsertReview
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        businessId={business?._id}
        businessTitle={business?.title}
      />
    </main>
  );
};

export default BusinessProfile;
