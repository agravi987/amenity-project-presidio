const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/authMiddleware');


const {
    placeOrder,
    getMyOrders,
    getAllOrders
} = require('../controllers/orderController');


// Student → place order
router.post('/', protect, authorizeRoles('student'), placeOrder);

// ✅ ADD THIS (your missing route)
router.get(
    '/my-orders',
    protect,
    authorizeRoles('student'),
    getMyOrders
);

// Admin → view all orders
router.get(
    '/',
    protect,
    authorizeRoles('admin'),
    getAllOrders
);

module.exports = router;