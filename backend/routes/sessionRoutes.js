import express from 'express';
import { protect } from '../middlewares/authMiddlewares.js';
import { requestSession } from '../controllers/sessionController.js';

const router = express.Router();

router.post('/request', protect, requestSession);

export default router;
