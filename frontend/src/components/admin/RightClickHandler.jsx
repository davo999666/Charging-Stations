import { useMapEvents } from "react-leaflet";
import AddStationForm from "./AddStationForm.jsx";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { checkToken } from "../../utils/checkToken.js";

export default function RightClickHandler() {
    const [token, setToken] = useState(Cookies.get("tokenHase"));
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const handleTokenChange = () => {
            setToken(Cookies.get("tokenHase"));
        };
        window.addEventListener("tokenChange", handleTokenChange);
        return () => {
            window.removeEventListener("tokenChange", handleTokenChange);
        };
    }, []);

    // ✅ always call hook, but run only if admin
    useMapEvents(
        checkToken(token, "admin")
            ? {
                contextmenu: async (e) => {
                    const { lat, lng } = e.latlng;
                    try {
                        const res = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
                        );
                        const data = await res.json();
                        const city =
                            data.address.city ||
                            data.address.town ||
                            data.address.village ||
                            "";
                        const area = data.address.neighbourhood || "";
                        const road = data.address.road || "";
                        const number = data.address.house_number || "";
                        const dataAddress = { city, area, road, number };

                        setFormData({ lat, lng, dataAddress, fullData: data });
                    } catch (err) {
                        console.error("Reverse geocoding failed:", err);
                    }
                },
            }
            : {} // if not admin, pass empty handlers
    );

    // ✅ now conditional rendering only here
    if (!checkToken(token, "admin")) {
        return null;
    }

    return (
        <>
            {formData && (
                <AddStationForm
                    lat={formData.lat}
                    lng={formData.lng}
                    dataAddress={formData.dataAddress}
                    fullData={formData.fullData}
                    onClose={() => setFormData(null)}
                />
            )}
        </>
    );
}