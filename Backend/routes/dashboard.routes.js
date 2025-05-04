
import express from 'express'
const router = express.Router();
import {
  getAdminStats,
  getFarmerStats,
  getConsumerStats
} from '../controllers/dashboard.controller.js'
import { protect, authorize } from '../middleware/auth.middleware.js'

// All routes need authentication
router.use(protect);

// Role-specific dashboard routes
router.get('/admin', authorize('admin'), getAdminStats);
router.get('/farmer', authorize('farmer'), getFarmerStats);
router.get('/consumer', authorize('consumer'), getConsumerStats);

export default router;
