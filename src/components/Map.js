// Map.js
import React from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "./Map.css";

const Map = ({ setClickedLocation }) => {
  const position = [48.2082, 16.3719];

  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setClickedLocation({ lat, lng });
      },
    });
  }
  return (
    <div className="map_container">
      <MapContainer center={position} zoom={13} className="map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default Map;
