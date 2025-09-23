import Map from "./components/Map.jsx";
import Header from "./main_components/Header.jsx";
import {BrowserRouter} from "react-router-dom";
import MainRouters from "./main_components/Main.Routers.jsx";
import {useGetAllStationsQuery} from "./api/apiStation.js";


function App() {
    const { data: stations = [] } = useGetAllStationsQuery();
    return (
        <BrowserRouter>
            <div className="relative flex flex-col h-screen w-full bg-gray-100">
                <Header/>
                <Map stations={stations} />
                <MainRouters/>
            </div>
        </BrowserRouter>
    )
}

export default App
