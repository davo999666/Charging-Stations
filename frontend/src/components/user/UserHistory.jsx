import { useNavigate } from "react-router-dom";
import { useGetUserHistoryQuery } from "../../api/apiHistory.js";
import {useSelector} from "react-redux"; // 👈 you need this endpoint

const UserHistory = () => {
    const navigate = useNavigate();
    const charging = useSelector(state => state.store.charging);


    const { data: history, isLoading, error } = useGetUserHistoryQuery(charging.station.id);

    if (isLoading) return <p>⏳ Loading history...</p>;
    if (error) return <p>❌ Failed to load history</p>;
    if (!history || history.length === 0) {
        return (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                      z-50 bg-amber-200 p-6 rounded-lg shadow-lg w-[400px] text-center">
                <button
                    onClick={() => navigate("/")}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-xl font-bold"
                >
                    ×
                </button>
                <p>📭 No history found for this user.</p>
            </div>
        );
    }

    return (
        <div className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                    z-50 bg-amber-200 p-6 rounded-lg shadow-lg w-[700px] max-h-[80vh] overflow-y-auto relative">
            <button
                onClick={() => navigate("/")}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-xl font-bold"
            >
                ×
            </button>

            <h2 className="text-xl font-bold mb-3 text-center">
                📜 History for User {}
            </h2>

            <ul className="space-y-3">
                {history.map((h) => (
                    <li key={h.id} className="p-4 border rounded-lg shadow-sm bg-white">
                        {/* 🧑 User info */}
                        <p><strong>👤 User:</strong> {h.User?.login} ({h.User?.fullName})</p>
                        <p><strong>📧 Email:</strong> {h.User?.email}</p>
                        <p><strong>📱 Phone:</strong> {h.User?.phone}</p>

                        {/* 🏭 Station info */}
                        <p><strong>🏙 City:</strong> {h.Station?.city}</p>
                        <p><strong>📍 Address:</strong> {h.Station?.address}</p>
                        <p><strong>⚡ Type:</strong> {h.Station?.type}</p>
                        <p><strong>💵 Price per kWh:</strong> {h.Station?.price_per_kwh} ₪</p>

                        {/* 🔋 Charging info */}
                        <p><strong>⚡ Energy Used:</strong> {h.energy_kwh} kWh</p>
                        <p><strong>💰 Total Price:</strong> {h.total_price ?? "-"} ₪</p>
                        <p><strong>⏱ Start:</strong> {new Date(h.start_time).toLocaleString()}</p>
                        {h.end_time ? (
                            <p><strong>⏱ End:</strong> {new Date(h.end_time).toLocaleString()}</p>
                        ) : (
                            <p className="text-red-600">⏳ Still charging...</p>

                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserHistory;
