import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  departmentId: z.string().optional(),
  year: z.number().int().min(1).max(5).optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const chatRequestSchema = z.object({
  question: z.string().min(1, 'Question cannot be empty').max(1000),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant', 'system']),
        content: z.string(),
      })
    )
    .optional(),
  sessionId: z.string().optional(),
});

export const searchRequestSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const adminItemSchema = z.object({
  type: z.enum(['documents', 'faqs', 'notices', 'events', 'contacts', 'procedures', 'categories']),
  item: z.object({
    id: z.string().optional(),
    title: z.string().optional(),
    name: z.string().optional(),
    question: z.string().optional(),
    content: z.string().optional(),
    description: z.string().optional(),
    answer: z.string().optional(),
    designation: z.string().optional(),
    category: z.string().default('administration'),
    source: z.string().url().default('https://www.krce.ac.in/'),
    status: z.enum(['draft', 'published', 'archived']).default('published'),
    phone: z.string().optional(),
    email: z.string().optional(),
    location: z.string().optional(),
    eligibility: z.string().optional(),
    documentsRequired: z.array(z.string()).optional(),
    fees: z.string().optional(),
    processingTime: z.string().optional(),
    steps: z.array(z.string()).optional(),
    publishedAt: z.string().optional(),
    date: z.string().optional(),
  }),
});

export const adminScrapeSchema = z.object({
  url: z
    .string()
    .url()
    .refine((u) => u.startsWith('https://') && (u.includes('krce.ac.in') || u.includes('localhost')), {
      message: 'Only HTTPS URLs from krce.ac.in are accepted.',
    }),
});
