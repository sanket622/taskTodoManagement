// controllers/notificationController.js
import Notification from '../models/Notification.js';
import Redis from 'ioredis';
const redis = new Redis();

redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});

redis.on('connect', () => {
  console.log('Connected to Redis');
});

export const getNotifications = async (req, res) => {
  try {
    const cacheKey = `notifications_${req.user.id}`;
  const cachedData = await redis.get(cacheKey);
  
  if (cachedData) return res.json(JSON.parse(cachedData));
    const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
    await redis.set(cacheKey, JSON.stringify(notifications), 'EX', 300); // Cache for 5 minutes
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const markAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
