import { Campaign } from '../models/Campaign.js';
import { analyzeCampaign, checkSimilarity } from '../services/aiService.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const analyzeCampaignDraft = async (req, res, next) => {
  try {
    const { title = '', description = '', category = '', goalAmount = 0, budget = [] } = req.body;

    const analysis = await analyzeCampaign({
      title,
      description,
      category,
      goalAmount: Number(goalAmount),
      budget,
    });

    return sendSuccess(res, 200, 'AI campaign analysis complete', { analysis });
  } catch (error) {
    next(error);
  }
};

export const getSimilarityCheck = async (req, res, next) => {
  try {
    const { title = '', description = '' } = req.body;
    const existing = await Campaign.find({ status: { $in: ['active', 'approved', 'completed'] } }).select(
      'title shortDescription slug category'
    );

    const similarities = await checkSimilarity(title, description, existing);
    return sendSuccess(res, 200, 'Similarity assessment complete', { similarities });
  } catch (error) {
    next(error);
  }
};
