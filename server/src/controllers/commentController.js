import { Comment } from '../models/Comment.js';
import { Campaign } from '../models/Campaign.js';
import { ApiError } from '../utils/apiError.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const getCampaignComments = async (req, res, next) => {
  try {
    const { campaignId } = req.params;
    const comments = await Comment.find({ campaign: campaignId })
      .populate('user', 'name avatar role')
      .sort({ createdAt: -1 });

    return sendSuccess(res, 200, 'Campaign comments', { comments });
  } catch (error) {
    next(error);
  }
};

export const addComment = async (req, res, next) => {
  try {
    const { campaignId } = req.params;
    const { content } = req.body;

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      throw new ApiError(404, 'Campaign not found');
    }

    const comment = await Comment.create({
      campaign: campaignId,
      user: req.user._id,
      content: content.trim(),
    });

    const populated = await Comment.findById(comment._id).populate('user', 'name avatar role');

    return sendSuccess(res, 201, 'Comment posted successfully', { comment: populated });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id).populate('campaign');

    if (!comment) {
      throw new ApiError(404, 'Comment not found');
    }

    const isAuthor = comment.user.toString() === req.user._id.toString();
    const isCampaignOwner = comment.campaign.creator.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isAuthor && !isCampaignOwner && !isAdmin) {
      throw new ApiError(403, 'Unauthorized to delete this comment');
    }

    await Comment.findByIdAndDelete(id);
    return sendSuccess(res, 200, 'Comment removed');
  } catch (error) {
    next(error);
  }
};
