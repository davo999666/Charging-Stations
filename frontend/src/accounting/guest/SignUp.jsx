import React, { useState } from "react";
import { useRegisterMutation } from "../../api/apiUser.js";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {createToken} from "../../utils/const.js";
import {setToken} from "../../features/tokenSlice.js"; // adjust the path

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [register, { isLoading, isError, error }] = useRegisterMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
             await register({login: username, fullName, email, phone, password,}).unwrap();
            const token = createToken(username, password);
            dispatch(setToken(token));
            alert("✅ Registration successful! You can now sign in.");
            navigate("/verification", { state: { email } });
        } catch (err) {
            console.error("Registration failed:", err);
            alert("❌ Registration failed. Please try again.");
        }
    };

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full text-white py-2 rounded-md transition ${
                        isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    {isLoading ? "Registering..." : "Sign Up"}
                </button>

                {isError && (
                    <p className="text-red-600 mt-2 text-sm">
                        {error?.data?.message || "Something went wrong"}
                    </p>
                )}
            </form>
        </div>
    );
};

export default SignUp;
