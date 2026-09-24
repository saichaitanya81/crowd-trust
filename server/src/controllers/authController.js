import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { ApiError } from '../utils/apiError.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { env } from '../config/env.js';

const generateToken = (id) => {
  return jwt.sign({ id }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};

const sendTokenResponse = (user, statusCode, res, message = 'Success') => {
  const token = generateToken(user._id);
  const isProduction = env.NODE_ENV === 'production';

  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
  };

  res.cookie('jwt', token, cookieOptions);

  return res.status(statusCode).json({
    success: true,
    message,
    token,
    data: {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        bio: user.bio,
        phone: user.phone,
        location: user.location,
        isEmailVerified: user.isEmailVerified,
        verificationStatus: user.verificationStatus,
        bookmarks: user.bookmarks || [],
        createdAt: user.createdAt,
      },
    },
  });
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role, phone, location } = req.body;

    // Guard: Admin role cannot be registered publicly
    if (role === 'admin') {
      throw new ApiError(403, 'Admin accounts cannot be registered publicly.');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(409, 'An account with this email address already exists.');
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'donor',
      phone: phone || '',
      location: location || '',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      verificationStatus: role === 'creator' ? 'pending' : 'verified',
    });

    return sendTokenResponse(user, 201, res, 'Registration successful');
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new ApiError(401, 'Invalid email or password.');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new ApiError(401, 'Invalid email or password.');
    }

    return sendTokenResponse(user, 200, res, 'Login successful');
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  const isProduction = env.NODE_ENV === 'production';
  res.cookie('jwt', 'loggedout', {
    expires: new Date(0),
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
  });
  return sendSuccess(res, 200, 'Logged out successfully');
};

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('bookmarks');
    return sendSuccess(res, 200, 'Current user profile', { user });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, bio, phone, location, avatar } = req.body;
    const updates = {};
    if (name) updates.name = name;
    if (bio !== undefined) updates.bio = bio;
    if (phone !== undefined) updates.phone = phone;
    if (location !== undefined) updates.location = location;
    if (avatar) updates.avatar = avatar;

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    });

    return sendSuccess(res, 200, 'Profile updated successfully', { user });
  } catch (error) {
    next(error);
  }
};

export const toggleBookmark = async (req, res, next) => {
  try {
    const { campaignId } = req.params;
    const user = await User.findById(req.user._id);

    const isBookmarked = user.bookmarks.some((id) => id.toString() === campaignId);

    if (isBookmarked) {
      user.bookmarks = user.bookmarks.filter((id) => id.toString() !== campaignId);
    } else {
      user.bookmarks.push(campaignId);
    }

    await user.save();

    return sendSuccess(res, 200, isBookmarked ? 'Campaign removed from bookmarks' : 'Campaign saved to bookmarks', {
      bookmarks: user.bookmarks,
      isBookmarked: !isBookmarked,
    });
  } catch (error) {
    next(error);
  }
};

export const getBookmarks = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'bookmarks',
      populate: { path: 'creator', select: 'name avatar verificationStatus' },
    });
    return sendSuccess(res, 200, 'Saved campaigns', { bookmarks: user.bookmarks || [] });
  } catch (error) {
    next(error);
  }
};
