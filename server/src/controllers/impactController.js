import { Impact } from '../models/Impact.js';
import { Campaign } from '../models/Campaign.js';
import { ApiError } from '../utils/apiError.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const getCampaignImpacts = async (req, res, next) => {
  try {
    const { campaignId } = req.params;
    const impacts = await Impact.find({ campaign: campaignId });
    return sendSuccess(res, 200, 'Campaign impact metrics', { impacts });
  } catch (error) {
    next(error);
  }
};

export const setCampaignImpacts = async (req, res, next) => {
  try {
    const { campaignId } = req.params;
    const { metrics } = req.body; // Array of { metricName, metricValue, unit, description }

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      throw new ApiError(404, 'Campaign not found');
    }

    if (campaign.creator.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      throw new ApiError(403, 'Unauthorized to update impact metrics for this campaign');
    }

    // Replace existing metrics with new structured batch
    await Impact.deleteMany({ campaign: campaignId });

    const newImpacts = await Impact.insertMany(
      metrics.map((m) => ({
        campaign: campaignId,
        metricName: m.metricName,
        metricValue: Number(m.metricValue),
        unit: m.unit || '',
        description: m.description || '',
      }))
    );

    return sendSuccess(res, 200, 'Impact metrics updated successfully', { impacts: newImpacts });
  } catch (error) {
    next(error);
  }
};
