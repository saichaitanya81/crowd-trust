import mongoose from 'mongoose';
import { Campaign } from '../models/Campaign.js';
import { Milestone } from '../models/Milestone.js';
import { Expense } from '../models/Expense.js';
import { CampaignUpdate } from '../models/CampaignUpdate.js';
import { Impact } from '../models/Impact.js';
import { Donation } from '../models/Donation.js';
import { User } from '../models/User.js';
import { ApiError } from '../utils/apiError.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { generateSlug } from '../utils/slugify.js';
import { createNotification } from '../services/notificationService.js';

export const getCampaigns = async (req, res, next) => {
  try {
    const {
      search,
      category,
      status = 'active',
      verifiedOnly,
      location,
      minGoal,
      maxGoal,
      sort = 'recent',
      page = 1,
      limit = 12,
    } = req.query;

    const query = {};

    // Filter by status (public view defaults to 'active' or 'completed' unless admin/creator query)
    if (status && status !== 'all') {
      query.status = status;
    }

    // Category filter
    if (category && category !== 'All') {
      query.category = category;
    }

    // Verified only filter
    if (verifiedOnly === 'true') {
      query.verificationStatus = 'verified';
    }

    // Location filter
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    // Goal amount range
    if (minGoal || maxGoal) {
      query.goalAmount = {};
      if (minGoal) query.goalAmount.$gte = Number(minGoal);
      if (maxGoal) query.goalAmount.$lte = Number(maxGoal);
    }

    // Text search query
    if (search && search.trim()) {
      query.$text = { $search: search.trim() };
    }

    // Sort order
    let sortOptions = { createdAt: -1 };
    if (sort === 'most_funded') {
      sortOptions = { raisedAmount: -1 };
    } else if (sort === 'ending_soon') {
      sortOptions = { deadline: 1 };
    } else if (sort === 'highest_goal') {
      sortOptions = { goalAmount: -1 };
    } else if (sort === 'most_popular') {
      sortOptions = { donorCount: -1 };
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    const total = await Campaign.countDocuments(query);
    const campaigns = await Campaign.find(query)
      .populate('creator', 'name avatar verificationStatus bio')
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum);

    return sendSuccess(
      res,
      200,
      'Campaigns fetched successfully',
      { campaigns },
      {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      }
    );
  } catch (error) {
    next(error);
  }
};

export const getFeaturedCampaigns = async (req, res, next) => {
  try {
    const featured = await Campaign.find({
      status: 'active',
      isFeatured: true,
    })
      .populate('creator', 'name avatar verificationStatus')
      .limit(4);

    // If fewer than 4 featured, pull top active verified campaigns
    let campaigns = featured;
    if (campaigns.length < 4) {
      const topActive = await Campaign.find({
        status: 'active',
        _id: { $nin: campaigns.map((c) => c._id) },
      })
        .populate('creator', 'name avatar verificationStatus')
        .sort({ raisedAmount: -1 })
        .limit(4 - campaigns.length);

      campaigns = [...campaigns, ...topActive];
    }

    return sendSuccess(res, 200, 'Featured campaigns', { campaigns });
  } catch (error) {
    next(error);
  }
};

export const getCampaignStats = async (req, res, next) => {
  try {
    const [totalDonationsAgg, activeCount, completedCount, verifiedCreatorsCount] = await Promise.all([
      Donation.aggregate([
        { $match: { status: 'successful' } },
        { $group: { _id: null, totalRaised: { $sum: '$amount' }, count: { $sum: 1 } } },
      ]),
      Campaign.countDocuments({ status: 'active' }),
      Campaign.countDocuments({ status: 'completed' }),
      User.countDocuments({ role: 'creator', verificationStatus: 'verified' }),
    ]);

    const totalFundsRaised = totalDonationsAgg[0]?.totalRaised || 0;
    const totalDonationCount = totalDonationsAgg[0]?.count || 0;

    return sendSuccess(res, 200, 'Platform overall stats', {
      totalFundsRaised,
      totalDonationCount,
      activeCampaigns: activeCount,
      completedCampaigns: completedCount,
      verifiedCreators: verifiedCreatorsCount,
    });
  } catch (error) {
    next(error);
  }
};

