import { Router } from 'express';
import { getProductById, getProducts } from '../handlers/products.handler';

const router = Router();

/**
 * @description Fetch all products
 * @route GET /api/products
 * @access Public
 */
router.get('/', getProducts);

/**
 * @description Fetch a Product by id
 * @route GET /api/products/:id
 * @access Public
 */
router.get('/:id', getProductById);

export default router;
