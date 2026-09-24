import { z } from 'zod';

export const createCampaignSchema = {
  body: z.object({
    title: z.string().min(5, 'Title must be at least 5 characters').max(120),
    shortDescription: z.string().min(20, 'Short summary must be at least 20 characters').max(280),
    description: z.string().min(50, 'Detailed description must be at least 50 characters'),
    category: z.enum([
      'Education',
      'Medical',
      'Emergency',
      'Community',
      'Environment',
      'Technology',
      'Creative Projects',
      'Startup',
      'Other',
    ]),
    goalAmount: z.number().min(100, 'Goal amount must be at least 100'),
    currency: z.string().default('INR'),
    deadline: z.string().refine((val) => !isNaN(Date.parse(val)) && new Date(val) > new Date(), {
      message: 'Deadline must be a valid future date',
    }),
    coverImage: z.string().min(1, 'Cover image URL is required'),
    gallery: z.array(z.string()).optional(),
    videoUrl: z.string().optional(),
    location: z.string().min(2, 'Location is required'),
    beneficiary: z.string().min(2, 'Beneficiary name is required'),
    budget: z
      .array(
        z.object({
          category: z.string().min(1, 'Category is required'),
          amount: z.number().min(0, 'Amount must be non-negative'),
          description: z.string().optional(),
        })
      )
      .optional(),
    story: z
      .object({
        problem: z.string().optional(),
        solution: z.string().optional(),
        beneficiaries: z.string().optional(),
        expectedImpact: z.string().optional(),
      })
      .optional(),
  }),
};

export const updateCampaignSchema = {
  body: z.object({
    title: z.string().min(5).max(120).optional(),
    shortDescription: z.string().min(20).max(280).optional(),
    description: z.string().min(50).optional(),
    category: z
      .enum([
        'Education',
        'Medical',
        'Emergency',
        'Community',
        'Environment',
        'Technology',
        'Creative Projects',
        'Startup',
        'Other',
      ])
      .optional(),
    goalAmount: z.number().min(100).optional(),
    deadline: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date format' })
      .optional(),
    coverImage: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    videoUrl: z.string().optional(),
    location: z.string().optional(),
    beneficiary: z.string().optional(),
    budget: z
      .array(
        z.object({
          category: z.string(),
          amount: z.number().min(0),
          description: z.string().optional(),
        })
      )
      .optional(),
    story: z
      .object({
        problem: z.string().optional(),
        solution: z.string().optional(),
        beneficiaries: z.string().optional(),
        expectedImpact: z.string().optional(),
      })
      .optional(),
  }),
};
