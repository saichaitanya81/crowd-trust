import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

import { env } from './config/env.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import campaignRoutes from './routes/campaignRoutes.js';
import donationRoutes from './routes/donationRoutes.js';
import milestoneRoutes from './routes/milestoneRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import updateRoutes from './routes/updateRoutes.js';
import impactRoutes from './routes/impactRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import creatorRoutes from './routes/creatorRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

// Enable trust proxy for deployments behind reverse proxies (Render, Vercel)
app.set('trust proxy', 1);

// Security Headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    crossOriginOpenerPolicy: false,
  })
);

// CORS configuration supporting production deployment and local development
const configuredClientUrls = (env.CLIENT_URL || '')
  .split(',')
  .map((url) => url.trim().replace(/\/+$/, ''))
  .filter(Boolean);

const defaultAllowedOrigins = [
  'https://crowd-trust.vercel.app',
  'https://crowd-trust.onrender.com',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'http://127.0.0.1:3000',
];

const allowedOrigins = Array.from(new Set([...configuredClientUrls, ...defaultAllowedOrigins]));

const isAllowedOrigin = (origin) => {
  if (!origin) return true; // Allow non-browser requests (mobile apps, curl, Postman, server-to-server)
  const normalized = origin.trim().replace(/\/+$/, '');
  if (allowedOrigins.includes(normalized)) return true;
  if (/^https:\/\/.*\.vercel\.app$/.test(normalized)) return true;
  if (/^https:\/\/.*\.onrender\.com$/.test(normalized)) return true;
  if (/^https:\/\/.*\.netlify\.app$/.test(normalized)) return true;
  if (/^http:\/\/(localhost|127\.0\.0\.1):[0-9]+$/.test(normalized)) return true;
  return true; // Dynamic permissive fallback with credentials reflection
};

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || isAllowedOrigin(origin)) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers',
  ],
  exposedHeaders: ['Set-Cookie', 'Authorization'],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Request parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Logging
if (env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Rate Limiting on Auth
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100, // 100 requests per 15 min
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

import { isDbConnected } from './config/db.js';
import { requireDbConnection } from './middleware/dbCheck.js';

// Static file hosting for uploads
const uploadsPath = path.resolve(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsPath));

// Health check route
app.get('/api/health', (req, res) => {
  const dbStatus = isDbConnected();
  res.status(dbStatus ? 200 : 503).json({
    success: dbStatus,
    status: dbStatus ? 'healthy' : 'degraded',
    database: dbStatus ? 'connected' : 'disconnected',
    platform: 'CrowdTrust API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Require active DB connection on data and auth API routes
app.use('/api', requireDbConnection);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/milestones', milestoneRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/updates', updateRoutes);
app.use('/api/impact', impactRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/creator', creatorRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/upload', uploadRoutes);

// Catch 404 & Centralized Error Handler
app.use(notFoundHandler);
app.use(errorHandler);
