import { useGetUserHistoryQuery } from "../../api/apiHistory.js";
import { useSelector } from "react-redux";
import { timePassed } from "../../utils/timePassed.js";
import Modal from "../all/Modal.jsx";


const UserHistory = () => {
    const charging = useSelector((state) => state.store.charging);
    const { data: history, isLoading, error } = useGetUserHistoryQuery(charging.station.id);

    if (isLoading) {
        return (
            <Modal>
                <p className="text-center">⏳ Loading history...</p>
            </Modal>
        );
    }

    if (error) {
        return (
            <Modal>
                <p className="text-center">❌ Failed to load history</p>
            </Modal>
        );
    }

    if (!history || history.length === 0) {
        return (
            <Modal>
                <p className="text-center">📭 No history found for this user.</p>
            </Modal>
        );
    }

    return (
        <Modal>
            <h2 className="text-xl font-bold mb-3 text-center">
                📜 History for User {history?.[0]?.User?.fullName || "User"}
            </h2>
            <div className="mb-4 text-center">
                <p>👤 Login: {history?.[0]?.User?.login || "Login"}</p>
                <p>📱 Phone: {history?.[0]?.User?.phone || "Phone"}</p>
                <p>📧 Email: {history?.[0]?.User?.email || "Email"}</p>
            </div>

            <ul className="space-y-3">
                {history.map((h) => (
                    <li key={h.id} className="p-4 border rounded-lg shadow-sm bg-white">
                        {/* 🏭 Station info */}
                        <p><strong>🏙 City:</strong> {h.Station?.city}</p>
                        <p><strong>📍 Address:</strong> {h.Station?.address}</p>
                        <p><strong>⚡ Type:</strong> {h.Station?.type}</p>
                        <p><strong>💵 Price per kWh:</strong> {h.Station?.price_per_kwh} ₪</p>

                        {/* 🔋 Charging info */}
                        <p><strong>⚡ Energy Used:</strong> {h.energy_kwh} kWh</p>
                        <p><strong>💰 Total Price:</strong> {h.total_price ?? "-"} ₪</p>
                        <p><strong>⏱ Time:</strong> {timePassed(new Date(h.start_time), new Date(h.end_time))}</p>
                        <p><strong>⏱ Start:</strong> {new Date(h.start_time).toLocaleString()}</p>
                        {h.end_time ? (
                            <p><strong>⏱ End:</strong> {new Date(h.end_time).toLocaleString()}</p>
                        ) : (
                            <p className="text-red-600">⏳ Still charging...</p>
                        )}
                    </li>
                ))}
            </ul>
        </Modal>
    );
};

export default UserHistory;
