import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Notification must have a recipient'],
      index: true,
    },
    type: {
      type: String,
      required: true,
      enum: [
        'DONATION_RECEIVED',
        'CAMPAIGN_APPROVED',
        'CAMPAIGN_REJECTED',
        'MILESTONE_SUBMITTED',
        'MILESTONE_APPROVED',
        'MILESTONE_REJECTED',
        'CAMPAIGN_UPDATE',
        'EXPENSE_APPROVED',
        'EXPENSE_REJECTED',
        'REPORT_UPDATED',
        'SYSTEM_MESSAGE',
      ],
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      default: '',
    },
    read: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Notification = mongoose.model('Notification', notificationSchema);
