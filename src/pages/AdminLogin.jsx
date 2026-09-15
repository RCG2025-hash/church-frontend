import React, { useState, useEffect } from "react";
import {
    FaUserShield,
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminLogin = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    // ==========================
    // Check Existing Login
    // ==========================

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (token) {

            navigate("/admindashboard");

        }

    }, [navigate]);

    // ==========================
    // Handle Login
    // ==========================

    const handleLogin = async (e) => {

        e.preventDefault();

        // Prevent multiple submissions

        if (loading) return;

        // ==========================
        // Basic Validation
        // ==========================

        if (!username.trim()) {

            toast.warning(
                "Please enter your username."
            );

            return;

        }

        if (!password.trim()) {

            toast.warning(
                "Please enter your password."
            );

            return;

        }

        try {

            setLoading(true);

            const API_URL =
                import.meta.env.VITE_API_URL;

            // ==========================
            // Login Request
            // ==========================

            const res = await axios.post(
                `${API_URL}/api/login`,
                {
                    username: username.trim(),
                    password,
                }
            );

            // ==========================
            // Check Token
            // ==========================

            if (!res.data?.token) {

                toast.error(
                    "Login failed. No authentication token was received."
                );

                return;

            }

            // ==========================
            // Save Token
            // ==========================

            localStorage.setItem(
                "token",
                res.data.token
            );

            // ==========================
            // Success Message
            // ==========================

            toast.success(
                "Login successful. Welcome back!"
            );

            // ==========================
            // Redirect
            // ==========================

            setTimeout(() => {

                navigate("/admindashboard");

            }, 800);

        } catch (err) {

            console.error(
                "Login Error:",
                err
            );

            // ==========================
            // Server Error
            // ==========================

            const message =
                err.response?.data?.message;

            if (message) {

                toast.error(message);

            } else if (err.request) {

                toast.error(
                    "Unable to connect to the server. Please check your internet connection."
                );

            } else {

                toast.error(
                    "Unable to login. Please try again."
                );

            }

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-amber-100 via-white to-yellow-50 flex items-center justify-center p-5">

            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-10">

                {/* ==========================
                    Header
                ========================== */}

                <div className="text-center mb-8">

                    <FaUserShield
                        className="mx-auto text-6xl text-amber-600 mb-4"
                    />

                    <h1 className="text-3xl font-bold">

                        Church Admin

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Sign in to continue

                    </p>

                </div>

                {/* ==========================
                    Login Form
                ========================== */}

                <form
                    onSubmit={handleLogin}
                    className="space-y-5"
                >

                    {/* ==========================
                        Username
                    ========================== */}

                    <div>

                        <label
                            htmlFor="username"
                            className="block mb-2 font-medium"
                        >
                            Username
                        </label>

                        <input
                            id="username"
                            type="text"
                            autoComplete="username"
                            placeholder="Enter username"
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            disabled={loading}
                            required
                        />

                    </div>

                    {/* ==========================
                        Password
                    ========================== */}

                    <div>

                        <label
                            htmlFor="password"
                            className="block mb-2 font-medium"
                        >
                            Password
                        </label>

                        <div className="relative">

                            <input
                                id="password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                autoComplete="current-password"
                                placeholder="Enter password"
                                className="w-full border rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                disabled={loading}
                                required
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-amber-600 transition"
                                title={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                                disabled={loading}
                            >

                                {showPassword ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />
                                )}

                            </button>

                        </div>

                    </div>

                    {/* ==========================
                        Login Button
                    ========================== */}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full text-white py-3 rounded-lg font-semibold transition ${
                            loading
                                ? "bg-amber-400 cursor-not-allowed"
                                : "bg-amber-600 hover:bg-amber-700"
                        }`}
                    >

                        {loading
                            ? "Signing In..."
                            : "Login"}

                    </button>

                </form>

            </div>

        </div>

    );

};

export default AdminLogin;