// src/pages/Verification.jsx
import React, { useState } from "react";
import { useVerificationMutation } from "../api/apiUser.js";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector} from "react-redux";


const Verification = () => {
    const [code, setCode] = useState("");
    const [verify, { isLoading }] = useVerificationMutation();
    const navigate = useNavigate();
    const location = useLocation();
    const token = useSelector((state) => state.token);

    // we passed email via navigate state
    const email = location.state?.email;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await verify({ email, code }).unwrap();
            alert("✅ Account verified!");
            Cookies.set("token", token, { expires: 1 });
            Cookies.set("login", result.login, { expires: 1 });
            navigate("/");
        } catch (err) {
            console.error("Verification failed:", err);
            alert("❌ Wrong code. Try again.");
        }
    };

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Verify Your Account</h2>
                <p className="text-gray-600 mb-4 text-center">
                    We sent a code to <span className="font-semibold">{email}</span>
                </p>

                <input
                    type="text"
                    placeholder="Enter verification code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full text-white py-2 rounded-md transition ${
                        isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    {isLoading ? "Verifying..." : "Verify"}
                </button>
            </form>
        </div>
    );
};

export default Verification;
