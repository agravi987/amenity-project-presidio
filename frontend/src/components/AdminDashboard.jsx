import { useState } from "react";
import API from "../api/axios";

function AdminDashboard() {
    const [view, setView] = useState("");

    const [form, setForm] = useState({
        name: "",
        price: "",
        description: "",
    });

    const [items, setItems] = useState([]);
    const [orders, setOrders] = useState([]);

    // ➕ Add Item
    const handleAddItem = async (e) => {
        e.preventDefault();

        try {
            await API.post("/items", form);
            alert("Item added 😏🔥");
            setForm({ name: "", price: "", description: "" });
        } catch (err) {
            console.error(err);
        }
    };

    // 🛠️ Get Items
    const fetchItems = async () => {
        try {
            const res = await API.get("/items");
            setItems(res.data);
            setView("items");
        } catch (err) {
            console.error(err);
        }
    };

    // 🔁 Toggle availability
    const toggleItem = async (id) => {
        await API.patch(`/items/${id}/toggle`);
        fetchItems(); // refresh
    };

    // 📦 Get Orders
    const fetchOrders = async () => {
        try {
            const res = await API.get("/orders"); // admin route
            setOrders(res.data);
            setView("orders");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-3">
                Admin Panel ⚙️
            </h2>

            {/* Buttons */}
            <div className="grid gap-4 mb-6">
                <button
                    onClick={() => setView("add")}
                    className="bg-blue-500 text-white p-3 rounded-xl"
                >
                    Add Item
                </button>

                <button
                    onClick={fetchItems}
                    className="bg-yellow-500 text-white p-3 rounded-xl"
                >
                    Manage Items
                </button>

                <button
                    onClick={fetchOrders}
                    className="bg-red-500 text-white p-3 rounded-xl"
                >
                    View Orders
                </button>
            </div>

            {/* ➕ Add Item */}
            {view === "add" && (
                <form onSubmit={handleAddItem} className="space-y-3">
                    <input
                        type="text"
                        placeholder="Item Name"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                        className="border p-2 w-full rounded"
                        required
                    />

                    <input
                        type="number"
                        placeholder="Price"
                        value={form.price}
                        onChange={(e) =>
                            setForm({ ...form, price: e.target.value })
                        }
                        className="border p-2 w-full rounded"
                        required
                    />

                    <input
                        type="text"
                        placeholder="Description"
                        value={form.description}
                        onChange={(e) =>
                            setForm({ ...form, description: e.target.value })
                        }
                        className="border p-2 w-full rounded"
                    />

                    <button className="bg-green-500 text-white px-4 py-2 rounded">
                        Add Item
                    </button>
                </form>
            )}

            {/* 🛠️ Manage Items */}
            {view === "items" && (
                <div className="grid gap-3">
                    {items.map((item) => (
                        <div
                            key={item._id}
                            className="border p-3 rounded"
                        >
                            <h3 className="font-bold">{item.name}</h3>
                            <p>₹{item.price}</p>
                            <p>
                                Status:{" "}
                                {item.isAvailable ? "Available" : "Hidden"}
                            </p>

                            <button
                                onClick={() => toggleItem(item._id)}
                                className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
                            >
                                Toggle Status
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* 📦 Orders */}
            {view === "orders" && (
                <div>
                    <h3 className="font-bold mb-2">All Orders</h3>

                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="border p-3 mb-2 rounded"
                        >
                            <p>User: {order.user?.name}</p>
                            <p>Total: ₹{order.totalAmount}</p>
                            <p>Status: {order.status}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;