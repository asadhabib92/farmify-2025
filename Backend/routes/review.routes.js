
const express = require('express');
const router = express.Router();
const { 
  getReviews, 
  getReview, 
  createReview, 
  updateReview, 
  deleteReview, 
  addFarmerResponse 
} = require('../controllers/review.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

// Public routes
router.get('/', getReviews);
router.get('/:id', getReview);

// Consumer routes
router.post('/', protect, authorize('consumer'), createReview);
router.put('/:id', protect, authorize('consumer', 'admin'), updateReview);
router.delete('/:id', protect, authorize('consumer', 'admin'), deleteReview);

// Farmer routes
router.post('/:id/response', protect, authorize('farmer'), addFarmerResponse);

module.exports = router;
