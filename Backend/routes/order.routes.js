
import express from 'express'
const router = express.Router();
import { createOrder, getOrders, getOrder, updateOrderStatus } from '../controllers/order.controller.js'
import { protect, authorize } from '../middleware/auth.middleware.js'

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

export default router
