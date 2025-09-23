import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import {useLoginMutation} from "../../api/apiUser.js";
import {createToken} from "../../utils/const.js";
import Cookies from "js-cookie";

const SignIn = () => {
    const [Username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [login, { data, error, isLoading }] = useLoginMutation();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = createToken(Username, password);

            const result = await login({ login: Username, password }).unwrap();


            // Cookies.remove("token");
            Cookies.set("tokenHase", result.tokenHase, { expires: 1 });
            Cookies.set("token", token, { expires: 1 });
            Cookies.set("login", result.foundUser.login, { expires: 1 });
            navigate("/");
            alert(`Welcome ${result.fullName || Username}`);

        } catch (err) {
            console.error("Login failed:", err);
            alert("Login failed ❌");
        }
    };

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

                <input
                    type="text"
                    placeholder="Username"
                    value={Username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    className={`w-full flex items-center justify-center gap-2 text-white py-2 rounded-md transition ${
                        isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    {isLoading ? (
                        <>
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                ></path>
                            </svg>
                            Signing in...
                        </>
                    ) : (
                        "Sign In"
                    )}
                </button>

                <p className="mt-4 text-center text-gray-600"
                   onClick={() => navigate('/signUp')}>
                    Don't have an account? <span className="text-blue-600 font-semibold cursor-pointer">Sign Up</span>
                </p>
                <p className="mt-4 text-center text-gray-600"
                   onClick={() => alert("forget password")}>
                    forget password <span className="text-blue-600 font-semibold cursor-pointer">Click here</span>
                </p>
            </form>
        </div>
    );
};

export default SignIn;
