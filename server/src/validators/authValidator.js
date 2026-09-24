import { z } from 'zod';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

export const registerSchema = {
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(60),
    email: z.string().email('Please provide a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        passwordRegex,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    role: z.enum(['donor', 'creator']).default('donor'),
    phone: z.string().optional(),
    location: z.string().optional(),
  }),
};

export const loginSchema = {
  body: z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(1, 'Password is required'),
  }),
};

export const updateProfileSchema = {
  body: z.object({
    name: z.string().min(2).max(60).optional(),
    bio: z.string().max(500).optional(),
    phone: z.string().optional(),
    location: z.string().optional(),
    avatar: z.string().optional(),
  }),
};
