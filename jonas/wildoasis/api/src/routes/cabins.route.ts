import express from 'express';
import { createCabin, getCabin, getCabins } from '../handlers/cabins.handler';

const router = express.Router();

router.get('/:id', getCabin);
router.get('/', getCabins);
router.post('/', createCabin);

export default router;
