import { Router } from 'express';
import {
  getCampaignComments,
  addComment,
  deleteComment,
} from '../controllers/commentController.js';
import { protect } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validator.js';
import { createCommentSchema } from '../validators/commentValidator.js';

const router = Router();

router.get('/campaign/:campaignId', getCampaignComments);
router.post('/campaign/:campaignId', protect, validateRequest(createCommentSchema), addComment);
router.delete('/:id', protect, deleteComment);

export default router;
