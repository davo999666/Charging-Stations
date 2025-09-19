import { BatteryChargingIcon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Search from "../components/Search.jsx";


const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigate = () => navigate(location.pathname === '/signIn' ? '/' : '/signIn');

    return (
        <header className="absolute top-0 left-0 w-full bg-blue-600 text-white shadow-md z-20">
            <div className="container mx-auto px-4 py-2 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-2 justify-center sm:justify-start">
                    <BatteryChargingIcon className="h-6 w-6 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-7 lg:w-7" />
                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold">EV Charge Finder</h1>
                </div>
                <div className="flex justify-center sm:hidden order-1">
                    <button
                        onClick={handleNavigate}
                        className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-blue-50 transition-colors text-sm"
                    >
                        {location.pathname === "/signIn" ? "Back to Map" : "Login / Register"}
                    </button>
                </div>
                <div
                    className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 justify-center sm:justify-end order-2 w-full sm:w-auto">
                    <Search/>
                    <button
                        onClick={handleNavigate}
                        className="hidden sm:inline bg-white text-blue-600 px-3 py-1 sm:px-4 sm:py-1 md:px-5 md:py-2 rounded-md hover:bg-blue-50 transition-colors text-sm sm:text-base"
                    >
                        {location.pathname === "/signIn" ? "Back to Map" : "Login / Register"}
                    </button>
                </div>
            </div>
        </header>


    );
};

export default Header;
