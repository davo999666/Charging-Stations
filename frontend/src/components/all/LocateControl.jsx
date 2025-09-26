import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { useDispatch } from "react-redux";
import { setPosition } from "../../features/mapSlice.js";
import { startGeolocationWatch, stopGeolocationWatch } from "../../utils/geolocation.js";

const LocateControl = () => {
    const map = useMap();
    const dispatch = useDispatch();
    useEffect(() => {
        // create custom control
        const locateControl = L.control({ position: "topleft" });

        locateControl.onAdd = () => {
            const button = L.DomUtil.create("button", "leaflet-bar");
            button.innerHTML = "📍"; // 👈 your icon
            button.title = "Where are you located";
            button.style.width = "34px";
            button.style.height = "34px";
            button.style.fontSize = "18px";
            button.style.cursor = "pointer";

            // prevent map drag when clicking
            L.DomEvent.disableClickPropagation(button);

            button.onclick = () => {
                const watchId = startGeolocationWatch(
                    (coords) => {
                        dispatch(setPosition(coords));
                        map.setView(coords, 14); // 👈 move map directly
                    },
                    (err) => console.warn("Geolocation error:", err)
                );

                // optional: auto stop after first fix
                setTimeout(() => stopGeolocationWatch(watchId), 5000);
            };

            return button;
        };

        locateControl.addTo(map);

        return () => {
            locateControl.remove();
        };
    }, [map, dispatch]);

    return null;
};

export default LocateControl;
