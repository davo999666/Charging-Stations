// src/components/AddStationForm.jsx
import React, { useState } from "react";
import { useAddStationMutation } from "../../api/apiStation.js";
import {useLocation, useNavigate} from "react-router-dom";


const AddStationForm = () => {
    const location = useLocation();
    const { lat, lng, dataAddress, fullData } = location.state || {};
    const [city, setCity] = useState(dataAddress?.city || "");
    const [address, setAddress] = useState(
        [dataAddress?.area, dataAddress?.road, dataAddress?.number].filter(Boolean).join(" ") || ""
    );
    const [type, setType] = useState("fast");
    const [price, setPrice] = useState("");
    const navigate = useNavigate();
    const [addStation, { isLoading, isError, error }] = useAddStationMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           await addStation({city, address, latitude: lat, longitude: lng, type, price_per_kwh: price, fullData}).unwrap();
            navigate("/");
            alert("✅ Station added successfully!");
        } catch (err) {
            console.error("❌ Failed to add station:", err);
            alert("❌ Failed to add station. Please try again.");
        }
    };

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Add Station</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

                <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                    <option value="fast">Fast</option>
                    <option value="slow">Slow</option>
                </select>

                <input
                    type="text"
                    step="0.1"
                    placeholder="Price per kWh"   // 👈 will be visible
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

                {lat && lng && (
                    <p className="text-xs text-gray-600">
                        📍 Lat: {lat.toFixed(5)}, Lng: {lng.toFixed(5)}
                    </p>
                )}

                <div className="flex justify-between gap-2">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`flex-1 text-white py-2 rounded-md transition ${
                            isLoading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-emerald-600 hover:bg-emerald-700"
                        }`}
                    >
                        {isLoading ? "Saving...": "Save Station"}
                    </button>
                    <button
                        type="button"
                        onClick={()=>{navigate("/")}}
                        className="flex-1 bg-gray-300 text-black py-2 rounded-md hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
                {isError && (
                    <p className="text-red-600 mt-2 text-sm">
                        {error?.data?.message || "Something went wrong"}
                    </p>
                )}
            </form>
        </div>
    );
};

export default AddStationForm;
