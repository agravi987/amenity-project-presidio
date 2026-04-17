import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await API.post("/auth/login", form);

            localStorage.setItem("user", JSON.stringify(res.data));

            console.log("Login success:", res.data);

            if (res.data.role === "admin") {
                navigate("/admin");
            } else if (res.data.role === "financer") {
                navigate("/financer");
            } else {
                navigate("/dashboard");
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-2xl shadow-md w-80"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">
                    Login
                </h2>

                {error && (
                    <p className="text-red-500 text-sm mb-3">{error}</p>
                )}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full mb-3 p-2 border rounded-lg"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full mb-4 p-2 border rounded-lg"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                    Login
                </button>

                <p className="text-center mt-4">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-500">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Login;