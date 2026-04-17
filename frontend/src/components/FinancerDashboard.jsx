import { useState } from "react";
import API from "../api/axios";

function FinancerDashboard() {
    const [view, setView] = useState("");

    const [form, setForm] = useState({
        userId: "",
        amount: "",
    });

    const [transactions, setTransactions] = useState([]);

    //  Top-up
    const handleTopUp = async (e) => {
        e.preventDefault();

        try {
            await API.post("/wallet/topup", form);
            alert("Top-up successful");
            setForm({ userId: "", amount: "" });
        } catch (err) {
            console.error(err);
        }
    };

    // 📊 Fetch transactions
    const fetchTransactions = async () => {
        try {
            const res = await API.get("/wallet/transactions");
            setTransactions(res.data);
            setView("transactions");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-3">
                Financer Panel
            </h2>

            {/* Buttons */}
            <div className="grid gap-4 mb-6">
                <button
                    onClick={() => setView("topup")}
                    className="bg-green-500 text-white p-3 rounded-xl"
                >
                    Top-Up Student
                </button>

                <button
                    onClick={fetchTransactions}
                    className="bg-blue-500 text-white p-3 rounded-xl"
                >
                    View Transactions
                </button>
            </div>

            {/* 💸 Top-Up Form */}
            {view === "topup" && (
                <form onSubmit={handleTopUp} className="space-y-3">
                    <input
                        type="text"
                        placeholder="Student User ID"
                        value={form.userId}
                        onChange={(e) =>
                            setForm({ ...form, userId: e.target.value })
                        }
                        className="border p-2 w-full rounded"
                        required
                    />

                    <input
                        type="number"
                        placeholder="Amount"
                        value={form.amount}
                        onChange={(e) =>
                            setForm({ ...form, amount: e.target.value })
                        }
                        className="border p-2 w-full rounded"
                        required
                    />

                    <button className="bg-green-600 text-white px-4 py-2 rounded">
                        Top-Up
                    </button>
                </form>
            )}

            {/* 📊 Transactions */}
            {view === "transactions" && (
                <div>
                    <h3 className="font-bold mb-2">Transactions</h3>

                    {transactions.map((t) => (
                        <div
                            key={t._id}
                            className="border p-3 mb-2 rounded"
                        >
                            <p>User: {t.user?.name}</p>
                            <p>Amount: ₹{t.amount}</p>
                            <p>Type: {t.type}</p>
                            <p>{t.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default FinancerDashboard;