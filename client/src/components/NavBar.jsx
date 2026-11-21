
import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {

    const navLinkStyle = ({ isActive }) =>
        `rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
            isActive
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-600 hover:bg-slate-100 hover:text-indigo-600"
        }`;

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md">

            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">


                {/* <Link to="/home"></Link> */}

                {/* LOGO */}
                <Link to="/home" className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-2xl font-extrabold text-white shadow-lg shadow-indigo-200 transition hover:scale-105">
                        T
                    </div>

                    <div>
                        <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                            Task<span className="text-indigo-600">Flow</span>
                        </h2>

                        <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400">
                            Manage your productivity
                        </p>
                    </div>

                </Link>

                {/* NAVIGATION LINKS */}
                <div className="hidden items-center gap-2 md:flex">

                    <NavLink to="/home" end className={navLinkStyle}>
                        Home
                    </NavLink>

                    <NavLink to="/login" className={navLinkStyle}>
                        Login
                    </NavLink>

                    <NavLink to="/signup" className={navLinkStyle}>
                        Signup
                    </NavLink>

                    <NavLink to="/dashboard" className={navLinkStyle}>
                        Dashboard
                    </NavLink>

                </div>

                {/* GET STARTED BUTTON */}
                <div className="hidden md:block">

                    <Link
                        to="/signup"
                        className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg"
                    >
                        Get Started →
                    </Link>

                </div>

                {/* MOBILE NAVIGATION */}
                <div className="flex items-center gap-2 md:hidden">

                    <NavLink
                        to="/login"
                        className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
                    >
                        Login
                    </NavLink>

                    <NavLink
                        to="/signup"
                        className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                    >
                        Signup
                    </NavLink>

                </div>

            </div>

        </nav>
    );
};

export default NavBar;
