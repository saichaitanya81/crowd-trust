import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from server root or parent root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export const env = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/crowdtrust',
  JWT_SECRET: process.env.JWT_SECRET || 'crowdtrust_jwt_super_secret_development_key_987654321',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  PAYMENT_PROVIDER: process.env.PAYMENT_PROVIDER || 'sandbox',
  PAYMENT_PROVIDER_KEY: process.env.PAYMENT_PROVIDER_KEY || 'ct_test_pk_9948271038571937',
  PAYMENT_PROVIDER_SECRET: process.env.PAYMENT_PROVIDER_SECRET || 'ct_test_sk_9948271038571937_secret',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || process.env.AI_API_KEY || '',
};
