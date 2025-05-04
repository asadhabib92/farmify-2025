
import express from 'express'
const router = express.Router();
import { getFarmers, getFarmer, createFarmerProfile, updateFarmerProfile, updateApplicationStatus } from '../controllers/farmer.controller.js'
import { protect, authorize } from '../middleware/auth.middleware.js'

// Public routes
router.get('/', getFarmers);
router.get('/:id', getFarmer);

// Protected routes
router.post('/', protect, createFarmerProfile);
router.put('/:id', protect, updateFarmerProfile);

// Admin only routes
router.put('/:id/application-status', protect, authorize('admin'), updateApplicationStatus);

export default router;