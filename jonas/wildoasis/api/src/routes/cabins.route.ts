import express from 'express';
import {
  createCabin,
  deleteCabin,
  getCabin,
  getCabins,
  updateCabin,
} from '../handlers/cabins.handler';

const router = express.Router();

router.get('/', getCabins);
router.post('/', createCabin);
router.get('/:id', getCabin);
router.delete('/:id', deleteCabin);
router.put('/:id', updateCabin);

export default router;
