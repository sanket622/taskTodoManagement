import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true, 
      index: true // Index for faster lookups by user
    },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false, index: true }, // Index for filtering unread/read notifications
    createdAt: { type: Date, default: Date.now, index: true } // Index for sorting by creation date
  }
);

// Compound index for frequent queries (e.g., unread notifications of a specific user)
notificationSchema.index({ user: 1, isRead: 1, createdAt: -1 });

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
