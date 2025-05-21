import express from 'express';
import { getSkillMatches,wantToLearnProfile } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddlewares.js';

const router = express.Router();

router.get('/match', protect, getSkillMatches);
router.get('/match/learnonly',protect,wantToLearnProfile);

export default router;
