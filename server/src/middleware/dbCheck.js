import { isDbConnected } from '../config/db.js';

export const requireDbConnection = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  if (!isDbConnected()) {
    return res.status(503).json({
      success: false,
      message: 'Database temporarily unavailable. Please try again in a few moments.',
    });
  }
  next();
};
