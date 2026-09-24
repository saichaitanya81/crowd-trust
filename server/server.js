import { app } from './src/app.js';
import { connectDB } from './src/config/db.js';
import { env } from './src/config/env.js';

const startServer = async () => {
  // Connect to MongoDB Atlas (or local fallback)
  await connectDB();

  const server = app.listen(env.PORT, () => {
    console.log(`====================================================`);
    console.log(`  🛡️  CrowdTrust API Server Running`);
    console.log(`  🌐  Port: ${env.PORT}`);
    console.log(`  🚀  Mode: ${env.NODE_ENV}`);
    console.log(`  🔗  API URL: http://localhost:${env.PORT}/api/health`);
    console.log(`====================================================`);
  });

  // Handle unhandled promise rejections gracefully
  process.on('unhandledRejection', (err) => {
    console.error(`[Unhandled Rejection Error] ${err.name}: ${err.message}`);
  });
};

startServer();
