import User from '../models/User.js';
import Wallet from '../models/Wallet.js';
import OTP from '../models/OTP.js';
import sendEmail from '../utils/sendEmail.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if all required fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email, and password',
            });
        }

        // Check user exists already
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
            });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            role: role || 'buyer',
            isVerified: false,
        });

        // Auto create wallet for new user
        const wallet = await Wallet.create({
            user: user._id,
        });

        // Update user with wallet ID
        user.walletId = wallet._id;
        await user.save();

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const salt = await bcrypt.genSalt(10);
        const hashedOtp = await bcrypt.hash(otp, salt);

        // Delete any existing verification OTPs for this email to prevent duplicates
        await OTP.deleteMany({ email, purpose: 'verify' });

        // Save OTP document
        await OTP.create({
            email,
            otp: hashedOtp,
            purpose: 'verify',
            expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
        });

        // Send OTP
        const message = `Your email verification OTP is: ${otp}\nIt will expire in 5 minutes.`;
        await sendEmail({
            to: email,
            subject: 'Earnify - Verify your Email',
            text: message,
        });

        res.status(201).json({
            success: true,
            message: 'OTP sent to email',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                walletId: user.walletId,
            }
        });

    } catch (error) {
        console.error(`Error in register controller: ${error.message}`);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide an email and password',
            });
        }

        // Check for user 
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        // password match
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        if (!user.isVerified) {
            return res.status(403).json({
                success: false,
                message: 'Please verify your email first',
            });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            success: true,
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });

    } catch (error) {
        console.error(`Error in login controller: ${error.message}`);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};


export const getMe = async (req, res) => {
    try {
        // req.user is set in authMiddleware
        const user = await User.findById(req.user._id).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.error(`Error in getMe controller: ${error.message}`);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

// @desc    Verify Email OTP
// @route   POST /api/auth/verify-email
// @access  Public
export const verifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ success: false, message: 'Please provide email and OTP' });
        }

        // Find OTP record
        const otpRecord = await OTP.findOne({ email, purpose: 'verify' }).sort({ createdAt: -1 });

        if (!otpRecord) {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
        }

        // Verify OTP
        const isMatch = await bcrypt.compare(otp, otpRecord.otp);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }

        // Check if expired manually just in case TTL hasn't run
        if (otpRecord.expiresAt < new Date()) {
            await OTP.deleteOne({ _id: otpRecord._id });
            return res.status(400).json({ success: false, message: 'OTP has expired' });
        }

        // Update user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.isVerified = true;
        await user.save();

        // Delete OTP
        await OTP.deleteOne({ _id: otpRecord._id });

        res.status(200).json({ success: true, message: 'Email verified successfully' });

    } catch (error) {
        console.error(`Error in verifyEmail: ${error.message}`);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// @desc    Request Password Reset
// @route   POST /api/auth/request-reset
// @access  Public
export const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: 'Please provide an email' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const salt = await bcrypt.genSalt(10);
        const hashedOtp = await bcrypt.hash(otp, salt);

        // Delete any existing reset OTPs for this email to prevent duplicates
        await OTP.deleteMany({ email, purpose: 'reset' });

        // Save OTP document
        await OTP.create({
            email,
            otp: hashedOtp,
            purpose: 'reset',
            expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
        });

        // Send OTP
        const message = `Your password reset OTP is: ${otp}\nIt will expire in 5 minutes.`;
        await sendEmail({
            to: email,
            subject: 'Earnify - Password Reset',
            text: message,
        });

        res.status(200).json({ success: true, message: 'OTP sent to email' });

    } catch (error) {
        console.error(`Error in requestPasswordReset: ${error.message}`);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// @desc    Reset Password
// @route   POST /api/auth/reset-password
// @access  Public
export const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).json({ success: false, message: 'Please provide email, OTP, and new password' });
        }

        // Find OTP record
        const otpRecord = await OTP.findOne({ email, purpose: 'reset' }).sort({ createdAt: -1 });

        if (!otpRecord) {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
        }

        // Verify OTP
        const isMatch = await bcrypt.compare(otp, otpRecord.otp);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }

        if (otpRecord.expiresAt < new Date()) {
            await OTP.deleteOne({ _id: otpRecord._id });
            return res.status(400).json({ success: false, message: 'OTP has expired' });
        }

        // Update password
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.password = newPassword;
        await user.save(); // pre-save hook will hash the password

        // Delete OTP
        await OTP.deleteOne({ _id: otpRecord._id });

        res.status(200).json({ success: true, message: 'Password reset successfully' });

    } catch (error) {
        console.error(`Error in resetPassword: ${error.message}`);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
