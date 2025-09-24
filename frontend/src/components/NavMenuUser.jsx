import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NavMenuUser = () => {

    const navigate = useNavigate();
    const { state } = useLocation();
    const { station, position } = state || {};
    console.log(position);
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
                    onClick={() => navigate("/startCharging", {state: {station}})}
                >
                    🔋 Start Charging
                </li>
                <li
                    className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                    onClick={() => alert("📜 Get History")}
                >
                    📜 Get History
                </li>
                <li
                    className="px-2 text-red-600 hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate(-1)} // 👈 go back
                >
                    ❌ Cancel
                </li>
            </ul>
        </div>
    );
};

export default NavMenuUser;
