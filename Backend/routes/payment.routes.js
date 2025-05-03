
const express = require('express');
const router = express.Router();
const { 
  getPayments, 
  getPayment, 
  processOrderPayment, 
  processPayout, 
  requestPayout,
  updatePaymentStatus 
} = require('../controllers/payment.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

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

module.exports = router;
