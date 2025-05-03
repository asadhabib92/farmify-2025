
const express = require('express');
const router = express.Router();
const { getUsers, getUser, updateUser, deleteUser, updateKycStatus } = require('../controllers/user.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

// All routes need authentication
router.use(protect);

// Admin only routes
router.get('/', authorize('admin'), getUsers);
router.get('/:id', authorize('admin'), getUser);
router.put('/:id', authorize('admin'), updateUser);
router.delete('/:id', authorize('admin'), deleteUser);
router.put('/:id/kyc', authorize('admin'), updateKycStatus);

module.exports = router;
