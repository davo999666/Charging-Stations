import {useLocation, useNavigate} from "react-router-dom";
import React from "react";

const NavMenuAdmin = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { station, position } = state || {};
    if (!position) return null;

    return (
        <div
            id="nav-menu-user"
            style={{
                position: "absolute",
                top: position.y,
                left: position.x,
            }}
            className="bg-white border rounded shadow-lg w-48 z-50"
        >
            <ul className="flex flex-col">
                <li
                    className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate("/updateStation", {state: {station}})}
                >
                    📝 Update Station
                </li>
                <li
                    className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate("/stationHistory", { state: { stationId: station.id } })}
                >
                    📜 Get History Station
                </li>
                <li
                    className="px-2 text-red-600 hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate("/")} // 👈 go back
                >
                    ❌ Cancel
                </li>
            </ul>
        </div>
    );
};

export default NavMenuAdmin;