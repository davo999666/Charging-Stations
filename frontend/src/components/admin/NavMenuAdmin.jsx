import { useNavigate} from "react-router-dom";
import React from "react";
import {Popup} from "react-leaflet";
import {resetCharging} from "../../features/chargingSlice.js";
import {useDeleteStationMutation} from "../../api/apiStation.js";
import {useDispatch, useSelector} from "react-redux";



const NavMenuAdmin = () => {
    const station = useSelector((state) => state.store.charging.station);
    const [deleteStation, { isLoading: isDeleting }] = useDeleteStationMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (!window.confirm("❌ Are you sure you want to delete this station?")) return;
        try {
            await deleteStation(station.id).unwrap();
            dispatch(resetCharging());
            navigate("/"); // go back to map
            alert("✅ Station deleted successfully!");

        } catch (err) {
            console.error("❌ Failed to delete station:", err);
            alert("❌ Failed to delete station. Please try again.");
        }
    };


    return (
        <Popup autoClose={true}>
            <div className="bg-white border rounded shadow-lg w-52">
                <ul className="flex flex-col">
                    <li
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                            navigate("/updateStation")
                        }}
                    >
                        📝 Update Station
                    </li>
                    <li
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                            navigate("/stationHistory");
                        }}
                    >
                        📜 Get History Station
                    </li>
                    <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="w-full text-left"
                        >
                            {isDeleting ? "⏳ Deleting..." : "🗑️ Delete Station"}
                        </button>
                    </li>
                </ul>
            </div>
        </Popup>
    );
};

export default NavMenuAdmin;