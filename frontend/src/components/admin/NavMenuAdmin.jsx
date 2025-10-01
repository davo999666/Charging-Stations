import { useNavigate} from "react-router-dom";
import React from "react";
import {Popup, useMap} from "react-leaflet";

const NavMenuAdmin = () => {
    const map = useMap();
    const navigate = useNavigate();
    return (
        <Popup autoClose={false} closeOnClick={false}>
            <div className="bg-white border rounded shadow-lg w-52">
                <ul className="flex flex-col">
                    <li
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() =>{map.closePopup();navigate("/updateStation")}}
                    >
                        📝 Update Station
                    </li>
                    <li
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {map.closePopup();navigate("/stationHistory");}}
                    >
                        📜 Get History Station
                    </li>
                </ul>
            </div>
        </Popup>
    );
};

export default NavMenuAdmin;