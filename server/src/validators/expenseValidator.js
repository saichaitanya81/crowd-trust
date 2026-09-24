import { z } from 'zod';

export const createExpenseSchema = {
  body: z.object({
    milestoneId: z.string().optional(),
    description: z.string().min(5, 'Description must be at least 5 characters').max(200),
    category: z.enum([
      'Equipment',
      'Materials',
      'Labor',
      'Logistics & Transport',
      'Legal & Permitting',
      'Operations',
      'Other',
    ]),
    amount: z.number().min(1, 'Amount must be greater than 0'),
    receiptUrl: z.string().min(1, 'Receipt document or invoice URL is required'),
    date: z.string().optional(),
  }),
};

export const reviewExpenseSchema = {
  body: z.object({
    status: z.enum(['approved', 'rejected']),
    adminNotes: z.string().optional(),
  }),
};
