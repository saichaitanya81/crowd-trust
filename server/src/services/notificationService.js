import { Notification } from '../models/Notification.js';

export const createNotification = async ({ recipient, type, title, message, link = '' }) => {
  try {
    const notification = await Notification.create({
      recipient,
      type,
      title,
      message,
      link,
    });
    return notification;
  } catch (error) {
    console.error('[NotificationService Error] Could not create notification:', error.message);
    return null;
  }
};
