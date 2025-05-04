import express from 'express'
const router = express.Router();
import {
  getPayments,
  getPayment,
  processOrderPayment,
  processPayout,
  requestPayout,
  updatePaymentStatus
} from '../controllers/payment.controller.js'
import { protect, authorize } from '../middleware/auth.middleware.js'

// All routes need authentication
router.use(protect);

// All authenticated users
router.get('/', getPayments);
router.get('/:id', getPayment);

// Consumer routes
router.post('/process-order', authorize('consumer'), processOrderPayment);

// Farmer routes
router.post('/request-payout', authorize('farmer'), requestPayout);

// Admin only routes
router.post('/payout', authorize('admin'), processPayout);
router.put('/:id/status', authorize('admin'), updatePaymentStatus);

export default router;
