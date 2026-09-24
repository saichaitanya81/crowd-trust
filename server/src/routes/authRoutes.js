import { Router } from 'express';
import {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  toggleBookmark,
  getBookmarks,
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validator.js';
import { registerSchema, loginSchema, updateProfileSchema } from '../validators/authValidator.js';

const router = Router();

router.post('/register', validateRequest(registerSchema), register);
router.post('/login', validateRequest(loginSchema), login);
router.post('/logout', logout);

router.get('/me', protect, getMe);
router.patch('/profile', protect, validateRequest(updateProfileSchema), updateProfile);
router.post('/bookmarks/:campaignId', protect, toggleBookmark);
router.get('/bookmarks', protect, getBookmarks);

export default router;
