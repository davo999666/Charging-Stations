// src/components/map/StationsLayer.jsx
import {Marker, Tooltip} from "react-leaflet";
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
    const switchCharging = useSelector((state)=> state.store.charging.switch)
    const [triggerAllStations, { data: allStationsData }] = useLazyGetAllStationsQuery();

    // Fetch once when component mounts or when switchCharging changes
    useEffect(() => {
        triggerAllStations();
    }, [triggerAllStations, switchCharging]);

// When data comes in, update Redux
    useEffect(() => {
        if (allStationsData) {
            dispatch(setStations(allStationsData));
        }
    }, [allStationsData, dispatch]);


    const renderStations =
        filteredStations && filteredStations.length > 0
            ? filteredStations
            : stations;

    if (!renderStations || renderStations.length === 0) {
        return null; // nothing to render
    }
    return (
        <>
            {renderStations.map((station, index) => {
                if (!station.latitude || !station.longitude) return null;

                return (
                    <Marker
                        key={`${station.id || index}-${station.status || "no-status"}`}
                        position={[station.latitude, station.longitude]}
                        icon={icons[station.status] || icons.offline}
                        keyboard={false}                 // avoid focus quirks
                        bubblingMouseEvents={false}
                        eventHandlers={{
                            click: () => dispatch(setStation(station)), // first click is enough
                            mouseover: (e) => e.target.openTooltip(),
                            mouseout:  (e) => e.target.closeTooltip(),
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
