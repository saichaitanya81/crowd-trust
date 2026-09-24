import { Report } from '../models/Report.js';
import { Campaign } from '../models/Campaign.js';
import { User } from '../models/User.js';
import { ApiError } from '../utils/apiError.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { createNotification } from '../services/notificationService.js';

export const createReport = async (req, res, next) => {
  try {
    const { campaignId, reason, description } = req.body;

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      throw new ApiError(404, 'Campaign not found');
    }

    const report = await Report.create({
      reportedBy: req.user._id,
      campaign: campaignId,
      reason,
      description,
      status: 'pending',
    });

    // Notify all admins
    const admins = await User.find({ role: 'admin' });
    for (const admin of admins) {
      await createNotification({
        recipient: admin._id,
        type: 'REPORT_UPDATED',
        title: 'New Campaign Concern Reported',
        message: `Campaign "${campaign.title}" was reported for "${reason}".`,
        link: `/admin/reports`,
      });
    }

    return sendSuccess(
      res,
      201,
      'Report submitted successfully. Our trust & safety team will investigate.',
      { report }
    );
  } catch (error) {
    next(error);
  }
};

export const getReports = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = {};
    if (status && status !== 'all') {
      query.status = status;
    }

    const reports = await Report.find(query)
      .populate('reportedBy', 'name email avatar')
      .populate({
        path: 'campaign',
        select: 'title slug category status raisedAmount goalAmount creator',
        populate: { path: 'creator', select: 'name email' },
      })
      .sort({ createdAt: -1 });

    return sendSuccess(res, 200, 'Report inquiries', { reports });
  } catch (error) {
    next(error);
  }
};

export const resolveReport = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, adminNotes = '', actionTaken = 'none' } = req.body;

    const report = await Report.findById(id).populate('campaign');
    if (!report) {
      throw new ApiError(404, 'Report not found');
    }

    report.status = status;
    report.adminNotes = adminNotes;
    report.resolvedBy = req.user._id;
    report.resolvedAt = new Date();
    await report.save();

    // Perform moderation action if specified
    if (actionTaken === 'pause_campaign' && report.campaign) {
      await Campaign.findByIdAndUpdate(report.campaign._id, { status: 'paused' });
    } else if (actionTaken === 'reject_campaign' && report.campaign) {
      await Campaign.findByIdAndUpdate(report.campaign._id, { status: 'rejected' });
    }

    // Notify reporting user
    await createNotification({
      recipient: report.reportedBy,
      type: 'REPORT_UPDATED',
      title: 'Report Update',
      message: `Your report regarding "${report.campaign?.title || 'a campaign'}" has been reviewed by moderation staff. Status: ${status}.`,
      link: '/dashboard',
    });

    return sendSuccess(res, 200, `Report marked as ${status}`, { report });
  } catch (error) {
    next(error);
  }
};
