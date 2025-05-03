
const express = require('express');
const router = express.Router();
const { getFarmers, getFarmer, createFarmerProfile, updateFarmerProfile, updateApplicationStatus } = require('../controllers/farmer.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

// Public routes
router.get('/', getFarmers);
router.get('/:id', getFarmer);

// Protected routes
router.post('/', protect, createFarmerProfile);
router.put('/:id', protect, updateFarmerProfile);

// Admin only routes
router.put('/:id/application-status', protect, authorize('admin'), updateApplicationStatus);

module.exports = router;
