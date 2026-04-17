import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "student",
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
            const res = await API.post("/auth/register", form);

            // Save user
            localStorage.setItem("user", JSON.stringify(res.data));

            console.log("Registered:", res.data);

            navigate("/"); // go to login
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-2xl shadow-md w-80"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">
                    Register
                </h2>

                {error && (
                    <p className="text-red-500 text-sm mb-3">{error}</p>
                )}

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    className="w-full mb-3 p-2 border rounded-lg"
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full mb-3 p-2 border rounded-lg"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full mb-3 p-2 border rounded-lg"
                    required
                />

                {/* Role selection */}
                <select
                    name="role"
                    onChange={handleChange}
                    className="w-full mb-4 p-2 border rounded-lg"
                >
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                    <option value="financer">Financer</option>
                </select>

                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                >
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;