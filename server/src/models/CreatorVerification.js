import mongoose from 'mongoose';

const creatorVerificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true, // One active verification request per creator
      index: true,
    },
    organizationName: {
      type: String,
      trim: true,
      default: '',
    },
    documentType: {
      type: String,
      required: [true, 'Document type is required'],
      enum: ['National ID', 'Passport', 'Driver License', 'Tax / Organization ID', 'Other'],
    },
    documentNumber: {
      type: String,
      required: [true, 'Document number is required'],
      trim: true,
    },
    documentUrl: {
      type: String,
      required: [true, 'Document proof/image URL is required'],
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
      index: true,
    },
    adminNotes: {
      type: String,
      default: '',
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    reviewedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const CreatorVerification = mongoose.model('CreatorVerification', creatorVerificationSchema);
