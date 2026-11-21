
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Login = () => {

    const { checkAuth } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setMessage("");

            const response = await api.post(
                "/auth/login",
                formData
            );

            await checkAuth();
            navigate("/dashboard");

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Login failed. Check your credentials."
            );
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">

            {/* BACKGROUND DECORATION */}
            <div className="pointer-events-none fixed left-0 top-0 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl"></div>
            <div className="pointer-events-none fixed bottom-0 right-0 h-72 w-72 rounded-full bg-purple-200/40 blur-3xl"></div>

            {/* LOGIN CARD */}
            <div className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60 sm:p-10">

                {/* LOGO */}
                <Link to="/" className="mb-8 flex items-center justify-center gap-3">

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
                        Welcome Back!
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                        Login to your account and continue managing your tasks.
                    </p>

                </div>

                {/* ERROR MESSAGE */}
                {message && (
                    <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {message}
                    </div>
                )}

                {/* LOGIN FORM */}
                <form onSubmit={handleSubmit}>

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
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                required
                            />

                        </div>

                    </div>

                    {/* PASSWORD */}
                    <div className="mb-6">

                        <div className="mb-2 flex items-center justify-between">

                            <label className="text-sm font-semibold text-slate-700">
                                Password
                            </label>

                        </div>

                        <div className="relative">

                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                                🔒
                            </span>

                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
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

                    </div>

                    {/* LOGIN BUTTON */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? (
                            <>
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                Logging in...
                            </>
                        ) : (
                            <>
                                Login to Account
                                <span>→</span>
                            </>
                        )}
                    </button>

                </form>

                {/* SIGNUP LINK */}
                <div className="mt-8 border-t border-slate-100 pt-6 text-center">

                    <p className="text-sm text-slate-500">
                        Don't have an account?

                        <Link
                            to="/signup"
                            className="ml-1 font-bold text-indigo-600 transition hover:text-indigo-800"
                        >
                            Create Account
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

export default Login;
