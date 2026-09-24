import { Router } from 'express';
import {
  getCampaigns,
  getFeaturedCampaigns,
  getCampaignStats,
  getCampaignBySlugOrId,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  toggleFollowCampaign,
} from '../controllers/campaignController.js';
import { protect, optionalAuth, authorize } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validator.js';
import { createCampaignSchema, updateCampaignSchema } from '../validators/campaignValidator.js';

const router = Router();

router.get('/', optionalAuth, getCampaigns);
router.get('/featured', getFeaturedCampaigns);
router.get('/stats', getCampaignStats);
router.get('/:id', optionalAuth, getCampaignBySlugOrId);

// Protected routes (Creators / Admin)
router.post('/', protect, authorize('creator', 'admin'), validateRequest(createCampaignSchema), createCampaign);
router.patch('/:id', protect, authorize('creator', 'admin'), validateRequest(updateCampaignSchema), updateCampaign);
router.delete('/:id', protect, authorize('creator', 'admin'), deleteCampaign);

// Follow / Unfollow campaign
router.post('/:id/follow', protect, toggleFollowCampaign);

export default router;
