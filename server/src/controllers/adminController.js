import { User } from '../models/User.js';
import { Campaign } from '../models/Campaign.js';
import { CreatorVerification } from '../models/CreatorVerification.js';
import { Milestone } from '../models/Milestone.js';
import { Expense } from '../models/Expense.js';
import { Report } from '../models/Report.js';
import { Donation } from '../models/Donation.js';
import { ApiError } from '../utils/apiError.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { createNotification } from '../services/notificationService.js';

export const getAdminStats = async (req, res, next) => {
  try {
    const [
      totalUsers,
      totalCampaigns,
      activeCampaigns,
      pendingCampaigns,
      donationsAgg,
      pendingVerifications,
      pendingMilestones,
      pendingExpenses,
      pendingReports,
      categoryStats,
      statusStats,
      recentDonations,
    ] = await Promise.all([
      User.countDocuments(),
      Campaign.countDocuments(),
      Campaign.countDocuments({ status: 'active' }),
      Campaign.countDocuments({ status: 'pending_review' }),
      Donation.aggregate([
        { $match: { status: 'successful' } },
        { $group: { _id: null, totalRaised: { $sum: '$amount' }, count: { $sum: 1 } } },
      ]),
      CreatorVerification.countDocuments({ status: 'pending' }),
      Milestone.countDocuments({ status: 'submitted' }),
      Expense.countDocuments({ status: 'pending' }),
      Report.countDocuments({ status: 'pending' }),
      Campaign.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 }, raised: { $sum: '$raisedAmount' } } },
      ]),
      Campaign.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
      Donation.find({ status: 'successful' })
        .populate('donor', 'name email')
        .populate('campaign', 'title slug')
        .sort({ createdAt: -1 })
        .limit(6),
    ]);

    const totalFundsRaised = donationsAgg[0]?.totalRaised || 0;
    const totalDonations = donationsAgg[0]?.count || 0;

    return sendSuccess(res, 200, 'Admin platform analytics', {
      overview: {
        totalUsers,
        totalCampaigns,
        activeCampaigns,
        pendingCampaigns,
        totalDonations,
        totalFundsRaised,
        pendingVerifications,
        pendingMilestones,
        pendingExpenses,
        pendingReports,
      },
      charts: {
        categoryBreakdown: categoryStats.map((c) => ({
          category: c._id || 'Other',
          count: c.count,
          raised: c.raised,
        })),
        statusDistribution: statusStats.map((s) => ({
          status: s._id,
          count: s.count,
        })),
      },
      recentDonations,
    });
  } catch (error) {
    next(error);
  }
};

export const getPendingVerifications = async (req, res, next) => {
  try {
    const verifications = await CreatorVerification.find()
      .populate('userId', 'name email avatar location phone role verificationStatus createdAt')
      .sort({ createdAt: -1 });

    return sendSuccess(res, 200, 'Creator verifications list', { verifications });
  } catch (error) {
    next(error);
  }
};

export const reviewCreatorVerification = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, adminNotes = '' } = req.body; // status: 'approved' | 'rejected'

    const verification = await CreatorVerification.findById(id).populate('userId');
    if (!verification) {
      throw new ApiError(404, 'Verification record not found');
    }

    verification.status = status;
    verification.adminNotes = adminNotes;
    verification.reviewedBy = req.user._id;
    verification.reviewedAt = new Date();
    await verification.save();

    const userStatus = status === 'approved' ? 'verified' : 'rejected';
    await User.findByIdAndUpdate(verification.userId._id, { verificationStatus: userStatus });

    // Notify user
    await createNotification({
      recipient: verification.userId._id,
      type: status === 'approved' ? 'CAMPAIGN_APPROVED' : 'CAMPAIGN_REJECTED',
      title: `Creator Verification ${status === 'approved' ? 'Approved' : 'Rejected'}`,
      message: `Your identity verification request was ${status}. ${adminNotes ? 'Notes: ' + adminNotes : ''}`,
      link: '/creator/dashboard',
    });

    return sendSuccess(res, 200, `Creator verification ${status}`, { verification });
  } catch (error) {
    next(error);
  }
};

export const getPendingCampaigns = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = {};
    if (status && status !== 'all') {
      query.status = status;
    }

    const campaigns = await Campaign.find(query)
      .populate('creator', 'name email avatar verificationStatus')
      .sort({ createdAt: -1 });

    return sendSuccess(res, 200, 'Admin campaigns list', { campaigns });
  } catch (error) {
    next(error);
  }
};

export const reviewCampaign = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, verificationStatus, adminFeedback = '', isFeatured } = req.body;

    const campaign = await Campaign.findById(id).populate('creator');
    if (!campaign) {
      throw new ApiError(404, 'Campaign not found');
    }

    if (status) campaign.status = status;
    if (verificationStatus) campaign.verificationStatus = verificationStatus;
    if (adminFeedback !== undefined) campaign.adminFeedback = adminFeedback;
    if (isFeatured !== undefined) campaign.isFeatured = isFeatured;

    await campaign.save();

    // If campaign is approved, activate its first milestone
    if (status === 'active' || status === 'approved') {
      await Milestone.findOneAndUpdate(
        { campaign: campaign._id, order: 1, status: 'locked' },
        { status: 'active' }
      );
    }

    // Notify creator
    await createNotification({
      recipient: campaign.creator._id,
      type: status === 'active' || status === 'approved' ? 'CAMPAIGN_APPROVED' : 'CAMPAIGN_REJECTED',
      title: `Campaign Status: ${status?.toUpperCase() || 'UPDATED'}`,
      message: `Your campaign "${campaign.title}" is now marked as ${campaign.status}. ${adminFeedback ? 'Notes: ' + adminFeedback : ''}`,
      link: `/campaigns/${campaign.slug || campaign._id}`,
    });

    return sendSuccess(res, 200, 'Campaign updated by admin', { campaign });
  } catch (error) {
    next(error);
  }
};

export const getPendingMilestones = async (req, res, next) => {
  try {
    const milestones = await Milestone.find({ status: 'submitted' })
      .populate({
        path: 'campaign',
        select: 'title slug category raisedAmount goalAmount creator',
        populate: { path: 'creator', select: 'name email avatar' },
      })
      .sort({ updatedAt: -1 });

    return sendSuccess(res, 200, 'Pending milestone reviews', { milestones });
  } catch (error) {
    next(error);
  }
};

export const getPendingExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.find({ status: 'pending' })
      .populate({
        path: 'campaign',
        select: 'title slug category raisedAmount creator',
        populate: { path: 'creator', select: 'name email' },
      })
      .populate('milestone', 'title order')
      .sort({ createdAt: -1 });

    return sendSuccess(res, 200, 'Pending expense audits', { expenses });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const { role, search } = req.query;
    const query = {};
    if (role && role !== 'all') query.role = role;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const users = await User.find(query).select('-password').sort({ createdAt: -1 });
    return sendSuccess(res, 200, 'Platform user directory', { users });
  } catch (error) {
    next(error);
  }
};

export const updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role, verificationStatus } = req.body;

    const updates = {};
    if (role) updates.role = role;
    if (verificationStatus) updates.verificationStatus = verificationStatus;

    const user = await User.findByIdAndUpdate(id, updates, { new: true }).select('-password');
    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    return sendSuccess(res, 200, 'User role/status updated', { user });
  } catch (error) {
    next(error);
  }
};
