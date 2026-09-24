import mongoose from 'mongoose';

const impactSchema = new mongoose.Schema(
  {
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campaign',
      required: [true, 'Impact metric must belong to a campaign'],
      index: true,
    },
    metricName: {
      type: String,
      required: [true, 'Metric name is required'],
      trim: true,
    },
    metricValue: {
      type: Number,
      required: [true, 'Metric value is required'],
      min: 0,
    },
    unit: {
      type: String,
      default: '',
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Impact = mongoose.model('Impact', impactSchema);
