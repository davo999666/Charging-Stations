import Cookies from "js-cookie";
import StartCharging from "./StartCharging.jsx";

export default function ProtectedRoute({ hash, children }) {
    const roleHash = Cookies.get("tokenHash"); // fix spelling here
    if (hash === roleHash) {
        return children; // admin view
    }
    return <StartCharging />; // non-admin fallback
}
