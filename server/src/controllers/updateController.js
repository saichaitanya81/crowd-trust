import { CampaignUpdate } from '../models/CampaignUpdate.js';
import { Campaign } from '../models/Campaign.js';
import { Donation } from '../models/Donation.js';
import { User } from '../models/User.js';
import { ApiError } from '../utils/apiError.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { createNotification } from '../services/notificationService.js';

export const getCampaignUpdates = async (req, res, next) => {
  try {
    const { campaignId } = req.params;
    const updates = await CampaignUpdate.find({ campaign: campaignId }).sort({ createdAt: -1 });
    return sendSuccess(res, 200, 'Campaign updates', { updates });
  } catch (error) {
    next(error);
  }
};

export const createCampaignUpdate = async (req, res, next) => {
  try {
    const { campaignId } = req.params;
    const { title, content, images = [] } = req.body;

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      throw new ApiError(404, 'Campaign not found');
    }

    if (campaign.creator.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      throw new ApiError(403, 'Unauthorized to post updates for this campaign');
    }

    const update = await CampaignUpdate.create({
      campaign: campaignId,
      title,
      content,
      images,
    });

    // Notify donors & followers
    const [donations, followers] = await Promise.all([
      Donation.find({ campaign: campaignId, donor: { $exists: true } }).distinct('donor'),
      User.find({ followedCampaigns: campaignId }).distinct('_id'),
    ]);

    const recipientSet = new Set([...donations.map((id) => id.toString()), ...followers.map((id) => id.toString())]);
    recipientSet.delete(req.user._id.toString()); // Don't notify creator themselves

    for (const recipientId of recipientSet) {
      await createNotification({
        recipient: recipientId,
        type: 'CAMPAIGN_UPDATE',
        title: `Update on "${campaign.title}"`,
        message: `${update.title} - ${update.content.slice(0, 100)}...`,
        link: `/campaigns/${campaign.slug || campaign._id}`,
      });
    }

    return sendSuccess(res, 201, 'Campaign update published and supporters notified', { update });
  } catch (error) {
    next(error);
  }
};

export const deleteCampaignUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = await CampaignUpdate.findById(id).populate('campaign');

    if (!update) {
      throw new ApiError(404, 'Update not found');
    }

    if (update.campaign.creator.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      throw new ApiError(403, 'Unauthorized to delete this update');
    }

    await CampaignUpdate.findByIdAndDelete(id);
    return sendSuccess(res, 200, 'Campaign update deleted');
  } catch (error) {
    next(error);
  }
};
