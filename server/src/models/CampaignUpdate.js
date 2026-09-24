import mongoose from 'mongoose';

const campaignUpdateSchema = new mongoose.Schema(
  {
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campaign',
      required: [true, 'Update must belong to a campaign'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Update title is required'],
      trim: true,
      maxlength: [140, 'Title cannot exceed 140 characters'],
    },
    content: {
      type: String,
      required: [true, 'Update content is required'],
    },
    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const CampaignUpdate = mongoose.model('CampaignUpdate', campaignUpdateSchema);
