import { Milestone } from '../models/Milestone.js';
import { Campaign } from '../models/Campaign.js';
import { ApiError } from '../utils/apiError.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { createNotification } from '../services/notificationService.js';
import { User } from '../models/User.js';

export const getCampaignMilestones = async (req, res, next) => {
  try {
    const { campaignId } = req.params;
    const milestones = await Milestone.find({ campaign: campaignId }).sort({ order: 1 });
    return sendSuccess(res, 200, 'Campaign milestones', { milestones });
  } catch (error) {
    next(error);
  }
};

export const createMilestone = async (req, res, next) => {
  try {
    const { campaignId } = req.params;
    const { title, description, targetAmount, order, dueDate } = req.body;

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      throw new ApiError(404, 'Campaign not found');
    }

    if (campaign.creator.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      throw new ApiError(403, 'Unauthorized to add milestone to this campaign');
    }

    const count = await Milestone.countDocuments({ campaign: campaignId });

    const milestone = await Milestone.create({
      campaign: campaignId,
      title,
      description,
      targetAmount: Number(targetAmount),
      order: order || count + 1,
      status: count === 0 ? 'active' : 'locked',
      dueDate: dueDate ? new Date(dueDate) : undefined,
    });

    return sendSuccess(res, 201, 'Milestone created successfully', { milestone });
  } catch (error) {
    next(error);
  }
};

export const updateMilestone = async (req, res, next) => {
  try {
    const { id } = req.params;
    const milestone = await Milestone.findById(id).populate('campaign');

    if (!milestone) {
      throw new ApiError(404, 'Milestone not found');
    }

    if (milestone.campaign.creator.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      throw new ApiError(403, 'Unauthorized to update this milestone');
    }

    const updated = await Milestone.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    return sendSuccess(res, 200, 'Milestone updated successfully', { milestone: updated });
  } catch (error) {
    next(error);
  }
};

export const submitMilestoneEvidence = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { description, fileUrl } = req.body;

    const milestone = await Milestone.findById(id).populate('campaign');
    if (!milestone) {
      throw new ApiError(404, 'Milestone not found');
    }

    if (milestone.campaign.creator.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      throw new ApiError(403, 'Unauthorized to submit evidence for this milestone');
    }

    milestone.evidence = {
      description,
      fileUrl,
      submittedAt: new Date(),
    };
    milestone.status = 'submitted';
    milestone.completionPercentage = 100;
    await milestone.save();

    // Notify admins for review
    const admins = await User.find({ role: 'admin' });
    for (const admin of admins) {
      await createNotification({
        recipient: admin._id,
        type: 'MILESTONE_SUBMITTED',
        title: 'Milestone Evidence Submitted',
        message: `Milestone "${milestone.title}" in campaign "${milestone.campaign.title}" is ready for evidence review.`,
        link: `/admin/milestones`,
      });
    }

    return sendSuccess(res, 200, 'Milestone evidence submitted for admin verification', { milestone });
  } catch (error) {
    next(error);
  }
};

export const reviewMilestone = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, feedback = '' } = req.body; // status: 'approved' or 'rejected'

    const milestone = await Milestone.findById(id).populate('campaign');
    if (!milestone) {
      throw new ApiError(404, 'Milestone not found');
    }

    milestone.status = status === 'approved' ? 'completed' : 'rejected';
    milestone.adminReview = {
      feedback,
      reviewedBy: req.user._id,
      reviewedAt: new Date(),
    };
    await milestone.save();

    // Unlock next milestone if approved
    if (status === 'approved') {
      await Milestone.findOneAndUpdate(
        { campaign: milestone.campaign._id, order: milestone.order + 1, status: 'locked' },
        { status: 'active' }
      );
    }

    // Notify creator
    await createNotification({
      recipient: milestone.campaign.creator,
      type: status === 'approved' ? 'MILESTONE_APPROVED' : 'MILESTONE_REJECTED',
      title: `Milestone ${status === 'approved' ? 'Approved' : 'Rejected'}`,
      message: `Your milestone "${milestone.title}" was ${status}. Notes: ${feedback || 'None'}`,
      link: `/creator/campaigns/${milestone.campaign._id}`,
    });

    return sendSuccess(res, 200, `Milestone marked as ${milestone.status}`, { milestone });
  } catch (error) {
    next(error);
  }
};
