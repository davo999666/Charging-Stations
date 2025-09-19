import { useMap } from "react-leaflet";
import { useEffect, useState } from "react";

const MoveMapInLocation = ({ position }) => {
    const map = useMap();
    const [firstFix, setFirstFix] = useState(true);

    useEffect(() => {
        if (position && firstFix) {
            map.setView(position, map.getZoom());
            setFirstFix(false);
        }
    }, [position, map, firstFix]);

    return null;
};

export default MoveMapInLocation;
