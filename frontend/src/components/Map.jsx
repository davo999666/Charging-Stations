import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MoveMapInLocation from "./MoveMapInLocation.jsx";
import { icons } from "../utils/markerIcons.js";
import RightClickHandler from "./RightClickHandler.jsx";
import {useNavigate} from "react-router-dom";
import {createRoleHash} from "../utils/createHaseToken.js";
import Cookies from "js-cookie";



// Fix Leaflet default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const Map = ({stations}) => {
    const telAvivPosition = [32.0853, 34.7818];
    const [userPosition, setUserPosition] = useState(null);
    const [formPos, setFormPos] = useState(null);
    const navigate = useNavigate();
    const hash = createRoleHash("admin");

    useEffect(() => {
        if ("geolocation" in navigator) {
            const watchId = navigator.geolocation.watchPosition(
                (pos) => setUserPosition([pos.coords.latitude, pos.coords.longitude]),
                (err) => {
                    console.warn("Geolocation error:", err);
                    setUserPosition((prev) => prev || null);
                },
                { enableHighAccuracy: true, timeout: 30000, maximumAge: 10000 }
            );
            return () => navigator.geolocation.clearWatch(watchId);
        }
    }, []);

    return (
        <div className="absolute top-28 sm:top-14 bottom-0 left-0 right-0 z-0">
            <MapContainer center={telAvivPosition} zoom={14} className="w-full h-full" >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />
                {hash === Cookies.get("tokenHase") ? <RightClickHandler />: null}
                {/* User position */}
                {userPosition && (
                    <Marker position={userPosition}>
                        <Popup>You are here</Popup>
                    </Marker>
                )}

                {/* Existing stations */}
                {stations.map((station, index) => (
                        <Marker
                            key={station.id || index}
                            position={[station.latitude, station.longitude]}
                            icon={icons[station.status] || icons.offline}
                            eventHandlers={{
                                    click: () => {
                                        navigate("/icon", {
                                            state: { station },
                                        });
                                    },}}
                        >
                            <Popup>
                                <b>{station.name}</b>
                                <br />
                                Type: {station.type}
                                <br />
                                Status: {station.status}
                                <br />
                                Price: {station.price_per_kwh} ₪/kWh
                            </Popup>
                        </Marker>
                    ))}

                {/* Form popup on right click */}
                {formPos && (
                    <Marker position={[formPos.lat, formPos.lng]}>
                        <Popup>
                            <AddStationForm
                                lat={formPos.lat}
                                lng={formPos.lng}
                                initialCity={formPos.city}
                                initialAddress={formPos.address}
                                onClose={() => setFormPos(null)}
                            />
                        </Popup>
                    </Marker>
                )}

                <MoveMapInLocation position={userPosition} />
            </MapContainer>
        </div>
    );
};

export default Map;
