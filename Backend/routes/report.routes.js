
const express = require('express');
const router = express.Router();
const { getReports, getReport, createReport, updateReport, addComment, resolveReport } = require('../controllers/report.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

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

module.exports = router;
