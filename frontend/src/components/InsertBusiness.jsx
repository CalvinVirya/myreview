import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import osm from "../lib/osm-providers";
import React, { useEffect, useState, useRef } from "react";
import useGeolocation from "../lib/useGeolocation";
import { insertBusiness } from "../lib/businessController"

import FlyButton from "./FlyButton";


const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -30],
});

const InsertBusiness = () => {
  const mapRef = useRef(null); // <--- harus ada
  const [businessTitle, setBusinessTitle] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [businessCategory, setBusinessCategory] = useState("Restaurant");
  const [businessImage, setBusinessImage] = useState(null);
  const [businessOpenTime, setBusinessOpenTime] = useState("00:00");
  const [businessCloseTime, setBusinessCloseTime] = useState("00:00");


  const [businessPosition, setBusinessPosition] = useState([-6.1900, 106.7900]);
  const location = useGeolocation();

  useEffect(() => {
    if (location.loaded && !location.error) {
      setBusinessPosition([location.coordinates.lat, location.coordinates.lng]);
    }
  }, [location]);

  function LocationPicker() {
    useMapEvents({
      click(e) {
        setBusinessPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  }

  const flyToUser = () => {
    if (!location.loaded || location.error || !mapRef.current) return;
    mapRef.current.flyTo([location.coordinates.lat, location.coordinates.lng], 18, {
      animate: true,
    });
  };

  return (
    <div className="flex flex-col">
      <div className="relative">
        <MapContainer
          center={businessPosition}
          zoom={18}
          className="w-full h-[45vh]"
          ref={mapRef} // ref disini
        >
          <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
          <LocationPicker />

          <Marker position={businessPosition} icon={markerIcon} />

          {location.loaded && !location.error && (
            <FlyButton location={location} />
          )}


        </MapContainer>

        <button
          onClick={flyToUser}
          className="w-35 h-14 bg-ivy rounded-2xl montserrat-regular text-first-frost"
        >
          My Location
        </button>

        <div className="absolute left-1/2 bottom-20 -translate-x-1/2 flex flex-row bg-white p-3 rounded-xl shadow-lg z-[9999]">
          <p className="text-sm font-medium">Lat: {businessPosition[0]?.toFixed(6)}</p>
          <p className="text-sm font-medium ml-3">Lng: {businessPosition[1]?.toFixed(6)}</p>
        </div>
      </div>

      {/* Form input */}
      <input
        className="border-black rounded-md border p-2 mb-2"
        value={businessTitle}
        onChange={(e) => setBusinessTitle(e.target.value)}
        type="text"
        placeholder="Business Title"
      />

      <textarea
        className="border-black rounded-md border p-2 mb-2"
        value={businessDescription}
        onChange={(e) => setBusinessDescription(e.target.value)}
        placeholder="Business Description"
      />

      <select
        className="border-black rounded-md border p-2 mb-2"
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

      <form className="flex flex-row items-center" action="">
        <input
          className="border-black rounded-md border p-2 mb-2"
          value={businessOpenTime}
          onChange={(e) => setBusinessOpenTime(e.target.value)}
          type="time"
        />
        <p className="px-5">to</p>
        <input
          className="border-black rounded-md border p-2 mb-2"
          value={businessCloseTime}
          onChange={(e) => setBusinessCloseTime(e.target.value)}
          type="time"
        />
      </form>

      <input
        type="file"
        accept="image/*"
        name="businessImage"
        id="businessUploader"
        onChange={(e) => setBusinessImage(e.target.files[0])}
      />

      <div className="p-3 bg-gray-100 rounded-md mt-3">
        <p>Latitude: {businessPosition[0]}</p>
        <p>Longitude: {businessPosition[1]}</p>
        <p>Category: {businessCategory}</p>
      </div>

      <button
        type="submit"
        onClick={() => {
          console.log(businessImage);
          insertBusiness(
            businessTitle,
            businessDescription,
            businessImage,
            businessCategory,
            businessPosition,
            businessOpenTime,
            businessCloseTime
          );
        }}
        className="w-35 h-14 bg-ivy rounded-2xl montserrat-regular text-first-frost"
      >
        Add Business
      </button>
    </div>
  );
};

export default InsertBusiness;
