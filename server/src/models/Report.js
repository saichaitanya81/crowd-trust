import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Report must be filed by a user'],
      index: true,
    },
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campaign',
      required: [true, 'Report must reference a campaign'],
      index: true,
    },
    reason: {
      type: String,
      required: [true, 'Reason for report is required'],
      enum: [
        'Suspicious campaign',
        'Misleading information',
        'Inappropriate content',
        'Duplicate campaign',
        'Fraud concern',
        'Other',
      ],
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Detailed explanation is required'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    status: {
      type: String,
      enum: ['pending', 'under_review', 'resolved', 'dismissed'],
      default: 'pending',
      index: true,
    },
    adminNotes: {
      type: String,
      default: '',
    },
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    resolvedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const Report = mongoose.model('Report', reportSchema);
