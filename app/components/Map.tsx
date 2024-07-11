"use client";

import L from "leaflet";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import marketIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: marketIcon.src,
  shadowUrl: markerShadow.src,
});

interface MapProps {
  center?: number[];
  onClickMap?: (coords: number[]) => void;
}

const Map: React.FC<MapProps> = ({ center, onClickMap }) => {
  const map = useMapEvents({
    click: (e) => {
      onClickMap && onClickMap([e.latlng.lat, e.latlng.lng]);
    },
  });

  return (
    <MapContainer
      center={(center as L.LatLngExpression) || [51.505, -0.09]}
      zoom={center ? 13 : 2}
      scrollWheelZoom={false}
      className="h-[35vh] rounded-lg z-0 mb-20 w-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {center && <Marker position={center as L.LatLngExpression} />}
    </MapContainer>
  );
};

export default Map;
