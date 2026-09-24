import { Router } from 'express';
import {
  getAdminStats,
  getPendingVerifications,
  reviewCreatorVerification,
  getPendingCampaigns,
  reviewCampaign,
  getPendingMilestones,
  getPendingExpenses,
  getAllUsers,
  updateUserRole,
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

// Protect all admin routes to admin role only
router.use(protect, authorize('admin'));

router.get('/stats', getAdminStats);
router.get('/verifications', getPendingVerifications);
router.patch('/verifications/:id', reviewCreatorVerification);
router.get('/campaigns', getPendingCampaigns);
router.patch('/campaigns/:id', reviewCampaign);
router.get('/milestones', getPendingMilestones);
router.get('/expenses', getPendingExpenses);
router.get('/users', getAllUsers);
router.patch('/users/:id', updateUserRole);

export default router;
