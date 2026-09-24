import { Router } from 'express';
import {
  getCreatorDashboard,
  submitCreatorVerification,
  getCreatorVerificationStatus,
} from '../controllers/creatorController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/dashboard', protect, authorize('creator', 'admin'), getCreatorDashboard);
router.post('/verify', protect, authorize('creator', 'admin'), submitCreatorVerification);
router.get('/verify/status', protect, authorize('creator', 'admin'), getCreatorVerificationStatus);

export default router;
