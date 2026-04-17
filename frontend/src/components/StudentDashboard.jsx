import { useEffect, useState } from "react";
import API from "../api/axios";

function StudentDashboard() {
    const [items, setItems] = useState([]);
    const [cart, setCart] = useState(null);
    const [orders, setOrders] = useState([]);
    const [wallet, setWallet] = useState(null);

    // 🔄 Load everything on page load
    useEffect(() => {
        fetchItems();
        fetchCart();
        fetchOrders();
        fetchWallet();
    }, []);

    // 🛍️ Items
    const fetchItems = async () => {
        const res = await API.get("/items");
        setItems(res.data);
    };

    // 🧺 Cart
    const fetchCart = async () => {
        const res = await API.get("/cart");
        setCart(res.data);
    };

    // 📦 Orders
    const fetchOrders = async () => {
        const res = await API.get("/orders/my-orders");
        setOrders(res.data);
    };

    // 💰 Wallet
    const fetchWallet = async () => {
        const res = await API.get("/wallet/me");
        setWallet(res.data);
    };

    // ➕ Add to Cart
    const addToCart = async (id) => {
        await API.post("/cart", { itemId: id, quantity: 1 });
        fetchCart();
    };

    // 🛒 Place Order
    const placeOrder = async () => {
        try {
            await API.post("/orders");
            alert("Order placed");
            fetchCart();
            fetchOrders();
            fetchWallet(); // update balance
        } catch (err) {
            alert(err.response?.data?.message);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold mb-6">
                Student Dashboard
            </h2>

            {/* 💰 Wallet */}
            <div className="bg-green-100 p-4 rounded-2xl mb-6 shadow">
                💰 Wallet Balance: ₹{wallet?.balance || 0}
            </div>

            {/* 🛍️ Items */}
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

                        <button
                            onClick={() => addToCart(item._id)}
                            className="w-full bg-green-500 text-white py-1 rounded"
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>

            {/* 🧺 Cart */}
            <h3 className="text-xl font-semibold mb-3">My Cart</h3>

            <div className="bg-white p-4 rounded-2xl shadow mb-6">
                {cart?.items?.length > 0 ? (
                    <>
                        {cart.items.map((i) => (
                            <div
                                key={i._id}
                                className="flex justify-between border-b py-2"
                            >
                                <span>{i.item.name}</span>
                                <span>Qty: {i.quantity}</span>
                            </div>
                        ))}

                        <button
                            onClick={placeOrder}
                            className="mt-4 w-full bg-blue-500 text-white py-2 rounded"
                        >
                            Place Order
                        </button>
                    </>
                ) : (
                    <p className="text-gray-500">Cart is empty </p>
                )}
            </div>

            {/* 📦 Orders */}
            <h3 className="text-xl font-semibold mb-3">My Orders</h3>

            <div className="grid md:grid-cols-2 gap-4">
                {orders.map((order) => (
                    <div
                        key={order._id}
                        className="bg-white p-4 rounded-2xl shadow"
                    >
                        <p className="font-semibold">
                            ₹{order.totalAmount}
                        </p>

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

export default StudentDashboard;