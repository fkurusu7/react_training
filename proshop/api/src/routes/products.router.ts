import { Router } from 'express';
import { getProductById, getProducts } from '../handlers/products.handler';

const router = Router();

/**
 * GET /products
 */
router.get('/', getProducts);
router.get('/:id', getProductById);

export default router;
