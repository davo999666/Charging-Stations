import {Routes, Route, useLocation, Navigate, useNavigate} from "react-router-dom";
import SignIn from "../accounting/guest/SignIn.jsx";
import SignUp from "../accounting/guest/SignUp.jsx";
import Verification from "../components/user/Verification.jsx";
import AddStationForm from "../components/user/AddStationForm.jsx";
import UpdateStationForm from "../components/admin/UpdateStationForm.jsx";
import {checkToken} from "../utils/checkToken.js";
import StartCharging from "../components/user/StartCharging.jsx";
import StationHistory from "../components/admin/StationHistory.jsx";
import {useEffect} from "react";
import UserHistory from "../components/user/UserHistory.jsx";
import Cookies from "js-cookie";


const MainRouters = () => {
    const role = Cookies.get("tokenHase");
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (checkToken(role, "charging") && location.pathname !== "/startCharging") {
            navigate("/startCharging", { replace: true });
        }
    }, [role, location, navigate]);
    return (
            <Routes>
                <Route path="/" element={null}/>
                <Route path="/signIn" element={<SignIn/>}/>
                <Route path="/signUp" element={<SignUp/>}/>
                <Route path="/verification" element={<Verification />} />
                <Route path="/AddStation" element={<AddStationForm/>}/>
                <Route path="/updateStation" element={<UpdateStationForm/>}/>
                <Route path="/startCharging" element={<StartCharging/>}/>
                <Route path="/stationHistory" element={<StationHistory/>}/>
                <Route path="/userHistory" element={<UserHistory />} />
            </Routes>
    );
};

export default MainRouters;