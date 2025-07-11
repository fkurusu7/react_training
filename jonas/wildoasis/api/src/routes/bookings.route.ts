import express from 'express';
import { getBookings } from '../handlers/bookings.handler';

const router = express.Router();

router.get('/', getBookings);

export default router;
