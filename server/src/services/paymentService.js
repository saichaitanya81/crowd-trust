import crypto from 'crypto';
import { ApiError } from '../utils/apiError.js';

export const processSandboxPayment = async ({
  amount,
  currency = 'INR',
  cardNumber = '4242424242424242',
  cardExp = '12/28',
  donorName = 'Valued Donor',
}) => {
  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 300));

  const cleanCard = cardNumber.replace(/\s+/g, '');

  // Simulate test failure card for testing error paths
  if (cleanCard.endsWith('0002') || cleanCard === '4000000000000002') {
    throw new ApiError(400, 'Test card declined: Insufficient funds or invalid card status.');
  }

  // Generate secure transaction reference
  const randomSuffix = crypto.randomBytes(4).toString('hex').toUpperCase();
  const paymentReference = `CT-TXN-${Date.now().toString(36).toUpperCase()}-${randomSuffix}`;

  return {
    success: true,
    status: 'successful',
    paymentProvider: 'sandbox',
    paymentReference,
    amount,
    currency,
    timestamp: new Date().toISOString(),
    receiptUrl: `/receipts/${paymentReference}`,
  };
};
