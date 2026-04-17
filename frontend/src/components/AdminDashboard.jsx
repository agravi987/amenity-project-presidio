import { useEffect, useState } from "react";
import API from "../api/axios";

function AdminDashboard() {
    const [items, setItems] = useState([]);
    const [orders, setOrders] = useState([]);

    const [form, setForm] = useState({
        name: "",
        price: "",
        description: "",
    });

    // 🔄 Load data on mount
    useEffect(() => {
        fetchItems();
        fetchOrders();
    }, []);

    // 🛍️ Fetch Items
    const fetchItems = async () => {
        const res = await API.get("/items");
        setItems(res.data);
    };

    // 📦 Fetch Orders
    const fetchOrders = async () => {
        const res = await API.get("/orders");
        setOrders(res.data);
    };

    // ➕ Add Item
    const handleAddItem = async (e) => {
        e.preventDefault();

        await API.post("/items", form);
        setForm({ name: "", price: "", description: "" });
        fetchItems();
    };

    // 🔁 Toggle
    const toggleItem = async (id) => {
        await API.patch(`/items/${id}/toggle`);
        fetchItems();
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold mb-6">
                Admin Dashboard ⚙️
            </h2>

            {/* ➕ Add Item Card */}
            <div className="bg-white p-5 rounded-2xl shadow mb-6">
                <h3 className="font-semibold mb-3">Add Item</h3>

                <form onSubmit={handleAddItem} className="grid gap-3">
                    <input
                        type="text"
                        placeholder="Item Name"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                        className="border p-2 rounded"
                        required
                    />

                    <input
                        type="number"
                        placeholder="Price"
                        value={form.price}
                        onChange={(e) =>
                            setForm({ ...form, price: e.target.value })
                        }
                        className="border p-2 rounded"
                        required
                    />

                    <input
                        type="text"
                        placeholder="Description"
                        value={form.description}
                        onChange={(e) =>
                            setForm({ ...form, description: e.target.value })
                        }
                        className="border p-2 rounded"
                    />

                    <button className="bg-green-500 text-white py-2 rounded-lg">
                        Add Item
                    </button>
                </form>
            </div>

            {/* 🛍️ Items Grid */}
            <h3 className="text-xl font-semibold mb-3">Items</h3>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
                {items.map((item) => (
                    <div
                        key={item._id}
                        className="bg-white p-4 rounded-2xl shadow"
                    >
                        <h4 className="font-bold text-lg">
                            {item.name}
                        </h4>

                        <p className="text-gray-600 mb-2">
                            ₹{item.price}
                        </p>

                        <p className="text-sm mb-2">
                            {item.description}
                        </p>

                        <span
                            className={`text-xs px-2 py-1 rounded ${item.isAvailable
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                        >
                            {item.isAvailable ? "Available" : "Hidden"}
                        </span>

                        <button
                            onClick={() => toggleItem(item._id)}
                            className="mt-3 w-full bg-blue-500 text-white py-1 rounded"
                        >
                            Toggle
                        </button>
                    </div>
                ))}
            </div>

            {/* 📦 Orders */}
            <h3 className="text-xl font-semibold mb-3">Orders</h3>

            <div className="grid md:grid-cols-2 gap-4">
                {orders.map((order) => (
                    <div
                        key={order._id}
                        className="bg-white p-4 rounded-2xl shadow"
                    >
                        <p className="font-semibold">
                            {order.user?.name}
                        </p>

                        <p>Total: ₹{order.totalAmount}</p>

                        <p
                            className={`text-sm ${order.status === "paid"
                                    ? "text-green-600"
                                    : "text-red-500"
                                }`}
                        >
                            {order.status}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminDashboard;