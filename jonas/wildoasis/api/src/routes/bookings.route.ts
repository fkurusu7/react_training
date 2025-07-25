import express from 'express';
import {
  createBooking,
  getBooking,
  getBookings,
} from '../handlers/bookings.handler';

const router = express.Router();

router.get('/', getBookings);
router.post('/', createBooking);
router.get('/:id', getBooking);

export default router;
