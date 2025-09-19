import {Routes, Route} from "react-router-dom";

import SignIn from "../accounting/guest/SignIn.jsx";
import SignUp from "../accounting/guest/SignUp.jsx";

const MainRouters = () => {
    return (
            <Routes>
                <Route path="/" element={null}/>
                <Route path="/signIn" element={<SignIn/>}/>
                <Route path="/signUp" element={<SignUp/>}/>
            </Routes>
    );
};

export default MainRouters;