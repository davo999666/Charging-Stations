import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MoveMapInLocation from "./MoveMapInLocation.jsx";
import { icons } from "../../utils/markerIcons.js";
import RightClickHandler from "../admin/RightClickHandler.jsx";
import { checkToken } from "../../utils/checkToken.js";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import LocateControl from "./LocateControl.jsx";
import NavMenuUser from "../user/NavMenuUser.jsx";
import NavMenuAdmin from "../admin/NavMenuAdmin.jsx";
import {telAvivPosition} from "../../utils/const.js";
import StationsLayer from "./StationsLayer.jsx";

const Map = () => {
    const charging = useSelector((state) => state.store.charging);
    return (
        <div className="absolute top-28 sm:top-14 bottom-0 left-0 right-0 z-0">
            <MapContainer center={telAvivPosition} zoom={10} className="w-full h-full">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />

                {checkToken(Cookies.get("tokenHase"), "admin") ? (
                    <RightClickHandler />
                ) : null}

                <StationsLayer/>

                {/* Charging station marker */}
                {charging?.station?.longitude !== undefined && (
                        <Marker
                            key={charging.station.id}
                            position={[
                                charging.station.latitude,
                                charging.station.longitude,
                            ]}
                            icon={icons[charging.station.status] || icons.offline}
                        >
                            {checkToken(Cookies.get("tokenHase"), "admin") ? (
                                <NavMenuAdmin />
                            ) : (
                                <NavMenuUser />
                            )}
                        </Marker>
                    )}
                <LocateControl />
                <MoveMapInLocation/>
            </MapContainer>
        </div>
    );
};

export default Map;
