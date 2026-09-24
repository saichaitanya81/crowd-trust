import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema(
  {
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campaign',
      required: [true, 'Expense must be linked to a campaign'],
      index: true,
    },
    milestone: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Milestone',
    },
    description: {
      type: String,
      required: [true, 'Expense description is required'],
      trim: true,
      maxlength: [200, 'Description cannot exceed 200 characters'],
    },
    category: {
      type: String,
      required: [true, 'Expense category is required'],
      enum: [
        'Equipment',
        'Materials',
        'Labor',
        'Logistics & Transport',
        'Legal & Permitting',
        'Operations',
        'Other',
      ],
      index: true,
    },
    amount: {
      type: Number,
      required: [true, 'Expense amount is required'],
      min: [1, 'Expense amount must be greater than 0'],
    },
    receiptUrl: {
      type: String,
      required: [true, 'Receipt or invoice document URL is required'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
      index: true,
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    reviewedAt: {
      type: Date,
    },
    adminNotes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const Expense = mongoose.model('Expense', expenseSchema);
