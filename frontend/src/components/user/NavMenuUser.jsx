// NavMenuUser.jsx
import { useNavigate } from "react-router-dom";
import { useStartChargeMutation } from "../../api/apiHistory.js";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { Popup } from "react-leaflet";

const NavMenuUser = () => {
    const [startCharge, { isLoading }] = useStartChargeMutation();
    const navigate = useNavigate();
    const charging = useSelector((state) => state.store.charging);

    if (!charging.station) return null;

    const handleStartCharging = async () => {
        try {
            const user = await startCharge(charging.station.id).unwrap();
            Cookies.set("tokenHase", user.role, { expires: 1 });
            navigate("/startCharging");
        } catch (err) {
            console.error("❌ Failed to start charging:", err);
            alert("Error starting charging");
        }
    };

    return (
        <Popup
            autoClose={false}
            closeOnClick={false}
        >
            <div className="bg-white border rounded shadow-lg w-48 z-50">
                <ul className="flex flex-col">
                    <li
                        className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                        onClick={handleStartCharging}
                    >
                        {isLoading ? "⏳ Starting..." : "🔋 Start Charging"}
                    </li>
                    <li
                        className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                        onClick={() => navigate("/userHistory")}
                    >
                        📜 Get History
                    </li>
                </ul>
            </div>
        </Popup>
    );
};

export default NavMenuUser;
