// routes/notificationRoutes.js
import express from 'express';
import { getNotifications, markAsRead } from '../controllers/notificationController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route GET /api/notifications - Delete a task (Protected, User/Admin)
router.get('/', protect, authorize(['User', 'Admin']), getNotifications);

// @route PUT /api/notifications/:id/read - Mark a task as read (Protected, User/Admin)
router.put('/:id/read', protect, authorize(['User', 'Admin']), markAsRead);

export default router;
