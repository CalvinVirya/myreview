import React, { useState, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import osm from "../lib/osm-providers";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// buat icon leaflet
const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
  iconAnchor: [16, 46],
  popupAnchor: [0, -40]
});

const MapComponent = () => {
  const [center] = useState({ lat: -6.2088, lng: 106.8456 });
  const ZOOM_LEVEL = 30;

  return (
    <MapContainer className="w-[40vw] h-[80vh]" center={center} zoom={ZOOM_LEVEL}>
      <TileLayer
        url={osm.maptiler.url}
        attribution={osm.maptiler.attribution}
      />

      {/* Marker dengan Popup */}
      <Marker position={center} icon={markerIcon}>
        <Popup>
          <b>Ini lokasi Jakarta</b>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
