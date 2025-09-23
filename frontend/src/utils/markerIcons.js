// src/utils/markerIcons.js
import L from "leaflet";

const iconBase =
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/";

export const icons = {
    available: L.icon({
        iconUrl: iconBase + "marker-icon-2x-green.png",
        shadowUrl: iconBase + "marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    }),
    busy: L.icon({
        iconUrl: iconBase + "marker-icon-2x-red.png",
        shadowUrl: iconBase + "marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    }),
    offline: L.icon({
        iconUrl: iconBase + "marker-icon-2x-grey.png",
        shadowUrl: iconBase + "marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    }),
};
