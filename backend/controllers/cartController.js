const Cart = require('../models/Cart');

// Add to cart
exports.addToCart = async (req, res) => {
    const { itemId, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
        cart = await Cart.create({ user: req.user._id, items: [] });
    }

    const existingItem = cart.items.find(
        (i) => i.item.toString() === itemId
    );

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({ item: itemId, quantity });
    }

    await cart.save();
    res.json(cart);
};

// Get cart
exports.getCart = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.item');
    res.json(cart);
};

// Clear cart
exports.clearCart = async (req, res) => {
    await Cart.findOneAndDelete({ user: req.user._id });
    res.json({ message: 'Cart cleared' });
};