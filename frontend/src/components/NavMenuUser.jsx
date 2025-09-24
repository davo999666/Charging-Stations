import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {useStartChargeMutation} from "../api/apiHistory.js";

const NavMenuUser = () => {
    const [startCharge, { isLoading }] = useStartChargeMutation();
    const navigate = useNavigate();
    const { state } = useLocation();
    const { station, position } = state || {};

    if (!position) return null;
    const handleStartCharging = async () => {
        try {
             await startCharge(station.id).unwrap();
            navigate("/startCharging", { state:  station  });
        } catch (err) {
            console.error("❌ Failed to start charging:", err);
            alert("Error starting charging");
        }
    };

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
                    onClick={handleStartCharging}
                >
                    {isLoading ? "⏳ Starting..." : "🔋 Start Charging"}
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
