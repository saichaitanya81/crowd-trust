import { Router } from 'express';
import {
  getCampaignUpdates,
  createCampaignUpdate,
  deleteCampaignUpdate,
} from '../controllers/updateController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/campaign/:campaignId', getCampaignUpdates);
router.post('/campaign/:campaignId', protect, authorize('creator', 'admin'), createCampaignUpdate);
router.delete('/:id', protect, authorize('creator', 'admin'), deleteCampaignUpdate);

export default router;
