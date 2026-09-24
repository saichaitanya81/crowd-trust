import { Router } from 'express';
import {
  analyzeCampaignDraft,
  getSimilarityCheck,
} from '../controllers/aiController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// AI Campaign Assistant routes
router.post('/analyze', protect, analyzeCampaignDraft);
router.post('/similarity', protect, getSimilarityCheck);

export default router;
