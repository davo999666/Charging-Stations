import {MapContainer, TileLayer, Marker, Popup, Tooltip} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MoveMapInLocation from "./MoveMapInLocation.jsx";
import { icons } from "../utils/markerIcons.js";
import RightClickHandler from "./RightClickHandler.jsx";
import {useNavigate} from "react-router-dom";
import {checkToken} from "../utils/checkToken.js";
import Cookies from "js-cookie";
import { useSelector} from "react-redux";
import LocateControl from "./LocateControl.jsx";

const Map = ({stations}) => {
    const telAvivPosition = [32.08, 34.78];
    const position = useSelector((state) => state.map.position);
    const navigate = useNavigate();
    const handleClick = (station, e) => {
        navigate("/menu", {
            state: {
                station,
                position: { x: e.originalEvent.clientX, y: e.originalEvent.clientY },
            },
        });
    };

    return (
        <div className="absolute top-28 sm:top-14 bottom-0 left-0 right-0 z-0">
            <MapContainer center={telAvivPosition} zoom={10} className="w-full h-full" >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />
                {checkToken(Cookies.get("tokenHase")) ? <RightClickHandler />: null}
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
                                handleClick(station, e)
                                e.target.closeTooltip()
                            },
                        }}
                    >
                        <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                            <b>{station.name}</b>
                                <br />
                                Type: {station.type}
                                <br />
                                Status: {station.status}
                                <br />
                                Price: {station.price_per_kwh} ₪/kWh
                        </Tooltip>
                        </Marker>
                    ))}
                <LocateControl />
                <MoveMapInLocation position={position} />
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