import { z } from 'zod';

export const createDonationSchema = {
  body: z.object({
    campaignId: z.string().min(1, 'Campaign ID is required'),
    amount: z.number().min(1, 'Donation amount must be at least 1'),
    currency: z.string().default('INR'),
    message: z.string().max(300, 'Message cannot exceed 300 characters').optional(),
    isAnonymous: z.boolean().default(false),
    donorName: z.string().optional(),
    donorEmail: z.string().email('Valid email is required for donation receipt').optional(),
    cardNumber: z.string().optional(),
    cardExp: z.string().optional(),
  }),
};
