
const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getOrder, updateOrderStatus } = require('../controllers/order.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

// All routes need authentication
router.use(protect);

// Consumer routes
router.post('/', authorize('consumer'), createOrder);

// All authenticated users
// router.get('/get', getOrders);
router.get('/get', getOrders)
router.get('/:id', getOrder);

// Admin and farmer routes
router.put('/:id/status', authorize('admin', 'farmer'), updateOrderStatus);

module.exports = router;
