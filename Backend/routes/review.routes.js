
import express from 'express'
const router = express.Router();
import {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
  addFarmerResponse
} from '../controllers/review.controller.js'
import { protect, authorize } from '../middleware/auth.middleware.js'

// Public routes
router.get('/', getReviews);
router.get('/:id', getReview);

// Consumer routes
router.post('/', protect, authorize('consumer'), createReview);
router.put('/:id', protect, authorize('consumer', 'admin'), updateReview);
router.delete('/:id', protect, authorize('consumer', 'admin'), deleteReview);

// Farmer routes
router.post('/:id/response', protect, authorize('farmer'), addFarmerResponse);

export default router;
