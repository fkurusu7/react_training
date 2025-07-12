import { Router } from 'express';
import { Request, Response } from 'express-serve-static-core';
import database from '../config/database';
import { successResponse } from '../types/api.type';
import bookingsRouter from './bookings.route';
import cabinsRouter from './cabins.route';
import filesRouter from './files.route';
import guestsRouter from './guests.route';
import settingsRouter from './settings.route';

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
router.use('/api/files', filesRouter);
router.use('/api/settings', settingsRouter);
router.use('/api/bookings', bookingsRouter);
router.use('/api/guests', guestsRouter);

export default router;
