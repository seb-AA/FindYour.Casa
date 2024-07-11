"use client";

import L from "leaflet";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// @ts-ignore
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

interface MapProps {
  center?: [number, number];
  onClickMap?: (coords: number[]) => void;
}

const MapEvents: React.FC<{ onClickMap: (coords: number[]) => void }> = ({ onClickMap }) => {
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
      center={center || [51.505, -0.09]}
      zoom={center ? 7 : 3}
      scrollWheelZoom={true}
      zoomControl={true}
      className="h-[35vh] rounded-lg z-0 mb-20 w-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {center && <Marker position={center} />}
      {onClickMap && <MapEvents onClickMap={onClickMap} />}
    </MapContainer>
  );
};

export default Map;
