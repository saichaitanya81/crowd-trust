import { z } from 'zod';

export const createMilestoneSchema = {
  body: z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').max(100),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    targetAmount: z.number().min(0, 'Target amount must be non-negative'),
    order: z.number().min(1).default(1),
    dueDate: z.string().optional(),
  }),
};

export const submitMilestoneEvidenceSchema = {
  body: z.object({
    description: z.string().min(10, 'Please describe evidence and accomplishments in detail'),
    fileUrl: z.string().min(1, 'Evidence proof URL or document is required'),
  }),
};

export const reviewMilestoneSchema = {
  body: z.object({
    status: z.enum(['approved', 'rejected']),
    feedback: z.string().optional(),
  }),
};
