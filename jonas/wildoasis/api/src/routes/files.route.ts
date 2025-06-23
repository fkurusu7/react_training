import express from 'express';
import { getImageUploadURL } from '../handlers/files.handler';

const router = express.Router();

router.get('/getImageUploadURL', getImageUploadURL);

export default router;
