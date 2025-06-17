import express from 'express';
import { getCabin, getCabins } from '../models/handlers/cabins.handler';

const router = express.Router();

router.get('/:id', getCabin);
router.get('/', getCabins);

export default router;
