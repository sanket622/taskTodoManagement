import express from 'express';
import { register, login} from '../controllers/authController.js';
import { validateLogin, validateRegistration } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route POST /api/users/register - Register as User Or Admin 
router.post('/register',validateRegistration , register);

// @route POST /api/users/login - Login as User Or Admin
router.post('/login', validateLogin,login);

export default router;
