import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MoveMapInLocation from "./MoveMapInLocation.jsx";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const Map = () => {
    const telAvivPosition = [32.0853, 34.7818];
    const [userPosition, setUserPosition] = useState(null);

    useEffect(() => {
        if ("geolocation" in navigator) {
            const watchId = navigator.geolocation.watchPosition(
                (pos) => {
                    setUserPosition([pos.coords.latitude, pos.coords.longitude]);
                },
                (err) => {
                    console.warn("Geolocation error:", err);
                    setUserPosition(null);
                },
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
            );
            return () => navigator.geolocation.clearWatch(watchId);
        }
    }, []);

    return (
        <div className="absolute top-28 sm:top-14 bottom-0 left-0 right-0 z-0">
            <MapContainer center={telAvivPosition} zoom={16} className="w-full h-full">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />

                {userPosition && (
                    <Marker position={userPosition}>
                        <Popup>You are here</Popup>
                    </Marker>
                )}

                <MoveMapInLocation position={userPosition}/>
            </MapContainer>
        </div>
    );
};

export default Map;
