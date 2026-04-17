const express = require('express');
const router = express.Router();
const {
    addToCart,
    getCart,
    clearCart,
} = require('../controllers/cartController');

const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// All cart routes → only students
router.use(protect, authorizeRoles('student'));

router.post('/', addToCart);
router.get('/', getCart);
router.delete('/', clearCart);

module.exports = router;