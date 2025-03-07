import express from 'express';
import { register, login} from '../controllers/authController.js';
import { validateLogin, validateRegistration } from '../middleware/authMiddleware.js';

const router = express.Router();

// Auth Routes
router.post('/register',validateRegistration , register);
router.post('/login', validateLogin,login);

export default router;
