import express from 'express';
import { createBooking, getBookings } from '../handlers/bookings.handler';

const router = express.Router();

router.get('/', getBookings);
router.post('/', createBooking);

export default router;
