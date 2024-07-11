"use client";

import L from "leaflet";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import marketIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: marketIcon.src,
  shadowUrl: markerShadow.src,
});

interface MapProps {
  center?: number[];
  onClickMap: (coords: number[]) => void;
}

const ClickableMap: React.FC<{ onClickMap: (coords: number[]) => void }> = ({ onClickMap }) => {
  useMapEvents({
    click(e) {
      onClickMap([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

const Map: React.FC<MapProps> = ({ center, onClickMap }) => {
  return (
    <MapContainer
      center={(center as L.LatLngExpression) || [51.505, -0.09]}
      zoom={center ? 13 : 2}
      scrollWheelZoom={false}
      className="h-[35vh] rounded-lg z-0 mb-20 w-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {center && <Marker position={center as L.LatLngExpression} />}
      <ClickableMap onClickMap={onClickMap} />
    </MapContainer>
  );
};

export default Map;
