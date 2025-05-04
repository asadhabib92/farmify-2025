
import express from 'express'
const router = express.Router();
import { getUsers, getUser, updateUser, deleteUser, updateKycStatus } from '../controllers/user.controller.js'
import { protect, authorize } from '../middleware/auth.middleware.js'

// All routes need authentication
router.use(protect);

// Admin only routes
router.get('/', authorize('admin'), getUsers);
router.get('/:id', authorize('admin'), getUser);
router.put('/:id', authorize('admin'), updateUser);
router.delete('/:id', authorize('admin'), deleteUser);
router.put('/:id/kyc', authorize('admin'), updateKycStatus);

export default router;
