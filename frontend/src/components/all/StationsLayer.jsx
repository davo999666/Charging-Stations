// src/components/map/StationsLayer.jsx
import { Marker, Tooltip } from "react-leaflet";
import { icons } from "../../utils/markerIcons.js";
import {useDispatch, useSelector} from "react-redux";
import {useLazyGetAllStationsQuery} from "../../api/apiStation.js";
import {useEffect} from "react";
import {setStations} from "../../features/stationSlice.js";
import {setStation} from "../../features/chargingSlice.js";

export default function StationsLayer() {
    const dispatch = useDispatch();
    const filteredStations = useSelector((state) => state.store.station.filteredStations) || null;
    const stations = useSelector((state) => state.store.station.stations);
    const [triggerAllStations, { data: allStationsData }] = useLazyGetAllStationsQuery();
    console.log("Stations ", allStationsData);
    // ✅ When allStationsData updates, store it
    useEffect(() => {
        triggerAllStations()
        if (allStationsData) {
            dispatch(setStations(allStationsData));
        }
    }, [allStationsData]);
    const renderStations =
        filteredStations && filteredStations.length > 0
            ? filteredStations
            : stations;

    if (!renderStations || renderStations.length === 0) {
        return null; // nothing to render
    }
    const handleClick = (station) => {
        dispatch(setStation(station));
    };
    return (
        <>
            {renderStations.map((station, index) => {
                if (!station.latitude || !station.longitude) return null;

                return (
                    <Marker
                        key={station.id || index}
                        position={[station.latitude, station.longitude]}
                        icon={icons[station.status] || icons.offline}
                        eventHandlers={{
                            mouseover: (e) => e.target.openTooltip(),
                            mouseout: (e) => e.target.closeTooltip(),
                            click: (e) => {
                                handleClick(station);
                                e.target.closeTooltip();
                            },
                        }}
                    >
                        <Tooltip direction="top" offset={[0, -40]} opacity={1}>
                            <b>{station.address}</b>
                            <br />
                            Type: {station.type}
                            <br />
                            Status: {station.status}
                            <br />
                            Price: {station.price_per_kwh} ₪/kWh
                        </Tooltip>
                    </Marker>
                );
            })}
        </>
    );
}
