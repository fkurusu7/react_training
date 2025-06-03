import { Router } from 'express';
import productsRouter from './products.router';

const router = Router();

/**
 * Health Check
 */
router.get('/', (req, res) => {
  res.status(200).send({ message: 'App is running...' });
});

router.use('/api/products', productsRouter);

export default router;
