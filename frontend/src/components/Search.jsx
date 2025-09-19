import React, {useState} from "react";
import {Filter, Search as SearchIcon} from "lucide-react";

const Search = () => {
    const [selectedCity, setSelectedCity] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);

    const sites = [
        "Tel Aviv",
        "Jerusalem",
        "Haifa",
        "Beersheba",
        "Eilat",
        "Netanya",
        "Ashdod",
        "Rishon LeZion",
        "Herzliya",
        "Petah Tikva",
    ].sort();

    const filters = ["Fast Charging", "Slow Charging", "Available Now"];

    const toggleFilter = (filter) => {
        setSelectedFilters((prev) =>
            prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
        );
    };

    const handleSearchClick = () => {
        alert(
            `Searching for: ${selectedCity || "any city"}\nFilters: ${
                selectedFilters.length > 0 ? selectedFilters.join(", ") : "none"
            }`
        );
    };

    return (
        <div className="flex items-center gap-2 relative">
            <SearchIcon
                className="cursor-pointer text-gray-500"
                size={16}
                onClick={handleSearchClick}
            />
            <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-2 py-1 rounded-md text-black focus:outline-none w-40"
            >
                <option value="">Select city...</option>
                {sites.map((site) => (
                    <option key={site} value={site}>
                        {site}
                    </option>
                ))}
            </select>
            <div
                className="relative"
                tabIndex={0} // make focusable
                onBlur={() => {
                    // Delay closing slightly so clicks inside dropdown register
                    setTimeout(() => setShowFilters(false), 100);
                }}
            >
                <button
                    onClick={() => setShowFilters((s) => !s)}
                    className="flex items-center gap-1 bg-blue-700 px-2 py-1 rounded-md hover:bg-blue-800 transition text-white"
                >
                    <Filter size={14}/>
                    Filter
                </button>

                {showFilters && (
                    <div
                        className="absolute top-full left-0 mt-1 bg-white text-black rounded-md shadow w-44 p-2 z-30"
                        onMouseDown={(e) => e.preventDefault()} // prevents blur from firing immediately
                    >
                        {filters.map((f) => (
                            <label key={f} className="flex items-center gap-2 cursor-pointer py-1">
                                <input
                                    type="checkbox"
                                    checked={selectedFilters.includes(f)}
                                    onChange={() => toggleFilter(f)}
                                />
                                <span className="text-sm">{f}</span>
                            </label>
                        ))}

                        {selectedFilters.length > 0 && (
                            <div className="mt-2 text-xs text-gray-600">
                                Selected: {selectedFilters.join(", ")}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
