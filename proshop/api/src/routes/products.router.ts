import { Router } from 'express';
import { getProducts } from '../handlers/products.handler';

const router = Router();

/**
 * GET /products
 */
router.get('/', getProducts);

export default router;
