import { Router } from 'express';
import {
  createReport,
  getReports,
  resolveReport,
} from '../controllers/reportController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validator.js';
import { createReportSchema, resolveReportSchema } from '../validators/reportValidator.js';

const router = Router();

router.post('/', protect, validateRequest(createReportSchema), createReport);
router.get('/', protect, authorize('admin'), getReports);
router.patch('/:id/resolve', protect, authorize('admin'), validateRequest(resolveReportSchema), resolveReport);

export default router;
