import { useEffect } from "react";
import { useMap } from "react-leaflet";
import {useSelector} from "react-redux";



const MoveMapInLocation = () => {
    const {position, zoom } = useSelector(state => state.store.map);
    const map = useMap();

    useEffect(() => {
        if (position) {
            if (Array.isArray(position)) {
                map.setView(position, zoom);
            }
            else {
                console.warn("Invalid position passed to MoveMapInLocation:", position);
            }
        }
    }, [position]);

    return null;
};

export default MoveMapInLocation;
