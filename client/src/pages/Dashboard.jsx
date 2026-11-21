
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Dashboard = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    // GET ALL TASKS
    const fetchTasks = async () => {
        try {
            const response = await api.get("/tasks");
            setTasks(response.data.tasks || []);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setTasks([]);
            setError("Unable to load tasks. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // CREATE TASK
    const handleCreateTask = async (e) => {
        e.preventDefault();

        try {
            setSubmitting(true);
            setError("");

            await api.post("/tasks", {
                title,
                description
            });

            setTitle("");
            setDescription("");

            await fetchTasks();
        } catch (error) {
            console.error("Task creation failed:", error);
            setError(
                error.response?.data?.message || "Task creation failed."
            );
        } finally {
            setSubmitting(false);
        }
    };

    // UPDATE TASK STATUS
    const handleComplete = async (id) => {
        try {
            await api.patch(`/tasks/${id}`, {
                status: "completed"
            });

            await fetchTasks();
        } catch (error) {
            console.error("Task update failed:", error);
            setError("Unable to update task.");
        }
    };

    const handleProgress = async (id) => {
        try {
            await api.patch(`/tasks/${id}`, {
                status: "in-progress"
            });

            await fetchTasks();

        } catch (error) {
            console.error("Task update failed:", error);
            setError("Unable to update task.");
        }
    };

    // DELETE TASK
    const handleDelete = async (id) => {
        try {
            await api.delete(`/tasks/${id}`);
            await fetchTasks();
        } catch (error) {
            console.error("Task deletion failed:", error);
            setError("Unable to delete task.");
        }
    };

    // LOGOUT
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

    // TASK STATISTICS
    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        task => task.status === "completed"
    ).length;

    const pendingTasks = tasks.filter(
        task => task.status === "pending"
    ).length;

    const progressTasks = tasks.filter(
        task => task.status === "in-progress"
    ).length;



    // STATUS BADGE
    const getStatusStyle = (status) => {
        switch (status) {
            case "completed":
                return "bg-green-100 text-green-700";
            case "in-progress":
                return "bg-blue-100 text-blue-700";
            default:
                return "bg-amber-100 text-amber-700";
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">


            {/* MAIN CONTENT */}
            <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8">

                {/* WELCOME SECTION */}
                <section className="mb-8">
                    <p className="mb-2 text-sm font-medium text-indigo-600">
                        YOUR WORKSPACE
                    </p>

                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                        Welcome back, {user?.name || "User"}!
                    </h2>

                    <p className="mt-2 text-slate-500">
                        Stay organized and get more things done today.
                    </p>
                </section>

                {/* ERROR MESSAGE */}
                {error && (
                    <div className="mb-6 flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        <span>{error}</span>
                        <button
                            onClick={() => setError("")}
                            className="font-bold"
                        >
                            ✕
                        </button>
                    </div>
                )}

                {/* STATISTICS */}
                <section className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">
                            Total Tasks
                        </p>
                        <h3 className="mt-3 text-3xl font-bold text-slate-900">
                            {totalTasks}
                        </h3>
                        <p className="mt-2 text-xs text-slate-400">
                            All your tasks
                        </p>
                    </div>

                    <div className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm">
                        <p className="text-sm font-medium text-amber-600">
                            Pending Tasks
                        </p>
                        <h3 className="mt-3 text-3xl font-bold text-slate-900">
                            {pendingTasks}
                        </h3>
                        <p className="mt-2 text-xs text-slate-400">
                            Waiting to be completed
                        </p>
                    </div>

                    <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
                        <p className="text-sm font-medium text-blue-600">
                            In Progress
                        </p>
                        <h3 className="mt-3 text-3xl font-bold text-slate-900">
                            {progressTasks}
                        </h3>
                        <p className="mt-2 text-xs text-slate-400">
                            Currently working on
                        </p>
                    </div>

                    <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
                        <p className="text-sm font-medium text-green-600">
                            Completed Tasks
                        </p>
                        <h3 className="mt-3 text-3xl font-bold text-slate-900">
                            {completedTasks}
                        </h3>
                        <p className="mt-2 text-xs text-slate-400">
                            Successfully completed
                        </p>
                    </div>

                </section>

                {/* CREATE TASK SECTION */}
                <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-slate-900">
                            Create a New Task
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                            Add a task to your workspace and stay productive.
                        </p>
                    </div>

                    <form onSubmit={handleCreateTask}>

                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Task Title
                            </label>

                            <input
                                type="text"
                                placeholder="e.g. Complete React project"
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-5">
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Description
                            </label>

                            <textarea
                                rows="3"
                                placeholder="Describe what you need to accomplish..."
                                className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {submitting ? "Creating Task..." : "+ Add New Task"}
                        </button>

                    </form>
                </section>

                {/* TASK LIST */}
                <section>

                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">
                                My Tasks
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">
                                Manage and track your daily activities.
                            </p>
                        </div>

                        <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
                            {totalTasks} Tasks
                        </span>
                    </div>

                    {loading ? (

                        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
                            <p className="text-slate-500">
                                Loading your tasks...
                            </p>
                        </div>

                    ) : tasks.length === 0 ? (

                        <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                            <div className="mb-4 text-5xl">📝</div>
                            <h4 className="text-lg font-bold text-slate-800">
                                No tasks yet
                            </h4>
                            <p className="mt-2 text-sm text-slate-500">
                                Create your first task and start being productive!
                            </p>
                        </div>

                    ) : (

                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

                            {tasks.map((task) => (

                                <div
                                    key={task._id}
                                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                                >

                                    <div className="mb-4 flex items-start justify-between gap-3">

                                        <h4 className="text-lg font-bold text-slate-900">
                                            {task.title}
                                        </h4>

                                        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(task.status)}`}>
                                            {task.status}
                                        </span>

                                    </div>

                                    <p className="mb-6 min-h-10 text-sm leading-6 text-slate-500">
                                        {task.description || "No description provided."}
                                    </p>

                                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">

                                        <span className="text-xs text-slate-400">
                                            Task ID: {task._id.slice(-6)}
                                        </span>

                                        <div className="flex gap-2">

                                        <button
                                                onClick={() => handleProgress(task._id)}
                                                disabled={task.status === "in-progress"}
                                                className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                In-Progress
                                            </button>

                                            <button
                                                onClick={() => handleComplete(task._id)}
                                                disabled={task.status === "completed"}
                                                className="rounded-lg bg-green-50 px-3 py-2 text-xs font-semibold text-green-700 transition hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                ✓ Complete
                                            </button>

                                            <button
                                                onClick={() => handleDelete(task._id)}
                                                className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </section>

                {/* FOOTER */}
                <footer className="mt-12 border-t border-slate-200 py-6 text-center">
                    <p className="text-sm text-slate-400">
                        © {new Date().getFullYear()} TaskFlow. Stay focused. Stay productive.
                    </p>
                </footer>

            </main>
        </div>
    );
};

export default Dashboard;
