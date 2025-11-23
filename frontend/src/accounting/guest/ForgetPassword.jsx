import { useState } from "react";
import {useLoginMutation, useSendEmailResetPasswordMutation, useVerificationMutation,} from "../../api/apiUser.js";
import {createToken} from "../../utils/const.js";
import Cookies from "js-cookie";
import {setStations} from "../../features/stationSlice.js";
import {useLazyGetAllStationsQuery} from "../../api/apiStation.js";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

function ForgetPassword() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // ✅ RTK mutations
    const [sendEmailResetPassword, { isLoading: isSending }] = useSendEmailResetPasswordMutation();
    const [verifyCode, { isLoading: isVerifying }] = useVerificationMutation();
    const [login] = useLoginMutation();
    const [triggerAllStations] = useLazyGetAllStationsQuery();

    // 📨 STEP 1 — Send email
    const handleSubmitEmail = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await sendEmailResetPassword({ email }).unwrap();
            console.log("✅ Email sent:", res);
            setStep(2);
        } catch (err) {
            console.error("❌ Error:", err);
            setError(err?.data?.message || "Server error, please try again.");
        }
    };

    // 🔐 STEP 2 — Verify code and reset password
    const handleSubmitNewPassword = async (e) => {
        e.preventDefault();
        setError("");

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            // ✅ 1. Verify code and reset password in backend
            const res = await verifyCode({ email, code, newPassword }).unwrap();
            console.log("✅ Password changed:", res);

            // ✅ 2. Create local token (same as login)
            const token = createToken(res.user.login, newPassword);

            // ✅ 3. Login automatically with new password
            // use res.user.login because your reset endpoint returns user object
            const result = await login({login: res.user.login, password: newPassword,}).unwrap();
            console.log("✅ Login result:", result);

            // ✅ 4. Save cookies same as in handleSubmit (login)
            Cookies.set("tokenHase", result.tokenHase, { expires: 1 });
            Cookies.set("token", token, { expires: 1 });
            Cookies.set("login", result.foundUser.login, { expires: 1 });

            // ✅ 5. Notify the app
            window.dispatchEvent(new Event("tokenChange"));

            navigate("/");
            alert(`Welcome ${result.foundUser.fullName || result.foundUser.login}`);

            // ✅ 6. Load stations (optional, same as login)
            if (result) {
                const stations = await triggerAllStations().unwrap();
                console.log(stations);
                dispatch(setStations(stations));
            }
        } catch (err) {
            console.error("❌ Error:", err);
            setError(err?.data?.message || "Server error, please try again.");
        }
    };


    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[400]">
            {step === 1 ? (
                // STEP 1: Enter email
                <form
                    onSubmit={handleSubmitEmail}
                    className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
                >
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Forgot Password
                    </h2>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <button
                        type="submit"
                        disabled={isSending}
                        className={`w-full flex items-center justify-center gap-2 text-white py-2 rounded-md transition ${
                            isSending
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {isSending ? "Sending..." : "Send Code"}
                    </button>
                </form>
            ) : (
                // STEP 2: Enter code + passwords
                <form
                    onSubmit={handleSubmitNewPassword}
                    className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
                >
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Reset Password
                    </h2>

                    <input
                        type="text"
                        placeholder="Code from email"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                        className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <button
                        type="submit"
                        disabled={isVerifying}
                        className={`w-full flex items-center justify-center gap-2 text-white py-2 rounded-md transition ${
                            isVerifying
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700"
                        }`}
                    >
                        {isVerifying ? "Saving..." : "Change Password"}
                    </button>
                </form>
            )}
        </div>
    );
}

export default ForgetPassword;
