import { Expense } from '../models/Expense.js';
import { Campaign } from '../models/Campaign.js';
import { ApiError } from '../utils/apiError.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { createNotification } from '../services/notificationService.js';
import { User } from '../models/User.js';

export const getCampaignExpenses = async (req, res, next) => {
  try {
    const { campaignId } = req.params;
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      throw new ApiError(404, 'Campaign not found');
    }

    let query = { campaign: campaignId };
    const isOwner = req.user && req.user._id.toString() === campaign.creator.toString();
    const isAdmin = req.user && req.user.role === 'admin';

    // Public only sees approved expenses
    if (!isOwner && !isAdmin) {
      query.status = 'approved';
    }

    const expenses = await Expense.find(query)
      .populate('milestone', 'title order')
      .populate('reviewedBy', 'name')
      .sort({ date: -1 });

    return sendSuccess(res, 200, 'Campaign expenses', { expenses });
  } catch (error) {
    next(error);
  }
};

export const createExpense = async (req, res, next) => {
  try {
    const { campaignId } = req.params;
    const { milestoneId, description, category, amount, receiptUrl, date } = req.body;

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      throw new ApiError(404, 'Campaign not found');
    }

    if (campaign.creator.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      throw new ApiError(403, 'Unauthorized to record expense for this campaign');
    }

    const expense = await Expense.create({
      campaign: campaignId,
      milestone: milestoneId || undefined,
      description,
      category,
      amount: Number(amount),
      receiptUrl,
      date: date ? new Date(date) : new Date(),
      status: 'pending',
    });

    // Notify admins
    const admins = await User.find({ role: 'admin' });
    for (const admin of admins) {
      await createNotification({
        recipient: admin._id,
        type: 'EXPENSE_APPROVED', // Category of expense alert
        title: 'New Expense Receipt Submitted',
        message: `Expense of ₹${Number(amount).toLocaleString()} for "${campaign.title}" needs audit verification.`,
        link: `/admin/expenses`,
      });
    }

    return sendSuccess(res, 201, 'Expense record submitted for audit verification', { expense });
  } catch (error) {
    next(error);
  }
};

export const reviewExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, adminNotes = '' } = req.body; // status: 'approved' | 'rejected'

    const expense = await Expense.findById(id).populate('campaign');
    if (!expense) {
      throw new ApiError(404, 'Expense not found');
    }

    expense.status = status;
    expense.adminNotes = adminNotes;
    expense.reviewedBy = req.user._id;
    expense.reviewedAt = new Date();
    await expense.save();

    // Notify creator
    await createNotification({
      recipient: expense.campaign.creator,
      type: status === 'approved' ? 'EXPENSE_APPROVED' : 'EXPENSE_REJECTED',
      title: `Expense Receipt ${status === 'approved' ? 'Approved' : 'Rejected'}`,
      message: `Your expense entry of ₹${expense.amount.toLocaleString()} for "${expense.description}" was ${status}. ${adminNotes ? 'Notes: ' + adminNotes : ''}`,
      link: `/creator/campaigns/${expense.campaign._id}`,
    });

    return sendSuccess(res, 200, `Expense record marked as ${status}`, { expense });
  } catch (error) {
    next(error);
  }
};

export const getExpenseSummary = async (req, res, next) => {
  try {
    const { campaignId } = req.params;
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      throw new ApiError(404, 'Campaign not found');
    }

    const approvedExpenses = await Expense.find({ campaign: campaignId, status: 'approved' });

    const totalApproved = approvedExpenses.reduce((sum, e) => sum + e.amount, 0);
    const remainingFunds = Math.max(0, campaign.raisedAmount - totalApproved);

    // Group by category
    const categoryTotals = {};
    for (const exp of approvedExpenses) {
      categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
    }

    const categoryBreakdown = Object.keys(categoryTotals).map((cat) => ({
      category: cat,
      amount: categoryTotals[cat],
      percentage: totalApproved > 0 ? Math.round((categoryTotals[cat] / totalApproved) * 100) : 0,
    }));

    return sendSuccess(res, 200, 'Expense transparency dashboard summary', {
      totalRaised: campaign.raisedAmount,
      totalApprovedExpenses: totalApproved,
      remainingFunds,
      categoryBreakdown,
      expenseCount: approvedExpenses.length,
    });
  } catch (error) {
    next(error);
  }
};
