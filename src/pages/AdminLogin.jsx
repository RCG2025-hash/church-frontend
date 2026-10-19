
import React, { useState, useEffect } from "react";
import {
  FaUserShield,
  FaEye,
  FaEyeSlash,
  FaChurch,
  FaArrowLeft,
  FaLock,
  FaShieldAlt,
} from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import church_logo from "../assets/church_logo.png";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect users who already have a token.
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/admindashboard", { replace: true });
    }
  }, [navigate]);

  // Handle administrator login.
  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!username.trim()) {
      toast.warning("Please enter your username.");
      return;
    }

    if (!password.trim()) {
      toast.warning("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const API_URL = import.meta.env.VITE_API_URL;

      const res = await axios.post(`${API_URL}/api/login`, {
        username: username.trim(),
        password,
      });

      if (!res.data?.token) {
        toast.error(
          "Login failed. No authentication token was received."
        );
        return;
      }

      localStorage.setItem("token", res.data.token);

      toast.success("Login successful. Welcome back!");

      setTimeout(() => {
        navigate("/admindashboard", { replace: true });
      }, 800);
    } catch (err) {
      console.error("Login Error:", err);

      const message = err.response?.data?.message;

      if (message) {
        toast.error(message);
      } else if (err.request) {
        toast.error(
          "Unable to connect to the server. Please check your internet connection."
        );
      } else {
        toast.error("Unable to login. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07152f] px-4 py-10 sm:px-6 lg:px-8">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-red-600/15 blur-3xl"
      />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl shadow-black/30 lg:grid-cols-2">
        {/* Left branding panel */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#102b59] via-[#0b1f46] to-[#07152f] p-10 text-white lg:flex xl:p-12">
          <div
            aria-hidden="true"
            className="absolute -right-20 top-20 h-64 w-64 rounded-full border-[40px] border-white/5"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full border-[50px] border-red-500/10"
          />

          <div className="relative">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-lg">
                <img
                  src={church_logo}
                  alt="Reconciliation Church of God logo"
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <p className="font-serif text-xl font-bold leading-tight">
                  Reconciliation
                  <br />
                  Church of God
                </p>

                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-300">
                  HisGrace Chapel
                </p>
              </div>
            </div>

            <div className="mt-20">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-blue-100">
                <FaShieldAlt className="text-red-400" />
                Secure Administration
              </span>

              <h1 className="mt-7 font-serif text-4xl font-bold leading-tight xl:text-5xl">
                Welcome to the
                <span className="mt-2 block text-red-400">
                  Admin Portal
                </span>
              </h1>

              <p className="mt-6 max-w-md text-base leading-8 text-blue-100">
                Manage church activities, member registrations,
                workforce applications, and messages through
                your administration dashboard.
              </p>
            </div>
          </div>

          <div className="relative mt-16 border-t border-white/15 pt-6">
            <div className="flex items-center gap-3 text-sm text-blue-100">
              <FaLock className="text-red-400" />
              <span>Authorized administrators only</span>
            </div>
          </div>
        </section>

        {/* Right login panel */}
        <section className="flex items-center justify-center bg-white px-6 py-10 sm:px-10 sm:py-14 lg:px-10 xl:px-14">
          <div className="w-full max-w-md">
            {/* Mobile branding */}
            <div className="mb-8 flex flex-col items-center text-center lg:hidden">
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-md ring-1 ring-slate-200">
                <img
                  src={church_logo}
                  alt="Reconciliation Church of God logo"
                  className="h-full w-full object-contain"
                />
              </div>

              <h1 className="mt-4 font-serif text-xl font-bold text-[#0b1f46]">
                Reconciliation Church of God
              </h1>

              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
                HisGrace Chapel
              </p>
            </div>

            <div className="mb-8">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#0b1f46]">
                <FaUserShield className="text-2xl" />
              </div>

              <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-600">
                Administrator Access
              </p>

              <h2 className="mt-3 font-serif text-3xl font-bold text-[#0b1f46] sm:text-4xl">
                Sign In
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Enter your administrator credentials to continue.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Username
                </label>

                <div className="relative">
                  <FaUserShield
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={loading}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-700 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>

                <div className="relative">
                  <FaLock
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-12 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-700 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    disabled={loading}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    title={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#0b1f46] px-6 py-4 font-semibold text-white shadow-lg shadow-blue-950/15 transition duration-300 hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-red-600/20 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <svg
                      className="h-5 w-5 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Signing In...
                  </>
                ) : (
                  <>
                    <FaLock />
                    Sign In to Dashboard
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4">
              <FaShieldAlt className="mt-0.5 shrink-0 text-[#163568]" />

              <p className="text-xs leading-5 text-slate-600">
                This area is restricted to authorized church
                administrators. Please keep your login credentials
                private.
              </p>
            </div>

            <div className="mt-8 border-t border-slate-100 pt-6 text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-red-600"
              >
                <FaArrowLeft aria-hidden="true" />
                Back to Church Website
              </Link>
            </div>

            <p className="mt-6 text-center text-xs text-slate-400">
              &copy; {new Date().getFullYear()} Reconciliation Church of God
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AdminLogin;