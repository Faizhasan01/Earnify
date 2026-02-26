import Gig from '../models/Gig.js';

// @desc    Create a new gig
// @route   POST /api/gigs
// @access  Private (Seller only)
export const createGig = async (req, res) => {
    try {
        // Ensure user has seller role
        if (req.user.role !== 'seller') {
            return res.status(403).json({
                success: false,
                message: 'Only sellers can create a gig',
            });
        }

        const { title, description, price, category } = req.body;

        // Basic validation
        if (!title || !description || price === undefined || !category) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields (title, description, price, category)',
            });
        }

        // Create gig and attach seller ID from token (req.user is set in authMiddleware)
        const gig = await Gig.create({
            title,
            description,
            price,
            category,
            seller: req.user._id,
        });

        res.status(201).json({
            success: true,
            gig,
        });
    } catch (error) {
        console.error(`Error in createGig controller: ${error.message}`);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

// @desc    Get all active gigs
// @route   GET /api/gigs
// @access  Public
export const getAllGigs = async (req, res) => {
    try {
        // Find only active gigs, sort newest first (createdAt descending),
        // and populate seller info (name, email)
        const gigs = await Gig.find({ isActive: true })
            .sort({ createdAt: -1 })
            .populate('seller', 'name email');

        res.status(200).json({
            success: true,
            count: gigs.length,
            gigs,
        });
    } catch (error) {
        console.error(`Error in getAllGigs controller: ${error.message}`);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};
