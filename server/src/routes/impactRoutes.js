import { Router } from 'express';
import {
  getCampaignImpacts,
  setCampaignImpacts,
} from '../controllers/impactController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/campaign/:campaignId', getCampaignImpacts);
router.post('/campaign/:campaignId', protect, authorize('creator', 'admin'), setCampaignImpacts);

export default router;
