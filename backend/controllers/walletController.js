const Wallet = require('../models/Wallet');
const Transaction = require('../models/Transaction');

// Top-up student wallet
exports.topUp = async (req, res) => {
    const { userId, amount } = req.body;

    let wallet = await Wallet.findOne({ user: userId });

    if (!wallet) {
        wallet = await Wallet.create({ user: userId });
    }

    wallet.balance += amount;
    await wallet.save();

    await Transaction.create({
        user: userId,
        amount,
        type: 'credit',
        description: 'Wallet top-up',
    });

    res.json(wallet);
};

// Get transactions
exports.getTransactions = async (req, res) => {
    const transactions = await Transaction.find().populate('user');
    res.json(transactions);
};