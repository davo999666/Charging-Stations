import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MoveMapInLocation = ({ position }) => {
    const map = useMap();

    useEffect(() => {
        if (position) {
            map.setView(position, map.getZoom());
        }
    }, [position, map]);

    return null;
};

export default MoveMapInLocation;
