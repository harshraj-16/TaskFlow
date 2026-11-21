import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const DasboardNav = () => {

    const handleLogout = async () => {
        try {
            await api.post("/auth/logout");
            setUser(null);
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
            setError("Logout failed. Please try again.");
        }
    };

    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    
    return (
        <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-xl font-bold text-white">
                        T
                    </div>

                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-slate-900">
                            TaskFlow
                        </h1>
                        <p className="text-xs text-slate-500">
                            Manage your productivity
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">

                    <div className="hidden text-right sm:block">
                        <p className="text-sm font-semibold text-slate-800">
                            {user?.name || "User"}
                        </p>
                        <p className="text-xs text-slate-500">
                            {user?.email}
                        </p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>

                    <button
                        onClick={handleLogout}
                        className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                        Logout
                    </button>

                </div>
            </div>
        </nav>
    )
}

export default DasboardNav