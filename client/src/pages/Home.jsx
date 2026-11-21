
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/api/test")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Backend request failed");
                }
                return res.json();
            })
            .then((data) => {
                setMessage(data.message);
                setIsConnected(true);
            })
            .catch((error) => {
                console.error("Backend error:", error);
                setMessage("Unable to connect to backend");
                setIsConnected(false);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen overflow-hidden bg-slate-50">

            {/* HERO SECTION */}
            <main className="mx-auto max-w-7xl px-6">

                <section className="grid min-h-[650px] items-center gap-12 py-16 lg:grid-cols-2 lg:py-20">

                    {/* LEFT CONTENT */}
                    <div>

                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2">
                            <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                            <span className="text-sm font-semibold text-indigo-700">
                                Your productivity starts here
                            </span>
                        </div>

                        <h1 className="max-w-xl text-5xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-6xl">
                            Organize your work.
                            <span className="block text-indigo-600">
                                Achieve more.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-lg text-lg leading-8 text-slate-500">
                            Welcome to TaskFlow, your personal task management
                            workspace. Create tasks, track your progress, and
                            stay focused on what matters most.
                        </p>

                        {/* BUTTONS */}
                        <div className="mt-9 flex flex-wrap gap-4">

                            <Link
                                to="/signup"
                                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-7 py-4 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-1 hover:bg-indigo-700"
                            >
                                Create Free Account
                                <span>→</span>
                            </Link>

                            <Link
                                to="/login"
                                className="rounded-xl border border-slate-300 bg-white px-7 py-4 font-semibold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50"
                            >
                                Login to Account
                            </Link>

                        </div>

                        {/* BACKEND STATUS */}
                        <div className="mt-10 inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">

                            <span className={`h-3 w-3 rounded-full ${
                                loading
                                    ? "animate-pulse bg-amber-400"
                                    : isConnected
                                        ? "bg-green-500"
                                        : "bg-red-500"
                            }`}></span>

                            <div>
                                <p className="text-sm font-semibold text-slate-800">
                                    Backend Connection
                                </p>

                                <p className="text-xs text-slate-500">
                                    {loading
                                        ? "Checking server..."
                                        : message}
                                </p>
                            </div>

                            <span className={`ml-2 rounded-full px-3 py-1 text-xs font-semibold ${
                                loading
                                    ? "bg-amber-100 text-amber-700"
                                    : isConnected
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                            }`}>
                                {loading
                                    ? "Checking"
                                    : isConnected
                                        ? "Online"
                                        : "Offline"}
                            </span>

                        </div>

                    </div>

                    {/* RIGHT VISUAL */}
                    <div className="relative">

                        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-indigo-200/50 blur-3xl"></div>
                        <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-purple-200/50 blur-3xl"></div>

                        <div className="relative rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-200/70 sm:p-8">

                            {/* MOCK DASHBOARD HEADER */}
                            <div className="flex items-center justify-between border-b border-slate-100 pb-5">

                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">
                                        My Workspace
                                    </h3>
                                    <p className="mt-1 text-sm text-slate-400">
                                        Your productivity overview
                                    </p>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 text-lg">
                                    👋
                                </div>

                            </div>

                            {/* MOCK STATS */}
                            <div className="mt-6 grid grid-cols-2 gap-4">

                                <div className="rounded-2xl bg-indigo-50 p-5">
                                    <p className="text-sm font-medium text-indigo-600">
                                        Total Tasks
                                    </p>
                                    <h3 className="mt-2 text-3xl font-bold text-slate-900">
                                        24
                                    </h3>
                                    <p className="mt-1 text-xs text-slate-500">
                                        All activities
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-green-50 p-5">
                                    <p className="text-sm font-medium text-green-600">
                                        Completed
                                    </p>
                                    <h3 className="mt-2 text-3xl font-bold text-slate-900">
                                        18
                                    </h3>
                                    <p className="mt-1 text-xs text-slate-500">
                                        Great progress!
                                    </p>
                                </div>

                            </div>

                            {/* MOCK TASK LIST */}
                            <div className="mt-7">

                                <div className="mb-4 flex items-center justify-between">
                                    <h4 className="font-bold text-slate-900">
                                        Recent Tasks
                                    </h4>
                                    <span className="text-xs font-semibold text-indigo-600">
                                        Preview
                                    </span>
                                </div>

                                {[
                                    {
                                        title: "Complete React Project",
                                        category: "Development",
                                        status: "Completed",
                                        color: "bg-green-100 text-green-700"
                                    },
                                    {
                                        title: "Practice DSA Problems",
                                        category: "Learning",
                                        status: "In Progress",
                                        color: "bg-blue-100 text-blue-700"
                                    },
                                    {
                                        title: "Prepare for Placement",
                                        category: "Career",
                                        status: "Pending",
                                        color: "bg-amber-100 text-amber-700"
                                    }
                                ].map((task, index) => (

                                    <div
                                        key={index}
                                        className="mb-3 flex items-center justify-between gap-3 rounded-xl border border-slate-100 p-4 transition hover:border-indigo-200 hover:bg-slate-50"
                                    >

                                        <div className="flex min-w-0 items-center gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-lg">
                                                ✓
                                            </div>

                                            <div className="min-w-0">
                                                <h5 className="truncate text-sm font-semibold text-slate-800">
                                                    {task.title}
                                                </h5>
                                                <p className="mt-1 text-xs text-slate-400">
                                                    {task.category}
                                                </p>
                                            </div>
                                        </div>

                                        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${task.color}`}>
                                            {task.status}
                                        </span>

                                    </div>

                                ))}

                            </div>

                            {/* PROGRESS BAR */}
                            <div className="mt-6 rounded-xl bg-slate-50 p-4">

                                <div className="mb-3 flex justify-between text-sm">
                                    <span className="font-semibold text-slate-700">
                                        Weekly Progress
                                    </span>
                                    <span className="font-bold text-indigo-600">
                                        75%
                                    </span>
                                </div>

                                <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                                    <div className="h-full w-3/4 rounded-full bg-indigo-600"></div>
                                </div>

                            </div>

                        </div>

                    </div>

                </section>

                {/* FEATURES SECTION */}
                <section className="border-t border-slate-200 py-20">

                    <div className="mx-auto mb-12 max-w-2xl text-center">
                        <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
                            Why TaskFlow?
                        </p>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Everything you need to stay organized
                        </h2>

                        <p className="mt-4 leading-7 text-slate-500">
                            Simple tools to help you plan your day, manage
                            responsibilities, and achieve your goals.
                        </p>
                    </div>

                    <div className="grid gap-6 pb-16 md:grid-cols-3">

                        <div className="rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl">
                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-2xl">
                                📝
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">
                                Easy Task Management
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                Create, organize, update, and delete your
                                tasks from one simple workspace.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl">
                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
                                📊
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">
                                Track Your Progress
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                Monitor pending and completed tasks to
                                understand your productivity.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl">
                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-2xl">
                                🔒
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">
                                Secure Workspace
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                Access your personal tasks through
                                authenticated user accounts.
                            </p>
                        </div>

                    </div>

                </section>

            </main>

            {/* FOOTER */}
            <footer className="border-t border-slate-200 bg-white">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-7 text-sm text-slate-500 sm:flex-row lg:px-10">

                    <p>
                        © {new Date().getFullYear()} TaskFlow. All rights reserved.
                    </p>

                    <p>
                        Built for better productivity.
                    </p>

                </div>
            </footer>

        </div>
    );
};

export default Home;
