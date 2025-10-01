import { useGetStationHistoryQuery } from "../../api/apiHistory.js";
import { useSelector } from "react-redux";
import Modal from "../all/Modal.jsx";

const StationHistory = () => {

    const station = useSelector((state) => state.store.charging.station);
    const { data: history, isLoading, error } = useGetStationHistoryQuery(station.id);

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
                <p className="text-center">📭 No history found for this station.</p>
            </Modal>
        );
    }

    return (
        <Modal>
            <h2 className="text-xl font-bold mb-3 text-center">
                📜 History for Station {station.id}
            </h2>
            <ul className="space-y-3">
                {history.map((h) => (
                    <li key={h.id} className="p-4 border rounded-lg shadow-sm bg-white">
                        <p><strong>👤 User:</strong> {h.User?.login}</p>
                        <p><strong>📧 Email:</strong> {h.User?.email}</p>
                        <p><strong>📱 Phone:</strong> {h.User?.phone}</p>
                        <p><strong>⚡ Energy:</strong> {h.energy_kwh} kWh</p>
                        <p><strong>💰 Price:</strong> {h.total_price ?? "-"} ₪</p>
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

export default StationHistory;
