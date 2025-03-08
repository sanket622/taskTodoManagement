import express from 'express';
import { createTask, getTasks, updateTask, deleteTask, assignTask, getLogs  } from '../controllers/taskController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route POST /api/tasks - Create a new task (Protected, User/Admin)
router.post('/', protect, authorize(['User', 'Admin']), createTask);

// @route GET /api/tasks - Get all tasks (Protected)
router.get('/', protect, getTasks);

// @route PUT /api/tasks/:id - Update a task (Protected, User/Admin)
router.put('/:id', protect, authorize(['User', 'Admin']), updateTask);

// @route DELETE /api/tasks/:id - Delete a task (Protected, User/Admin)
router.delete('/:id', protect, authorize(['User', 'Admin']), deleteTask);

// @route POST /api/tasks/assign/:taskId - Assign a task (Protected, Admin Only)
router.post('/assign/:taskId', protect, authorize(['Admin']), assignTask);

// @route GET /api/tasks/logs - Complete log of  all tasks (Protected, User/Admin)
router.get('/logs', protect, authorize(['User', 'Admin']), getLogs);

export default router;
