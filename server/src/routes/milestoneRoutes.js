import { Router } from 'express';
import {
  getCampaignMilestones,
  createMilestone,
  updateMilestone,
  submitMilestoneEvidence,
  reviewMilestone,
} from '../controllers/milestoneController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validator.js';
import {
  createMilestoneSchema,
  submitMilestoneEvidenceSchema,
  reviewMilestoneSchema,
} from '../validators/milestoneValidator.js';

const router = Router();

router.get('/campaign/:campaignId', getCampaignMilestones);
router.post('/campaign/:campaignId', protect, authorize('creator', 'admin'), validateRequest(createMilestoneSchema), createMilestone);
router.patch('/:id', protect, authorize('creator', 'admin'), updateMilestone);
router.post('/:id/evidence', protect, authorize('creator', 'admin'), validateRequest(submitMilestoneEvidenceSchema), submitMilestoneEvidence);
router.patch('/:id/review', protect, authorize('admin'), validateRequest(reviewMilestoneSchema), reviewMilestone);

export default router;
