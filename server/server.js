import { app } from './src/app.js';
import { connectDB } from './src/config/db.js';
import { env } from './src/config/env.js';
import mongoose from 'mongoose';

const startServer = async () => {
  // Establish MongoDB Atlas (or local) connection first
  const db = await connectDB();

  if (!db) {
    console.warn(`[Warning] Starting server with database offline. Background reconnection will continue.`);
  }

  const server = app.listen(env.PORT, () => {
    console.log(`====================================================`);
    console.log(`  🛡️  CrowdTrust API Server Running`);
    console.log(`  🌐  Port: ${env.PORT}`);
    console.log(`  🚀  Mode: ${env.NODE_ENV}`);
    console.log(`  🔗  API URL: http://localhost:${env.PORT}/api/health`);
    console.log(`====================================================`);
  });

  const shutdown = async (signal) => {
    console.log(`\n[Server] Received ${signal}. Shutting down gracefully...`);
    server.close(async () => {
      console.log('[Server] HTTP server closed.');
      if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
        console.log('[Database] MongoDB connection closed.');
      }
      process.exit(0);
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));

  // Handle unhandled promise rejections gracefully
  process.on('unhandledRejection', (err) => {
    console.error(`[Unhandled Rejection Error] ${err.name}: ${err.message}`);
  });
};

startServer();

