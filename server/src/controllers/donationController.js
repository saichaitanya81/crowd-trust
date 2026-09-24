import mongoose from 'mongoose';
import { Donation } from '../models/Donation.js';
import { Campaign } from '../models/Campaign.js';
import { ApiError } from '../utils/apiError.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { processSandboxPayment } from '../services/paymentService.js';
import { createNotification } from '../services/notificationService.js';

export const processDonation = async (req, res, next) => {
  try {
    const {
      campaignId,
      amount,
      currency = 'INR',
      message = '',
      isAnonymous = false,
      donorName,
      donorEmail,
      cardNumber,
      cardExp,
    } = req.body;

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      throw new ApiError(404, 'Target campaign not found');
    }

    if (campaign.status !== 'active') {
      throw new ApiError(400, `Cannot donate to a campaign with status: ${campaign.status}. Must be active.`);
    }

    // Process payment through payment provider abstraction (test sandbox)
    const paymentResult = await processSandboxPayment({
      amount: Number(amount),
      currency,
      cardNumber: cardNumber || '4242424242424242',
      cardExp: cardExp || '12/28',
      donorName: isAnonymous ? 'Anonymous Supporter' : donorName || req.user?.name || 'Valued Donor',
    });

    const donorId = req.user ? req.user._id : undefined;
    const finalDonorName = isAnonymous
      ? 'Anonymous Supporter'
      : donorName || req.user?.name || 'Generous Donor';
    const finalDonorEmail = donorEmail || req.user?.email || '';

    // Create donation record
    const donation = await Donation.create({
      donor: donorId,
      campaign: campaign._id,
      amount: Number(amount),
      currency,
      paymentProvider: paymentResult.paymentProvider,
      paymentReference: paymentResult.paymentReference,
      status: 'successful',
      message,
      isAnonymous: Boolean(isAnonymous),
      donorName: finalDonorName,
      donorEmail: finalDonorEmail,
    });

    // Atomic increment of raisedAmount and donorCount on campaign
    const updatedCampaign = await Campaign.findByIdAndUpdate(
      campaign._id,
      {
        $inc: {
          raisedAmount: Number(amount),
          donorCount: 1,
        },
      },
      { new: true }
    );

    // Notify campaign creator
    await createNotification({
      recipient: campaign.creator,
      type: 'DONATION_RECEIVED',
      title: 'New Donation Received!',
      message: `${finalDonorName} donated ₹${Number(amount).toLocaleString()} to "${campaign.title}"`,
      link: `/campaigns/${campaign.slug || campaign._id}`,
    });

    // Notify donor if logged in
    if (donorId) {
      await createNotification({
        recipient: donorId,
        type: 'DONATION_RECEIVED',
        title: 'Donation Confirmed',
        message: `Your donation of ₹${Number(amount).toLocaleString()} to "${campaign.title}" was successful. Reference: ${donation.paymentReference}`,
        link: `/campaigns/${campaign.slug || campaign._id}`,
      });
    }

    return sendSuccess(res, 201, 'Donation processed successfully', {
      donation,
      campaign: {
        _id: updatedCampaign._id,
        raisedAmount: updatedCampaign.raisedAmount,
        goalAmount: updatedCampaign.goalAmount,
        donorCount: updatedCampaign.donorCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMyDonations = async (req, res, next) => {
  try {
    const donations = await Donation.find({ donor: req.user._id })
      .populate({
        path: 'campaign',
        select: 'title slug category coverImage status verificationStatus goalAmount raisedAmount',
      })
      .sort({ createdAt: -1 });

    return sendSuccess(res, 200, 'User donation history', { donations });
  } catch (error) {
    next(error);
  }
};

export const getCampaignDonations = async (req, res, next) => {
  try {
    const { campaignId } = req.params;
    const donations = await Donation.find({ campaign: campaignId, status: 'successful' })
      .populate('donor', 'name avatar')
      .sort({ createdAt: -1 })
      .limit(50);

    const sanitized = donations.map((d) => ({
      _id: d._id,
      amount: d.amount,
      currency: d.currency,
      message: d.message,
      isAnonymous: d.isAnonymous,
      donorName: d.isAnonymous ? 'Anonymous Supporter' : d.donorName || d.donor?.name || 'Supporter',
      avatar: d.isAnonymous ? null : d.donor?.avatar || null,
      createdAt: d.createdAt,
    }));

    return sendSuccess(res, 200, 'Campaign donations', { donations: sanitized });
  } catch (error) {
    next(error);
  }
};
