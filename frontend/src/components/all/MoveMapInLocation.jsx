import { useEffect } from "react";
import { useMap } from "react-leaflet";
import {useSelector} from "react-redux";


const MoveMapInLocation = () => {
    const position = useSelector(state => state.store.map.position);
    const map = useMap();

    useEffect(() => {
        if (position) {
            if (Array.isArray(position)) {
                map.setView(position, 14);
            }
            else {
                console.warn("Invalid position passed to MoveMapInLocation:", position);
            }
        }
    }, [position]);

    return null;
};

export default MoveMapInLocation;
