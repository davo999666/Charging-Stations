import { BatteryChargingIcon } from 'lucide-react';
import {useNavigate, useLocation} from 'react-router-dom';
import Search from "../components/Search.jsx";
import Cookies from "js-cookie";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = Cookies.get("token");


    const handleNavigate = () => {
        if (!token) {
            navigate(location.pathname === "/signIn" ? "/" : "/signIn");
        }
    };

    function handleLogout() {
        alert("log out")
        Cookies.remove("tokenHase");
        Cookies.remove("token");
        Cookies.remove("login");
        navigate("/");
    }

    return (
        <header className="absolute top-0 left-0 w-full bg-blue-600 text-white shadow-md z-20">
            <div className="container mx-auto px-4 py-2 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">

                {/* Left side */}
                <div className="flex items-center space-x-2 justify-center sm:justify-start">
                    <BatteryChargingIcon className="h-6 w-6 sm:h-7 sm:w-7" />
                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold">EV Charge Finder</h1>
                </div>

                {/* Right side */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 justify-center sm:justify-end order-2 w-full sm:w-auto">
                    <Search />

                    {token ? (
                        <div className="px-4 py-2 sm:px-4 sm:py-1 md:px-5 md:py-2 flex items-center justify-center space-x-2">
                            <button
                                onClick={() => alert("Go to profile")}
                                className="px-4 rounded-md bg-emerald-500 text-white hover:bg-emerald-700"
                            >
                                {Cookies.get("login") || "Profile"}
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 rounded-md bg-red-500 text-white hover:bg-red-700"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleNavigate}
                            className="bg-white text-blue-600 px-3 py-1 sm:px-4 sm:py-1 md:px-5 md:py-2 rounded-md hover:bg-blue-50 transition-colors text-sm sm:text-base"
                        >
                            {location.pathname === "/signIn" ? "Back to Map" : "Login / Register"}
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
