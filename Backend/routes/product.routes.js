
const express = require('express');
const router = express.Router();
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/product.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

// Public routes
router.get('/', getProducts);
router.get('/:id', getProduct);

// Farmer only routes
router.post('/', protect, authorize('farmer'), createProduct);
router.put('/:id', protect, authorize('farmer', 'admin'), updateProduct);
router.delete('/:id', protect, authorize('farmer', 'admin'), deleteProduct);

module.exports = router;
