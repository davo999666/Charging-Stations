import React, {useMemo, useState} from "react";
import {Filter, Search as SearchIcon} from "lucide-react";
import {useDispatch} from "react-redux";
import {setPosition, setZoom} from "../../features/mapSlice.js";
import {filterStations} from "../../features/stationSlice.js";
import {useGetAllStationsQuery} from "../../api/apiStation.js";
import {telAvivPosition} from "../../utils/const.js";


const Search = () => {
    const {data: stations = []} = useGetAllStationsQuery();
    const [selectedCity, setSelectedCity] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const dispatch = useDispatch();

    const {sites, filters} = useMemo(() => {
        const cities = [...new Set(stations.map(s => s.city))].sort();
        const types = [...new Set(stations.map(s => s.type))];
        const hasAvailable = stations.some(s => s.status === "available");
        const filterList = hasAvailable ? [...types, "available"].sort() : types.sort();
        return {
            sites: cities,
            filters: filterList,
        };
    }, [stations]);

    const toggleFilter = (filter) => {
        setSelectedFilters((prev) =>
            prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
        );
    };

    const handleSearchClick = async () => {
        let position;
        // if city is selected → set map position
        if (selectedCity) {
            const station = stations.find((s) => s.city === selectedCity);
            if (station) {
                position = [station.latitude, station.longitude];
                dispatch(setPosition(position));
                dispatch(setZoom(13));
            }
        } else {
            dispatch(setPosition(telAvivPosition));
            dispatch(setZoom(9));
        }
        // if user selected "available" in checkboxes
        const hasAvailable = selectedFilters.includes("available");
        dispatch(
            filterStations({
                city: selectedCity || null, // ✅ null means "no city filter"
                types: selectedFilters.filter((f) => f !== "available"),
                status: hasAvailable ? "available" : null,
            })
        );
    };


    return (
        <div className="flex items-center gap-2 relative ">
            <SearchIcon
                className="cursor-pointer text-gray-800 bg-auto"
                size={28}
                onClick={handleSearchClick}
            />
            <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-2 py-1 rounded-md text-black focus:outline-none w-40"
            >
                <option value="">All city</option>
                {sites.map((site, i) => (
                    <option key={site || i} value={site}>
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
                    className="flex items-center gap-1 bg-blue-800 px-2 py-1 rounded-md hover:bg-blue-950 transition text-white"
                >
                    <Filter size={16}/>
                    Filter
                </button>

                {showFilters && (
                    <div
                        className="absolute top-full left-0 mt-1 bg-white text-black rounded-md shadow w-44 p-2 z-20"
                        onMouseDown={(e) => e.preventDefault()} // prevents blur from firing immediately
                    >
                        {filters.map((f, i) => (
                            <label key={f || i} className="flex items-center gap-2 cursor-pointer py-1">
                                <input
                                    type="checkbox"
                                    checked={selectedFilters.includes(f)}
                                    onChange={() => toggleFilter(f)}
                                />
                                <span className="text-sm">
                                {typeof f === "string" ? f.charAt(0).toUpperCase() + f.slice(1) : ""}
                                    {f ? " Charging" : ""}
                                </span>
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

