import express from 'express';
import { createGuest, getGuests } from '../handlers/guests.handler';

const router = express.Router();

router.get('/', getGuests);
router.post('/', createGuest);

export default router;