export const getCampaignBySlugOrId = async (req, res, next) => {
  try {
    const { id } = req.params;

    let query = {};
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { _id: id };
    } else {
      query = { slug: id.toLowerCase() };
    }

    const campaign = await Campaign.findOne(query).populate(
      'creator',
      'name avatar bio location verificationStatus createdAt'
    );

    if (!campaign) {
      throw new ApiError(404, 'Campaign not found.');
    }

    // Retrieve associated relational modules
    const [milestones, expenses, updates, impactMetrics, recentDonations] = await Promise.all([
      Milestone.find({ campaign: campaign._id }).sort({ order: 1 }),
      Expense.find({ campaign: campaign._id, status: 'approved' }).sort({ date: -1 }),
      CampaignUpdate.find({ campaign: campaign._id }).sort({ createdAt: -1 }),
      Impact.find({ campaign: campaign._id }),
      Donation.find({ campaign: campaign._id, status: 'successful' })
        .sort({ createdAt: -1 })
        .limit(10)
        .select('amount currency isAnonymous donorName message createdAt donor')
        .populate('donor', 'name avatar'),
    ]);

    // Financial transparency calculations
    const approvedExpensesTotal = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const remainingFunds = Math.max(0, campaign.raisedAmount - approvedExpensesTotal);

    return sendSuccess(res, 200, 'Campaign details retrieved', {
      campaign,
      milestones,
      expenses,
      updates,
      impactMetrics,
      recentDonations,
      transparency: {
        totalRaised: campaign.raisedAmount,
        totalApprovedExpenses: approvedExpensesTotal,
        remainingFunds,
        expenseUtilizationRate:
          campaign.raisedAmount > 0
            ? Math.min(100, Math.round((approvedExpensesTotal / campaign.raisedAmount) * 100))
            : 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createCampaign = async (req, res, next) => {
  try {
    const creatorId = req.user._id;
    const {
      title,
      shortDescription,
      description,
      category,
      goalAmount,
      currency = 'INR',
      deadline,
      coverImage,
      gallery = [],
      videoUrl = '',
      location,
      beneficiary,
      budget = [],
      story = {},
      milestones = [],
      status = 'pending_review',
    } = req.body;

    // Generate unique slug
    let baseSlug = generateSlug(title);
    let slug = baseSlug;
    let count = 1;
    while (await Campaign.findOne({ slug })) {
      slug = `${baseSlug}-${count++}`;
    }

    const campaign = await Campaign.create({
      creator: creatorId,
      title,
      slug,
      shortDescription,
      description,
      category,
      goalAmount,
      currency,
      deadline: new Date(deadline),
      coverImage,
      gallery,
      videoUrl,
      location,
      beneficiary,
      budget,
      story,
      status: status === 'draft' ? 'draft' : 'pending_review',
      verificationStatus: req.user.verificationStatus === 'verified' ? 'verified' : 'pending',
    });

    // Create initial milestones if supplied in multi-step wizard
    if (Array.isArray(milestones) && milestones.length > 0) {
      const milestoneDocs = milestones.map((m, index) => ({
        campaign: campaign._id,
        title: m.title,
        description: m.description,
        targetAmount: m.targetAmount || Math.round(goalAmount / milestones.length),
        order: index + 1,
        status: index === 0 ? 'active' : 'locked',
        dueDate: m.dueDate ? new Date(m.dueDate) : undefined,
      }));
      await Milestone.insertMany(milestoneDocs);
    }

    // Notify admins about new campaign
    const admins = await User.find({ role: 'admin' });
    for (const admin of admins) {
      await createNotification({
        recipient: admin._id,
        type: 'CAMPAIGN_APPROVED',
        title: 'New Campaign Submitted For Review',
        message: `Campaign "${campaign.title}" was submitted by ${req.user.name}.`,
        link: `/admin/campaigns/${campaign._id}`,
      });
    }

    return sendSuccess(res, 201, 'Campaign created successfully', { campaign });
  } catch (error) {
    next(error);
  }
};

export const updateCampaign = async (req, res, next) => {
  try {
    const { id } = req.params;
    const campaign = await Campaign.findById(id);

    if (!campaign) {
      throw new ApiError(404, 'Campaign not found');
    }

    // Security check: Only creator or admin can update
    if (campaign.creator.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      throw new ApiError(403, 'Unauthorized to modify this campaign');
    }

    // Cannot modify completed or cancelled campaigns
    if (['completed', 'cancelled'].includes(campaign.status) && req.user.role !== 'admin') {
      throw new ApiError(400, 'Cannot modify a completed or cancelled campaign');
    }

    const updated = await Campaign.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    return sendSuccess(res, 200, 'Campaign updated successfully', { campaign: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteCampaign = async (req, res, next) => {
  try {
    const { id } = req.params;
    const campaign = await Campaign.findById(id);

    if (!campaign) {
      throw new ApiError(404, 'Campaign not found');
    }

    if (campaign.creator.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      throw new ApiError(403, 'Unauthorized to delete this campaign');
    }

    // Cannot delete if active with raised funds
    if (campaign.raisedAmount > 0 && req.user.role !== 'admin') {
      throw new ApiError(400, 'Cannot delete a campaign that has already collected donations');
    }

    await Campaign.findByIdAndDelete(id);
    await Milestone.deleteMany({ campaign: id });
    await Expense.deleteMany({ campaign: id });
    await CampaignUpdate.deleteMany({ campaign: id });

    return sendSuccess(res, 200, 'Campaign deleted successfully');
  } catch (error) {
    next(error);
  }
};

export const toggleFollowCampaign = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user._id);

    const isFollowing = user.followedCampaigns.some((campId) => campId.toString() === id);

    if (isFollowing) {
      user.followedCampaigns = user.followedCampaigns.filter((campId) => campId.toString() !== id);
    } else {
      user.followedCampaigns.push(id);
    }

    await user.save();

    return sendSuccess(res, 200, isFollowing ? 'Unfollowed campaign' : 'Following campaign for updates', {
      isFollowing: !isFollowing,
    });
  } catch (error) {
    next(error);
  }
};
