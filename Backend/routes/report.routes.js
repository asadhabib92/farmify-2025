
import express from 'express'
const router = express.Router();
import { getReports, getReport, createReport, updateReport, addComment, resolveReport } from '../controllers/report.controller.js'
import { protect, authorize } from '../middleware/auth.middleware.js'

// All routes need authentication
router.use(protect);

// All authenticated users
router.post('/', createReport);

// Admin only routes
router.get('/', authorize('admin'), getReports);
router.get('/:id', authorize('admin'), getReport);
router.put('/:id', authorize('admin'), updateReport);
router.post('/:id/comments', authorize('admin'), addComment);
router.put('/:id/resolve', authorize('admin'), resolveReport);

export default router;
