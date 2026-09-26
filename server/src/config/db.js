import mongoose from 'mongoose';
import { env } from './env.js';

// Disable query buffering so operations fail immediately with clean error instead of hanging 10000ms
mongoose.set('bufferCommands', false);

// Mask credentials safely for logging
const maskMongoUri = (uri) => {
  if (!uri) return 'not set';
  try {
    return uri.replace(/(mongodb(?:\+srv)?:\/\/[^:]+:)([^@]+)(@.+)/, '$1******$3');
  } catch {
    return 'configured';
  }
};

let isConnected = false;

export const connectDB = async (retries = 3, delay = 2000) => {
  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    return mongoose.connection;
  }

  const maskedUri = maskMongoUri(env.MONGODB_URI);

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`[Database] Connecting to MongoDB (Attempt ${attempt}/${retries})...`);
      const conn = await mongoose.connect(env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        maxPoolSize: 10,
        autoIndex: true,
      });

      isConnected = true;
      console.log(`[Database] MongoDB Connected successfully to host: ${conn.connection.host} (DB: ${conn.connection.name})`);
      return conn;
    } catch (error) {
      isConnected = false;
      console.error(`[Database Error] Attempt ${attempt} failed: ${error.message}`);
      if (attempt < retries) {
        console.log(`[Database] Retrying in ${delay / 1000}s...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        console.error(`[Database Error] All ${retries} connection attempts failed.`);
        console.warn(`[Database Hint] Using URI: ${maskedUri}`);
        console.warn(`[Database Hint] Please ensure MongoDB is running locally (mongodb://127.0.0.1:27017/crowdtrust) or MongoDB Atlas network access allows your IP address (0.0.0.0/0).`);
        return null;
      }
    }
  }
};

export const isDbConnected = () => {
  return mongoose.connection.readyState === 1;
};

mongoose.connection.on('connected', () => {
  isConnected = true;
  console.log('[Database] MongoDB connection established.');
});

mongoose.connection.on('error', (err) => {
  isConnected = false;
  console.error(`[Database Event] MongoDB connection error: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  console.warn('[Database Event] MongoDB disconnected.');
});

mongoose.connection.on('reconnected', () => {
  isConnected = true;
  console.log('[Database Event] MongoDB reconnected.');
});

