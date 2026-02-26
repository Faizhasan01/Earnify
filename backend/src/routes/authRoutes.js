import express from 'express';
import { register, login, getMe, verifyEmail, requestPasswordReset, resetPassword } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';
import rateLimit from 'express-rate-limit';

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 auth requests per `window`
    message: { success: false, message: 'Too many requests from this IP, please try again after 15 minutes' },
});

const router = express.Router();


router.post('/register', register);
router.post('/login', authLimiter, login);
router.get('/me', protect, getMe);

// OTP and Password Reset Routes
router.post('/verify-email', authLimiter, verifyEmail);
router.post('/request-reset', authLimiter, requestPasswordReset);
router.post('/reset-password', resetPassword);

export default router;
