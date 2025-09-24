import React, { useState, useEffect } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useStopChargeMutation} from "../api/apiHistory.js";


const StartCharging = () => {
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();
    const { state } = useLocation();
    const [stopCharge, { isLoading }] = useStopChargeMutation();
    const station = state

    // Simulate charging increasing %
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1; // increase by 1% every tick
            });
        }, 500); // every 0.5 sec
        return () => clearInterval(interval);
    }, []);
    const handleEnd = async () => {
        try {
            await stopCharge(station.id).unwrap();
            navigate("/")
        } catch (err) {
            console.error("❌ Failed to stop charging:", err);
            alert("Error stopping charging");
        }
    };

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center space-y-4 w-80">
            {/* Title */}
            <h2 className="text-xl font-bold text-gray-800">Charging</h2>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-6">
                <div
                    className="bg-green-500 h-6 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            {/* Percentage text */}
            <p className="text-lg font-semibold text-gray-700">{progress}%</p>

            {/* End Charging button */}
            <button
                onClick={handleEnd}
                className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700"
            >
                {isLoading ? "Stopping..." : "End Charging"}
            </button>
        </div>
    );
};

export default StartCharging;
