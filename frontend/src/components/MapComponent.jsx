import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import osm from "../lib/osm-providers";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [40, 40]
});

const businessIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [25, 25]
});

const MapComponent = ({ userLocation, business }) => {
  const center = userLocation
    ? { lat: userLocation[0], lng: userLocation[1] }
    : { lat: -6.2088, lng: 106.8456 };

  return (
    <MapContainer
      key={userLocation ? userLocation.join(",") : "default"}
      className="w-full h-full z-0"
      center={center}
      zoom={10}
    >
      <TileLayer
        url={osm.maptiler.url}
        attribution={osm.maptiler.attribution}
      />

      {userLocation && (
        <Marker position={userLocation} icon={userIcon}>
          <Popup>You're here</Popup>
        </Marker>
      )}

      {business?.map((b) => {
        const lng = b.position?.coordinates?.[0];
        const lat = b.position?.coordinates?.[1];
        if (!lat || !lng) return null;

        return (
          <Marker key={b._id} position={[lat, lng]} icon={businessIcon}>
            <Popup>
              <b>{b.title}</b><br />
              {b.address}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapComponent;
