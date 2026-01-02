import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";

// Fix default leaflet marker issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function LiveMap({ location }) {
  const [customerLocation, setCustomerLocation] = useState(null);

  // 📍 Get customer's current location
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCustomerLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Customer location error:", error);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  if (!location) return null;

  return (
    <div className="h-64 w-full mt-3 rounded-lg overflow-hidden">
      <MapContainer
        center={[location.lat, location.lng]}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 🚚 Delivery Location */}
        <Marker position={[location.lat, location.lng]}>
          <Popup>Delivery Partner 🚚</Popup>
        </Marker>

        {/* 📍 Customer Location */}
        {/* {customerLocation && (
          <Marker position={[customerLocation.lat, customerLocation.lng]}>
            <Popup>Your Location 📍</Popup>
          </Marker>
        )} */}
      </MapContainer>
    </div>
  );
}

