import mongoose from 'mongoose';
import { env } from './env.js';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host} (${conn.connection.name})`);
    return conn;
  } catch (error) {
    console.error(`[Database Error] Failed to connect to MongoDB: ${error.message}`);
    console.warn(`[Database Hint] Please ensure MONGODB_URI is correctly set in your .env file.`);
    console.warn(`[Database Hint] Example for Atlas: mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/crowdtrust?retryWrites=true&w=majority`);
    console.warn(`[Database Hint] Or use local MongoDB: mongodb://127.0.0.1:27017/crowdtrust`);
    return null;
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('[Database] MongoDB disconnected.');
});
