const express = require('express');
const router = express.Router();
const {
    addItem,
    getItems,
    toggleItem,
} = require('../controllers/itemController');

const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Student → view items
router.get('/', protect, getItems);

// Admin → add item
router.post('/', protect, authorizeRoles('admin'), addItem);

// Admin → toggle availability
router.patch('/:id/toggle', protect, authorizeRoles('admin'), toggleItem);

module.exports = router;