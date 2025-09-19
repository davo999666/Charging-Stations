import Map from "./components/Map.jsx";
import Header from "./main_components/Header.jsx";
import {BrowserRouter} from "react-router-dom";
import MainRouters from "./main_components/Main.Routers.jsx";

function App() {
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
