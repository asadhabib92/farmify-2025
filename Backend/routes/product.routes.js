
import express from 'express'
const router = express.Router();
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js'
import { protect, authorize } from '../middleware/auth.middleware.js'

// Public routes
router.get('/', getProducts);
router.get('/:id', getProduct);

// Farmer only routes
router.post('/', protect, authorize('farmer'), createProduct);
router.put('/:id', protect, authorize('farmer', 'admin'), updateProduct);
router.delete('/:id', protect, authorize('farmer', 'admin'), deleteProduct);

export default router;
