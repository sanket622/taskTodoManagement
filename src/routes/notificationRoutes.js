// routes/notificationRoutes.js
import express from 'express';
import { getNotifications, markAsRead } from '../controllers/notificationController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, authorize(['User', 'Admin']), getNotifications);
router.put('/:id/read', protect, authorize(['User', 'Admin']), markAsRead);

export default router;
