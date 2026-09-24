import { Campaign } from '../models/Campaign.js';
import { CreatorVerification } from '../models/CreatorVerification.js';
import { User } from '../models/User.js';
import { ApiError } from '../utils/apiError.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { createNotification } from '../services/notificationService.js';

export const getCreatorDashboard = async (req, res, next) => {
  try {
    const creatorId = req.user._id;

    const [campaigns, verification] = await Promise.all([
      Campaign.find({ creator: creatorId }).sort({ createdAt: -1 }),
      CreatorVerification.findOne({ userId: creatorId }),
    ]);

    const totalRaised = campaigns.reduce((acc, c) => acc + c.raisedAmount, 0);
    const totalDonors = campaigns.reduce((acc, c) => acc + c.donorCount, 0);

    const stats = {
      totalCampaigns: campaigns.length,
      activeCampaigns: campaigns.filter((c) => c.status === 'active').length,
      pendingCampaigns: campaigns.filter((c) => c.status === 'pending_review').length,
      completedCampaigns: campaigns.filter((c) => c.status === 'completed').length,
      draftCampaigns: campaigns.filter((c) => c.status === 'draft').length,
      totalRaised,
      totalDonors,
      verificationStatus: req.user.verificationStatus,
    };

    return sendSuccess(res, 200, 'Creator dashboard overview', {
      stats,
      campaigns,
      verification,
    });
  } catch (error) {
    next(error);
  }
};

export const submitCreatorVerification = async (req, res, next) => {
  try {
    const { documentType, documentNumber, documentUrl, organizationName = '' } = req.body;

    let verification = await CreatorVerification.findOne({ userId: req.user._id });

    if (verification) {
      verification.documentType = documentType;
      verification.documentNumber = documentNumber;
      verification.documentUrl = documentUrl;
      verification.organizationName = organizationName;
      verification.status = 'pending';
      verification.submittedAt = new Date();
      await verification.save();
    } else {
      verification = await CreatorVerification.create({
        userId: req.user._id,
        documentType,
        documentNumber,
        documentUrl,
        organizationName,
        status: 'pending',
      });
    }

    await User.findByIdAndUpdate(req.user._id, { verificationStatus: 'pending' });

    // Notify admins
    const admins = await User.find({ role: 'admin' });
    for (const admin of admins) {
      await createNotification({
        recipient: admin._id,
        type: 'CAMPAIGN_APPROVED',
        title: 'New Creator Verification Request',
        message: `${req.user.name} submitted identity verification credentials for review.`,
        link: `/admin/verifications`,
      });
    }

    return sendSuccess(res, 200, 'Verification request submitted for admin review', {
      verification,
    });
  } catch (error) {
    next(error);
  }
};

export const getCreatorVerificationStatus = async (req, res, next) => {
  try {
    const verification = await CreatorVerification.findOne({ userId: req.user._id });
    return sendSuccess(res, 200, 'Creator verification status', {
      verification,
      userStatus: req.user.verificationStatus,
    });
  } catch (error) {
    next(error);
  }
};
