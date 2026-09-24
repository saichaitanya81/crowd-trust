import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Campaign must belong to a creator'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Campaign title is required'],
      trim: true,
      minlength: [5, 'Title must be at least 5 characters'],
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    shortDescription: {
      type: String,
      required: [true, 'Short summary is required'],
      trim: true,
      maxlength: [280, 'Short summary cannot exceed 280 characters'],
    },
    description: {
      type: String,
      required: [true, 'Detailed campaign description is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Education',
        'Medical',
        'Emergency',
        'Community',
        'Environment',
        'Technology',
        'Creative Projects',
        'Startup',
        'Other',
      ],
      index: true,
    },
    goalAmount: {
      type: Number,
      required: [true, 'Funding goal amount is required'],
      min: [100, 'Goal amount must be at least 100'],
    },
    raisedAmount: {
      type: Number,
      default: 0,
      min: [0, 'Raised amount cannot be negative'],
    },
    currency: {
      type: String,
      default: 'INR',
      uppercase: true,
    },
    deadline: {
      type: Date,
      required: [true, 'Campaign deadline date is required'],
      index: true,
    },
    coverImage: {
      type: String,
      required: [true, 'Cover image is required'],
    },
    gallery: [
      {
        type: String,
      },
    ],
    videoUrl: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    beneficiary: {
      type: String,
      required: [true, 'Beneficiary name/organization is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: [
        'draft',
        'pending_review',
        'approved',
        'active',
        'paused',
        'completed',
        'rejected',
        'cancelled',
      ],
      default: 'draft',
      index: true,
    },
    verificationStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
      index: true,
    },
    budget: [
      {
        category: { type: String, required: true },
        amount: { type: Number, required: true, min: 0 },
        description: { type: String, default: '' },
      },
    ],
    story: {
      problem: { type: String, default: '' },
      solution: { type: String, default: '' },
      beneficiaries: { type: String, default: '' },
      expectedImpact: { type: String, default: '' },
    },
    donorCount: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    adminFeedback: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for percentage funded
campaignSchema.virtual('percentageRaised').get(function () {
  if (!this.goalAmount || this.goalAmount === 0) return 0;
  return Math.min(100, Math.round((this.raisedAmount / this.goalAmount) * 100));
});

// Virtual for days remaining
campaignSchema.virtual('daysRemaining').get(function () {
  if (!this.deadline) return 0;
  const now = new Date();
  const diffTime = new Date(this.deadline).getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
});

// Full-text search index
campaignSchema.index(
  {
    title: 'text',
    shortDescription: 'text',
    description: 'text',
    category: 'text',
    location: 'text',
    beneficiary: 'text',
  },
  {
    weights: {
      title: 10,
      shortDescription: 5,
      category: 4,
      location: 3,
      description: 1,
    },
    name: 'CampaignTextIndex',
  }
);

export const Campaign = mongoose.model('Campaign', campaignSchema);
