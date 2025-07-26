import express from 'express';
import {
  createBooking,
  getBooking,
  getBookings,
  updateBooking,
} from '../handlers/bookings.handler';

const router = express.Router();

router.get('/', getBookings);
router.post('/', createBooking);
router.get('/:id', getBooking);
router.patch('/:id', updateBooking);

export default router;
