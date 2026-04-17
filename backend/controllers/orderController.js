const Order = require('../models/Order');
const Wallet = require('../models/Wallet');
const Transaction = require('../models/Transaction');
const Cart = require('../models/Cart');

exports.placeOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.item');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        let total = 0;

        const orderItems = cart.items.map((i) => {
            total += i.item.price * i.quantity;
            return {
                item: i.item._id,
                quantity: i.quantity,
                priceAtPurchase: i.item.price,
            };
        });

        const wallet = await Wallet.findOne({ user: req.user._id });

        if (!wallet || wallet.balance < total) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        // Deduct balance
        wallet.balance -= total;
        await wallet.save();

        // Transaction
        await Transaction.create({
            user: req.user._id,
            amount: total,
            type: 'debit',
            description: 'Order payment',
        });

        const order = await Order.create({
            user: req.user._id,
            items: orderItems,
            totalAmount: total,
            status: 'paid',
        });

        // Clear cart
        await Cart.findOneAndDelete({ user: req.user._id });

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user._id
        });

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};