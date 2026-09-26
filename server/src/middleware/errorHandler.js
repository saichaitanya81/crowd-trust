import { ApiError } from '../utils/apiError.js';
import { env } from '../config/env.js';

export const notFoundHandler = (req, res, next) => {
  next(new ApiError(404, `Resource not found: ${req.method} ${req.originalUrl}`));
};

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = err.errors || [];

  // Mongoose Bad ObjectId (CastError)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 400;
    message = `Resource not found with invalid identifier: ${err.value}`;
  }

  // Mongoose Duplicate Key Error (code 11000)
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    const val = err.keyValue ? err.keyValue[field] : '';
    message = `Duplicate value '${val}' for field '${field}'. Please provide another value.`;
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
    errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }

  // JWT Errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid authentication token.';
  }
  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Authentication token expired.';
  }

  // Multer File Upload Errors
  if (err.name === 'MulterError') {
    statusCode = 400;
    if (err.code === 'LIMIT_FILE_SIZE') {
      message = 'Uploaded file exceeds the size limit (max 5MB).';
    }
  }

  // MongoDB / Mongoose Connection & Buffering Timeouts
  if (
    err.name === 'MongooseError' ||
    err.name === 'MongooseTimeoutError' ||
    err.name === 'MongoServerSelectionError' ||
    err.name === 'MongoNetworkError' ||
    err.name === 'MongoTimeoutError' ||
    err.message?.includes('buffering timed out')
  ) {
    statusCode = 503;
    message = 'Database temporarily unavailable. Please try again.';
  }

  const response = {
    success: false,
    message,
    ...(errors.length > 0 && { errors }),
    ...(env.NODE_ENV === 'development' && statusCode !== 503 && { stack: err.stack }),
  };

  if (statusCode === 500) {
    console.error(`[Unhandled Server Error]`, err);
  }

  return res.status(statusCode).json(response);
};
