// Map.js
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "./Map.css";

const Map = ({ setClickedLocation, userPosition }) => {
  const [position, setPosition] = useState([48.2082, 16.3719]);

  useEffect(() => {
    setPosition(userPosition);
  }, [userPosition]);

  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setClickedLocation({ lat, lng });
      },
    });

    useEffect(() => {
      setPosition(userPosition);
    }, [userPosition]);

    return null;
  }
  const RecenterAutomatically = ({ position }) => {
    const map = useMap();
    useEffect(() => {
      map.setView([position[0], position[1]]);
    }, [position]);
    return null;
  };

  return (
    <div data-testid="map-container" className="map_container">
      <MapContainer center={position} zoom={13} className="map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker />
        <RecenterAutomatically position={position} />
        <Marker position={position} />
      </MapContainer>
    </div>
  );
};

export default Map;
