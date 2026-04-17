const Item = require('../models/Item');

// Add Item
exports.addItem = async (req, res) => {
    try {
        const item = await Item.create(req.body);
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all items
exports.getItems = async (req, res) => {
    const items = await Item.find({ isAvailable: true });
    res.json(items);
};

// Toggle availability
exports.toggleItem = async (req, res) => {
    const item = await Item.findById(req.params.id);

    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }

    item.isAvailable = !item.isAvailable;
    await item.save();

    res.json(item);
};