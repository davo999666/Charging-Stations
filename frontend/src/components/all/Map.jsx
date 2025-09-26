import {MapContainer, TileLayer, Marker, Tooltip, Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MoveMapInLocation from "./MoveMapInLocation.jsx";
import { icons } from "../../utils/markerIcons.js";
import RightClickHandler from "../admin/RightClickHandler.jsx";
import {checkToken} from "../../utils/checkToken.js";
import Cookies from "js-cookie";
import {useDispatch, useSelector} from "react-redux";
import LocateControl from "./LocateControl.jsx";
import {setStation} from "../../features/chargingSlice.js";
import NavMenuUser from "../user/NavMenuUser.jsx";
import NavMenuAdmin from "../admin/NavMenuAdmin.jsx";

const Map = ({stations}) => {
    const telAvivPosition = [32.08, 34.78];
    const charging = useSelector(state => state.store.charging);
    const dispatch = useDispatch();
    const handleClick = (station) => {
        dispatch(setStation(station));
    };

    return (
        <div className="absolute top-28 sm:top-14 bottom-0 left-0 right-0 z-0">
            <MapContainer center={telAvivPosition} zoom={10} className="w-full h-full" >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />
                {checkToken(Cookies.get("tokenHase"), "admin") ? <RightClickHandler />: null}
                 User position

                {/* Existing stations */}
                {stations.map((station, index) => (
                    <Marker
                        key={station.id || index}
                        position={[station.latitude, station.longitude]}
                        icon={icons[station.status] || icons.offline}
                        eventHandlers={{
                            mouseover: (e) => e.target.openTooltip(),
                            mouseout:  (e) => e.target.closeTooltip(),
                            click: (e) => {
                                handleClick(station)
                                e.target.closeTooltip()
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
                    ))}
                    <Marker
                        key={charging.station.id}
                        position={[charging.station.latitude, charging.station.longitude]}
                        icon={icons[charging.station.status] || icons.offline}
                    >
                        {checkToken(Cookies.get("tokenHase"), "admin")  ? <NavMenuAdmin/> : <NavMenuUser/>}
                    </Marker>
                <LocateControl />
                <MoveMapInLocation />
            </MapContainer>
        </div>
    );
};

export default Map;



/*
really place
latitude:31.6802501863859
longitude:34.5946716755134

where find -->navigator.geolocation.watchPosition
0:31.678802000000005
1: 34.590366

here i connect in mobile
0: 31.678785502145924
1: 34.59029361566524
 */