import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import osm from "../lib/osm-providers";
import React, { useEffect, useState, useRef } from "react";
import useGeolocation from "../lib/useGeolocation";
import { insertBusiness, reverseGeocoding } from "../lib/businessController";
import { 
  MapPin, 
  Type, 
  AlignLeft, 
  Clock, 
  Image as ImageIcon, 
  Navigation, 
  CheckCircle,
  Grid 
} from "react-feather";

import FlyButton from "./FlyButton";

const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const InsertBusiness = () => {
  const mapRef = useRef(null);
  const [businessTitle, setBusinessTitle] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [businessCategory, setBusinessCategory] = useState("Restaurant");
  const [businessImage, setBusinessImage] = useState(null);
  const [businessOpenTime, setBusinessOpenTime] = useState("09:00");
  const [businessCloseTime, setBusinessCloseTime] = useState("21:00");
  const [businessAddress, setBusinessAddress] = useState("");

  const [businessPosition, setBusinessPosition] = useState([-6.19, 106.79]);
  const location = useGeolocation();

  useEffect(() => {
    async function fetchAddress() {
      if (location.loaded && !location.error) {
        setBusinessPosition([
          location.coordinates.lat,
          location.coordinates.lng,
        ]);

        setBusinessAddress(
          await reverseGeocoding(
            location.coordinates.lat,
            location.coordinates.lng
          )
        );
      }
    }

    fetchAddress();
  }, [location]);

  function LocationPicker() {
    useMapEvents({
      async click(e) {
        setBusinessPosition([e.latlng.lat, e.latlng.lng]);
        setBusinessAddress(await reverseGeocoding(e.latlng.lat, e.latlng.lng));
      },
    });
    return null;
  }

  const flyToUser = () => {
    if (!location.loaded || location.error || !mapRef.current) return;
    mapRef.current.flyTo(
      [location.coordinates.lat, location.coordinates.lng],
      18,
      { animate: true }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-serpentine montserrat-bold">
            Add New Business
          </h1>
          <p className="mt-2 text-gray-500 montserrat-medium">
            Share a new hidden gem with the community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="space-y-6 h-full">
            <div className="bg-white p-2 rounded-3xl shadow-lg border-4 border-white relative group h-full">
              <div className="h-full min-h-[500px] w-full rounded-2xl overflow-hidden relative z-0">
                <MapContainer
                  center={businessPosition}
                  zoom={18}
                  className="w-full h-full"
                  ref={mapRef}
                >
                  <TileLayer
                    url={osm.maptiler.url}
                    attribution={osm.maptiler.attribution}
                  />
                  <LocationPicker />
                  <Marker position={businessPosition} icon={markerIcon} />
                  
                </MapContainer>

                <div className="absolute top-4 right-4 z-[999]">
                  <button
                    onClick={flyToUser}
                    className="bg-white text-serpentine p-3 rounded-full shadow-lg hover:bg-ivy hover:text-white transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
                    title="Use My Location"
                  >
                    <Navigation size={20} />
                  </button>
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-[999]">
                  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/50">
                    <div className="flex items-start gap-3">
                      <MapPin className="text-ivy mt-1 flex-shrink-0" size={18} />
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Selected Location</p>
                        <p className="text-sm font-medium text-gray-800 line-clamp-2">
                          {businessAddress || "Tap on map to select address..."}
                        </p>
                        <div className="flex gap-3 mt-2 text-xs text-gray-400 font-mono">
                          <span>Lat: {businessPosition[0]?.toFixed(5)}</span>
                          <span>Lng: {businessPosition[1]?.toFixed(5)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 h-fit">
            <div className="space-y-6">
              
              <div>
                <label className="text-sm font-bold text-gray-700 mb-2 montserrat-bold flex items-center gap-2">
                  <Type size={16} className="text-ivy" /> Business Name
                </label>
                <input
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ivy focus:bg-white transition-all montserrat-medium"
                  value={businessTitle}
                  onChange={(e) => setBusinessTitle(e.target.value)}
                  type="text"
                  placeholder="e.g. Kopi Senja Tebet"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-gray-700 mb-2 montserrat-bold flex items-center gap-2">
                    <Grid size={16} className="text-ivy" /> Category
                  </label>
                  <div className="relative">
                    <select
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ivy focus:bg-white transition-all appearance-none montserrat-medium cursor-pointer"
                      value={businessCategory}
                      onChange={(e) => setBusinessCategory(e.target.value)}
                    >
                      <option value="Restaurant">Restaurant</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Nightlife">Nightlife</option>
                      <option value="Active Life">Active Life</option>
                      <option value="Beauty & Spas">Beauty & Spas</option>
                      <option value="Automotive">Automotive</option>
                      <option value="Home Services">Home Services</option>
                      <option value="Education">Education</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                  </div>
                </div>

                <div>
                   <label className="text-sm font-bold text-gray-700 mb-2 montserrat-bold flex items-center gap-2">
                    <Clock size={16} className="text-ivy" /> Hours
                  </label>
                  <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-3">
                    <input
                      className="bg-transparent focus:outline-none text-sm w-full text-center font-medium"
                      value={businessOpenTime}
                      onChange={(e) => setBusinessOpenTime(e.target.value)}
                      type="time"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      className="bg-transparent focus:outline-none text-sm w-full text-center font-medium"
                      value={businessCloseTime}
                      onChange={(e) => setBusinessCloseTime(e.target.value)}
                      type="time"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700 mb-2 montserrat-bold flex items-center gap-2">
                  <AlignLeft size={16} className="text-ivy" /> Description
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ivy focus:bg-white transition-all min-h-[100px] resize-none montserrat-medium"
                  value={businessDescription}
                  onChange={(e) => setBusinessDescription(e.target.value)}
                  placeholder="Tell us what makes this place special..."
                />
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700 mb-2 montserrat-bold flex items-center gap-2">
                  <MapPin size={16} className="text-ivy" /> Address Details
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ivy focus:bg-white transition-all min-h-[80px] resize-none montserrat-medium"
                  value={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
                  placeholder="Detailed address..."
                />
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700 mb-2 montserrat-bold flex items-center gap-2">
                  <ImageIcon size={16} className="text-ivy" /> Photo
                </label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-ivy transition-all">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {businessImage ? (
                      <div className="flex items-center gap-2 text-ivy">
                        <CheckCircle size={24} />
                        <p className="text-sm font-medium">{businessImage.name}</p>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500"><span className="font-semibold">Click to upload</span> cover image</p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => setBusinessImage(e.target.files[0])}
                  />
                </label>
              </div>

              <button
                type="submit"
                onClick={() => {
                  insertBusiness(
                    businessTitle,
                    businessDescription,
                    businessImage,
                    businessCategory,
                    businessPosition,
                    businessAddress,
                    businessOpenTime,
                    businessCloseTime
                  );
                }}
                className="w-full py-4 bg-serpentine hover:bg-ivy text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-bold text-lg montserrat-bold flex items-center justify-center gap-2 mt-4"
              >
                Submit Business
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsertBusiness;