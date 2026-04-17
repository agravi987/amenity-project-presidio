import { useEffect, useState } from "react";
import API from "../api/axios";

function FinancerDashboard() {
    const [transactions, setTransactions] = useState([]);
    const [students, setStudents] = useState([]);

    const [form, setForm] = useState({
        userId: "",
        amount: "",
    });

    // 🔄 Load data on mount
    useEffect(() => {
        fetchTransactions();
        fetchStudents();
    }, []);

    // 📊 Transactions
    const fetchTransactions = async () => {
        const res = await API.get("/wallet/transactions");
        setTransactions(res.data);
    };

    // 👥 Get students (optional but powerful)
    const fetchStudents = async () => {
        try {
            const res = await API.get("/users/students"); // create this route
            setStudents(res.data);
        } catch (err) {
            console.log("No student API yet 😏");
        }
    };

    // 💸 Top-up
    const handleTopUp = async (e) => {
        e.preventDefault();

        try {
            await API.post("/wallet/topup", form);
            alert("Top-up successful 😏💰");
            setForm({ userId: "", amount: "" });
            fetchTransactions();
        } catch (err) {
            alert(err.response?.data?.message);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold mb-6">
                Financer Dashboard 💰
            </h2>

            {/* 💸 Top-Up Card */}
            <div className="bg-white p-5 rounded-2xl shadow mb-6">
                <h3 className="font-semibold mb-3">
                    Top-Up Student
                </h3>

                <form onSubmit={handleTopUp} className="grid gap-3">

                    {/* 👇 Dropdown instead of typing ID */}
                    <select
                        value={form.userId}
                        onChange={(e) =>
                            setForm({ ...form, userId: e.target.value })
                        }
                        className="border p-2 rounded"
                        required
                    >
                        <option value="">Select Student</option>
                        {students.map((s) => (
                            <option key={s._id} value={s._id}>
                                {s.name} ({s.email})
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        placeholder="Amount"
                        value={form.amount}
                        onChange={(e) =>
                            setForm({ ...form, amount: e.target.value })
                        }
                        className="border p-2 rounded"
                        required
                    />

                    <button className="bg-green-500 text-white py-2 rounded-lg">
                        Top-Up
                    </button>
                </form>
            </div>

            {/* 📊 Transactions */}
            <h3 className="text-xl font-semibold mb-3">
                Transactions
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
                {transactions.map((t) => (
                    <div
                        key={t._id}
                        className="bg-white p-4 rounded-2xl shadow"
                    >
                        <p className="font-semibold">
                            {t.user?.name}
                        </p>

                        <p>₹{t.amount}</p>

                        <p
                            className={`text-sm ${t.type === "credit"
                                    ? "text-green-600"
                                    : "text-red-500"
                                }`}
                        >
                            {t.type}
                        </p>

                        <p className="text-gray-500 text-sm">
                            {t.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FinancerDashboard;