import express from 'express';
import { deleteS3Image, getImageUploadURL } from '../handlers/files.handler';

const router = express.Router();

router.get('/getImageUploadURL', getImageUploadURL);
router.delete('/deleteImage', deleteS3Image);

export default router;
