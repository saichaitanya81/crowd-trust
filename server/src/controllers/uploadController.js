import { ApiError } from '../utils/apiError.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const handleFileUpload = (req, res, next) => {
  try {
    if (!req.file) {
      throw new ApiError(400, 'No file was uploaded');
    }

    const fileUrl = `/uploads/${req.file.filename}`;

    return sendSuccess(res, 201, 'File uploaded successfully', {
      fileUrl,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
    });
  } catch (error) {
    next(error);
  }
};
