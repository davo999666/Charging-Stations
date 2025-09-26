import Map from "./components/all/Map.jsx";
import Header from "./main_components/Header.jsx";
import {BrowserRouter} from "react-router-dom";
import MainRouters from "./main_components/Main.Routers.jsx";
import {useGetAllStationsQuery} from "./api/apiStation.js";
import {useDispatch} from "react-redux";
import {setStations} from "./features/stationSlice.js";
import {useEffect} from "react";


function App() {
    const dispatch = useDispatch();
    const { data: stations = [], isSuccess } = useGetAllStationsQuery();
    useEffect(() => {
        dispatch(setStations(stations));
    }, [isSuccess]);

    return (
        <BrowserRouter>
            <div className="relative flex flex-col h-screen w-full bg-gray-100">
                <Header/>
                <Map/>
                <MainRouters/>
            </div>
        </BrowserRouter>
    )
}

export default App
