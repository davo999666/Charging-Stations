import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

const SignIn = () => {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log({ emailOrUsername, password });
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
                    placeholder="Email or Username"
                    value={emailOrUsername}
                    onChange={(e) => setEmailOrUsername(e.target.value)}
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
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Sign In
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
