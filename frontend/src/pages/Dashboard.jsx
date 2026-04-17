import { useEffect, useState } from "react";
import StudentDashboard from "../components/StudentDashboard";
import AdminDashboard from "../components/AdminDashboard";
import FinancerDashboard from "../components/FinancerDashboard";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (!storedUser) {
            navigate("/");
        } else {
            setUser(storedUser);
        }
    }, [navigate]);

    // 🔓 Logout function
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    if (!user) {
        return <h1 className="text-center mt-10">Loading...</h1>;
    }

    return (
        <div className="p-6">
            {/* 🔥 Top Bar */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
                    Welcome, {user.name}
                </h1>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                    Logout
                </button>
            </div>

            {/* Role-based rendering */}
            {user.role === "student" && <StudentDashboard />}
            {user.role === "admin" && <AdminDashboard />}
            {user.role === "financer" && <FinancerDashboard />}
        </div>
    );
}

export default Dashboard;