// src/components/UpdateStationForm.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {useDeleteStationMutation, useUpdateStationMutation} from "../api/apiStation.js";

const UpdateStationForm = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // 👇 station data passed with navigate
    const { station } = location.state || {};

    // 👇 initialize state from existing station values
    const [city, setCity] = useState(station?.city || "");
    const [address, setAddress] = useState(station?.address || "");
    const [type, setType] = useState(station?.type || "fast");
    const [status, setStatus] = useState(station?.status || "available");
    const [price, setPrice] = useState(station?.price_per_kwh || "");
    const [energy, setEnergy] = useState(station?.energy_kwh || "0.00");

    const [updateStation, { isLoading, isError, error }] = useUpdateStationMutation();
    const [deleteStation, { isLoading: isDeleting }] = useDeleteStationMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateStation({
                id: station.id,
                restData: [
                    { city },
                    { address },
                    { type },
                    { status },
                    { price_per_kwh: price },
                    { energy_kwh: energy },
                ],
            }).unwrap();

            alert("✅ Station updated successfully!");
            navigate("/"); // back to map
        } catch (err) {
            console.error("❌ Failed to update station:", err);
            alert("❌ Failed to update station. Please try again.");
        }
    };
    const handleDelete = async () => {
        if (!window.confirm("❌ Are you sure you want to delete this station?")) return;

        try {
            await deleteStation(station.id).unwrap();
            alert("✅ Station deleted successfully!");
            navigate("/"); // go back to map
        } catch (err) {
            console.error("❌ Failed to delete station:", err);
            alert("❌ Failed to delete station. Please try again.");
        }
    };

    return (
        <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Update Station</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
                {/* City */}
                <div className="flex items-center gap-3">
                    <label className="w-1/3 font-bold">City</label>
                    <input
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-2/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>

                {/* Address */}
                <div className="flex items-center gap-3">
                    <label className="w-1/3 font-bold">Address</label>
                    <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-2/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>

                {/* Type */}
                <div className="flex items-center gap-3">
                    <label className="w-1/3 font-bold">Type</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-2/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                        <option value="fast">Fast</option>
                        <option value="normal">Normal</option>
                    </select>
                </div>

                {/* Status */}
                <div className="flex items-center gap-3">
                    <label className="w-1/3 font-bold">Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-2/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                        <option value="available">Available</option>
                        <option value="busy">Busy</option>
                        <option value="offline">Offline</option>
                    </select>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3">
                    <label className="w-1/3 font-bold">Price per kWh</label>
                    <input
                        type="number"
                        step="0.01"
                        placeholder="Price per kWh"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-2/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>

                {/* Energy */}
                <div className="flex items-center gap-3">
                    <label className="w-1/3 font-bold">Energy (kWh)</label>
                    <input
                        type="number"
                        step="0.01"
                        placeholder="Energy (kWh)"
                        value={energy}
                        onChange={(e) => setEnergy(e.target.value)}
                        className="w-2/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-between gap-2 mt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`flex-1 text-white py-2 rounded-md transition ${
                            isLoading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-emerald-600 hover:bg-emerald-700"
                        }`}
                    >
                        {isLoading ? "Updating..." : "Update Station"}
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="flex-1 bg-red-800 text-white py-2 rounded-md hover:bg-red-600 disabled:opacity-50"
                    >
                        {isDeleting ? "Deleting..." : "Delete Station"}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/")}
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

export default UpdateStationForm;
