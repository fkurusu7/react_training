import express from 'express';
import {
  createCabin,
  deleteCabin,
  getCabin,
  getCabins,
} from '../handlers/cabins.handler';

const router = express.Router();

router.get('/:id', getCabin);
router.get('/', getCabins);
router.post('/', createCabin);
router.delete('/:id', deleteCabin);

export default router;
