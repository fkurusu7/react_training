import express from 'express';
import {
  createCabin,
  deleteCabin,
  getCabin,
  getCabins,
  updateCabin,
} from '../handlers/cabins.handler';

const router = express.Router();

router.route('/').get(getCabins).post(createCabin);
router.route('/:id').get(getCabin).delete(deleteCabin).put(updateCabin);

export default router;
