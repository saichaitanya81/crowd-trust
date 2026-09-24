import { Router } from 'express';
import {
  getCampaignExpenses,
  createExpense,
  reviewExpense,
  getExpenseSummary,
} from '../controllers/expenseController.js';
import { protect, optionalAuth, authorize } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validator.js';
import { createExpenseSchema, reviewExpenseSchema } from '../validators/expenseValidator.js';

const router = Router();

router.get('/campaign/:campaignId', optionalAuth, getCampaignExpenses);
router.get('/campaign/:campaignId/summary', getExpenseSummary);
router.post('/campaign/:campaignId', protect, authorize('creator', 'admin'), validateRequest(createExpenseSchema), createExpense);
router.patch('/:id/review', protect, authorize('admin'), validateRequest(reviewExpenseSchema), reviewExpense);

export default router;
