import express from 'express';
import { getSettings, updateSetting } from '../handlers/settings.handler';

const router = express.Router();

router.get('/', getSettings);
router.put('/', updateSetting);

export default router;
