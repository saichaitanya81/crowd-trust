import mongoose from 'mongoose';

const milestoneSchema = new mongoose.Schema(
  {
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campaign',
      required: [true, 'Milestone must belong to a campaign'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Milestone title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Milestone description is required'],
    },
    targetAmount: {
      type: Number,
      required: [true, 'Target funding allocated for milestone is required'],
      min: [0, 'Target amount cannot be negative'],
    },
    order: {
      type: Number,
      default: 1,
      min: 1,
    },
    status: {
      type: String,
      enum: ['locked', 'active', 'submitted', 'approved', 'rejected', 'completed'],
      default: 'locked',
      index: true,
    },
    dueDate: {
      type: Date,
    },
    completionPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    evidence: {
      description: { type: String, default: '' },
      fileUrl: { type: String, default: '' },
      submittedAt: { type: Date },
    },
    adminReview: {
      feedback: { type: String, default: '' },
      reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      reviewedAt: { type: Date },
    },
  },
  {
    timestamps: true,
  }
);

milestoneSchema.index({ campaign: 1, order: 1 });

export const Milestone = mongoose.model('Milestone', milestoneSchema);
