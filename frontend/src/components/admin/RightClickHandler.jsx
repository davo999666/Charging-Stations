// src/components/RightClickHandler.jsx
import { useMapEvents } from "react-leaflet";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function RightClickHandler() {
    const navigate = useNavigate()
    useMapEvents({
        contextmenu: async (e) => {
            const { lat, lng } = e.latlng;
            try {
                const res = await axios.get("https://nominatim.openstreetmap.org/reverse", {
                    params: {
                        lat,
                        lon: lng,
                        format: "json",
                    },
                });
                const city = res.data.address.city || res.data.address.town || res.data.address.village || "";
                const area = res.data.address.neighbourhood || "";
                const road = res.data.address.road || "";
                const number = res.data.address.house_number || "";
                const dataAddress = { city, area, road, number };
                const fullData = res.data
                navigate("/AddStation", {
                    state: {
                        lat,
                        lng,
                        dataAddress,
                        fullData
                    },
                });
            } catch (err) {
                console.error("Reverse geocoding failed:", err);
            }
        },
    });

    return null;
}
