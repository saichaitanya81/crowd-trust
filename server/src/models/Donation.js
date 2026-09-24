import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campaign',
      required: [true, 'Donation must be linked to a campaign'],
      index: true,
    },
    amount: {
      type: Number,
      required: [true, 'Donation amount is required'],
      min: [1, 'Donation amount must be at least 1'],
    },
    currency: {
      type: String,
      default: 'INR',
      uppercase: true,
    },
    paymentProvider: {
      type: String,
      default: 'sandbox',
    },
    paymentReference: {
      type: String,
      unique: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['pending', 'successful', 'failed', 'refunded'],
      default: 'pending',
      index: true,
    },
    message: {
      type: String,
      maxlength: [300, 'Message cannot exceed 300 characters'],
      default: '',
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    donorName: {
      type: String,
      default: 'Anonymous Supporter',
    },
    donorEmail: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const Donation = mongoose.model('Donation', donationSchema);
