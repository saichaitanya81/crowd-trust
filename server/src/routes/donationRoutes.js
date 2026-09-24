import { Router } from 'express';
import {
  processDonation,
  getMyDonations,
  getCampaignDonations,
} from '../controllers/donationController.js';
import { protect, optionalAuth } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validator.js';
import { createDonationSchema } from '../validators/donationValidator.js';

const router = Router();

router.post('/', optionalAuth, validateRequest(createDonationSchema), processDonation);
router.get('/my', protect, getMyDonations);
router.get('/campaign/:campaignId', getCampaignDonations);

export default router;
