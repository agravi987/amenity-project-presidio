const express = require('express');
const router = express.Router();
const {
    topUp,
    getTransactions,
} = require('../controllers/walletController');

const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Only financer
router.use(protect, authorizeRoles('financer'));

// Top-up student wallet
router.post('/topup', topUp);

// View transactions
router.get('/transactions', getTransactions);

module.exports = router;