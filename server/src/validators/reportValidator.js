import { z } from 'zod';

export const createReportSchema = {
  body: z.object({
    campaignId: z.string().min(1, 'Campaign ID is required'),
    reason: z.enum([
      'Suspicious campaign',
      'Misleading information',
      'Inappropriate content',
      'Duplicate campaign',
      'Fraud concern',
      'Other',
    ]),
    description: z.string().min(10, 'Please provide detailed explanation (at least 10 characters)').max(1000),
  }),
};

export const resolveReportSchema = {
  body: z.object({
    status: z.enum(['under_review', 'resolved', 'dismissed']),
    adminNotes: z.string().optional(),
    actionTaken: z.enum(['none', 'pause_campaign', 'reject_campaign', 'warn_creator']).optional(),
  }),
};
