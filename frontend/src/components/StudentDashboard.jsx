import { useState } from "react";
import API from "../api/axios";

function StudentDashboard() {
    const [items, setItems] = useState([]);
    const [cart, setCart] = useState(null);
    const [orders, setOrders] = useState([]);

    const [view, setView] = useState(""); // which section to show

    // 🛍️ Fetch items
    const fetchItems = async () => {
        try {
            const res = await API.get("/items");
            setItems(res.data);
            setView("items");
        } catch (err) {
            console.error(err);
        }
    };

    // 🧺 Fetch cart
    const fetchCart = async () => {
        try {
            const res = await API.get("/cart");
            setCart(res.data);
            setView("cart");
        } catch (err) {
            console.error(err);
        }
    };

    // 📦 Fetch orders
    const fetchOrders = async () => {
        try {
            const res = await API.get("/orders/my-orders"); // make sure route exists
            setOrders(res.data);
            setView("orders");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-3">
                Student Panel 🎒
            </h2>

            {/* Buttons */}
            <div className="grid gap-4 mb-6">
                <button
                    onClick={fetchItems}
                    className="bg-blue-500 text-white p-3 rounded-xl"
                >
                    View Items
                </button>

                <button
                    onClick={fetchCart}
                    className="bg-green-500 text-white p-3 rounded-xl"
                >
                    My Cart
                </button>

                <button
                    onClick={fetchOrders}
                    className="bg-purple-500 text-white p-3 rounded-xl"
                >
                    My Orders
                </button>
            </div>

            {/* 🔥 Dynamic Content */}

            {/* Items */}
            {view === "items" && (
                <div className="grid gap-3">
                    {items.map((item) => (
                        <div
                            key={item._id}
                            className="border p-3 rounded-xl"
                        >
                            <h3 className="font-bold">{item.name}</h3>
                            <p>₹{item.price}</p>

                            <button
                                onClick={async () => {
                                    await API.post("/cart", {
                                        itemId: item._id,
                                        quantity: 1,
                                    });
                                    alert("Added to cart 😏");
                                }}
                                className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Cart */}
            {view === "cart" && (
                <div>
                    <h3 className="font-bold mb-2">My Cart</h3>

                    {cart?.items?.map((i) => (
                        <div key={i._id} className="border p-2 mb-2 rounded">
                            <p>{i.item.name}</p>
                            <p>Qty: {i.quantity}</p>
                        </div>
                    ))}

                    <button
                        onClick={async () => {
                            await API.post("/orders");
                            alert("Order placed 😏🔥");
                        }}
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-3"
                    >
                        Place Order
                    </button>
                </div>
            )}

            {/* Orders */}
            {view === "orders" && (
                <div>
                    <h3 className="font-bold mb-2">My Orders</h3>

                    {orders.map((order) => (
                        <div key={order._id} className="border p-3 mb-2 rounded">
                            <p>Total: ₹{order.totalAmount}</p>
                            <p>Status: {order.status}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default StudentDashboard;