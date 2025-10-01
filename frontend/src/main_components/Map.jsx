import {MapContainer, TileLayer, Marker, Tooltip} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MoveMapInLocation from "../components/all/MoveMapInLocation.jsx";
import {icons} from "../utils/markerIcons.js";
import RightClickHandler from "../components/admin/RightClickHandler.jsx";
import {checkToken} from "../utils/checkToken.js";
import Cookies from "js-cookie";
import {useSelector} from "react-redux";
import LocateControl from "../components/all/LocateControl.jsx";
import NavMenuUser from "../components/user/NavMenuUser.jsx";
import NavMenuAdmin from "../components/admin/NavMenuAdmin.jsx";
import {telAvivPosition} from "../utils/const.js";
import StationsLayer from "../components/all/StationsLayer.jsx";


const Map = () => {
    const charging = useSelector((state) => state.store.charging);


    return (
        <div className="flex-1 relative z-0">
            <MapContainer center={telAvivPosition} zoom={10} className="w-full h-full">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />
                <RightClickHandler/>
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
                            <NavMenuAdmin/>
                        ) : (
                            <NavMenuUser/>
                        )}
                    </Marker>
                )}
                <LocateControl/>
                <MoveMapInLocation/>
            </MapContainer>
        </div>
    );
};

export default Map;
