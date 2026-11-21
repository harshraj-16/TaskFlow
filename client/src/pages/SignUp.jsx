
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const SignUp = () => {

    const [fromData, setFromData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState(false);

    // HANDLE INPUT CHANGE
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFromData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // HANDLE SIGNUP
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setMessage("");
            setSuccess(false);

            const response = await api.post(
                "/auth/signup",
                fromData
            );

            setMessage(response.data.message);
            setSuccess(true);

            setFromData({
                name: "",
                email: "",
                password: ""
            });

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Signup failed. Please try again."
            );
            setSuccess(false);

        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-12">

            {/* BACKGROUND DECORATION */}
            <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl"></div>

            <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-purple-200/40 blur-3xl"></div>

            {/* SIGNUP CARD */}
            <div className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60 sm:p-10">

                {/* LOGO */}
                <Link
                    to="/"
                    className="mb-8 flex items-center justify-center gap-3"
                >

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-2xl font-bold text-white shadow-lg shadow-indigo-200">
                        T
                    </div>

                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                        Task<span className="text-indigo-600">Flow</span>
                    </h1>

                </Link>

                {/* HEADING */}
                <div className="mb-8 text-center">

                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                        Create Account
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                        Join TaskFlow and start organizing your work efficiently.
                    </p>

                </div>

                {/* SUCCESS / ERROR MESSAGE */}
                {message && (
                    <div
                        className={`mb-5 rounded-xl border px-4 py-3 text-sm ${
                            success
                                ? "border-green-200 bg-green-50 text-green-700"
                                : "border-red-200 bg-red-50 text-red-700"
                        }`}
                        role="status"
                    >
                        {message}
                    </div>
                )}

                {/* SIGNUP FORM */}
                <form onSubmit={handleSubmit}>

                    {/* NAME */}
                    <div className="mb-5">

                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Full Name
                        </label>

                        <div className="relative">

                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                                👤
                            </span>

                            <input
                                type="text"
                                name="name"
                                value={fromData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                required
                            />

                        </div>

                    </div>

                    {/* EMAIL */}
                    <div className="mb-5">

                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Email Address
                        </label>

                        <div className="relative">

                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                                ✉
                            </span>

                            <input
                                type="email"
                                name="email"
                                value={fromData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                required
                            />

                        </div>

                    </div>

                    {/* PASSWORD */}
                    <div className="mb-6">

                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Password
                        </label>

                        <div className="relative">

                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                                🔒
                            </span>

                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={fromData.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3.5 pl-12 pr-16 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>

                        </div>

                        <p className="mt-2 text-xs text-slate-400">
                            Choose a strong password to protect your account.
                        </p>

                    </div>

                    {/* SIGNUP BUTTON */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                    >

                        {loading ? (
                            <>
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                Creating Account...
                            </>
                        ) : (
                            <>
                                Create Account
                                <span>→</span>
                            </>
                        )}

                    </button>

                </form>

                {/* LOGIN LINK */}
                <div className="mt-8 border-t border-slate-100 pt-6 text-center">

                    <p className="text-sm text-slate-500">
                        Already have an account?

                        <Link
                            to="/login"
                            className="ml-1 font-bold text-indigo-600 transition hover:text-indigo-800"
                        >
                            Login
                        </Link>

                    </p>

                </div>

                {/* HOME LINK */}
                <div className="mt-5 text-center">

                    <Link
                        to="/"
                        className="text-sm font-medium text-slate-400 transition hover:text-indigo-600"
                    >
                        ← Back to Home
                    </Link>

                </div>

            </div>

        </div>
    );
};

export default SignUp;
