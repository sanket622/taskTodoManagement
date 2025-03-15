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


// Redis is used to cache notifications for faster retrieval, reducing database queries. 
// Cached data is stored for 5 minutes to improve performance.
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
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ error: 'Notification ID not available' });
    }

    notification.isRead = true;
    await notification.save();

    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

