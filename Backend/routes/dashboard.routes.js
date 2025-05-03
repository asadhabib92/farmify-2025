
const express = require('express');
const router = express.Router();
const { 
  getAdminStats, 
  getFarmerStats, 
  getConsumerStats 
} = require('../controllers/dashboard.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

// All routes need authentication
router.use(protect);

// Role-specific dashboard routes
router.get('/admin', authorize('admin'), getAdminStats);
router.get('/farmer', authorize('farmer'), getFarmerStats);
router.get('/consumer', authorize('consumer'), getConsumerStats);

module.exports = router;
