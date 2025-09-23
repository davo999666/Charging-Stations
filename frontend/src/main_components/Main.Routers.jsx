import {Routes, Route} from "react-router-dom";

import SignIn from "../accounting/guest/SignIn.jsx";
import SignUp from "../accounting/guest/SignUp.jsx";
import Verification from "../components/Verification.jsx";
import AddStationForm from "../components/AddStationForm.jsx";
import UpdateStationForm from "../components/UpdateStationForm.jsx";
import {createRoleHash} from "../utils/createHaseToken.js";
import Cookies from "js-cookie";
import StartCharging from "../components/StartCharging.jsx";

const MainRouters = () => {
    return (
            <Routes>
                <Route path="/" element={null}/>
                <Route path="/signIn" element={<SignIn/>}/>
                <Route path="/signUp" element={<SignUp/>}/>
                <Route path="/verification" element={<Verification />} />
                <Route path="/AddStation" element={<AddStationForm/>}/>
                <Route path="/icon" element={createRoleHash("admin") === Cookies.get("tokenHase") ? <UpdateStationForm/> : <StartCharging/>}/>
            </Routes>
    );
};

export default MainRouters;