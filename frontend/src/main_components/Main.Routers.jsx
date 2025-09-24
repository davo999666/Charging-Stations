import {Routes, Route} from "react-router-dom";

import SignIn from "../accounting/guest/SignIn.jsx";
import SignUp from "../accounting/guest/SignUp.jsx";
import Verification from "../components/Verification.jsx";
import AddStationForm from "../components/AddStationForm.jsx";
import UpdateStationForm from "../components/UpdateStationForm.jsx";
import {checkToken} from "../utils/checkToken.js";
import Cookies from "js-cookie";
import NavMenuUser from "../components/NavMenuUser.jsx";
import NavMenuAdmin from "../components/NavMenuAdmin.jsx";
import StartCharging from "../components/StartCharging.jsx";
import StationHistory from "../components/StationHistory.jsx";

const MainRouters = () => {
    return (
            <Routes>
                <Route path="/" element={null}/>
                <Route path="/signIn" element={<SignIn/>}/>
                <Route path="/signUp" element={<SignUp/>}/>
                <Route path="/verification" element={<Verification />} />
                <Route path="/AddStation" element={<AddStationForm/>}/>
                <Route path="/menu" element={checkToken(Cookies.get("tokenHase"))  ? <NavMenuAdmin/> : <NavMenuUser/>}/>
                <Route path="/updateStation" element={<UpdateStationForm/>}/>
                <Route path="/startCharging" element={<StartCharging/>}/>
                <Route path="/stationHistory" element={<StationHistory/>}/>
            </Routes>
    );
};

export default MainRouters;