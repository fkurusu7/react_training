import { Router } from 'express';
import { Request, Response } from 'express-serve-static-core';
import database from '../config/database';
import { successResponse } from '../types/api.type';
import cabinsRouter from './cabins.route';

const router = Router();

// Health check router
router.get('/health', (req: Request, res: Response) => {
  res
    .status(200)
    .send(
      successResponse(
        `Connected to DB: ${database.isConnected()}`,
        'API is running...'
      )
    );
});

router.use('/api/cabins', cabinsRouter);

export default router;
