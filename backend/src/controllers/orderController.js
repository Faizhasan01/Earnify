import Order from '../models/Order.js';
import Gig from '../models/Gig.js';


export const createOrder = async (req, res) => {
    try {
        const { gigId } = req.body;

        if (!gigId) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a gig ID',
            });
        }

        // Fetch the gig to get price and seller
        const gig = await Gig.findById(gigId);

        if (!gig) {
            return res.status(404).json({
                success: false,
                message: 'Gig not found',
            });
        }

        // Prevent sellers from buying their own gigs
        if (gig.seller.toString() === req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: 'You cannot buy your own gig',
            });
        }

        // Calculate amount 
        const amount = gig.price;

        const order = await Order.create({
            buyer: req.user._id,
            seller: gig.seller,
            gig: gig._id,
            amount,
            status: 'pending', 
        });

        res.status(201).json({
            success: true,
            order,
        });
    } catch (error) {
        console.error(`Error in createOrder controller: ${error.message}`);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};


export const getMyOrders = async (req, res) => {
    try {
        // Find orders 
        const orders = await Order.find({
            $or: [{ buyer: req.user._id }, { seller: req.user._id }]
        })
            .sort({ createdAt: -1 })
            .populate('buyer', 'name email')
            .populate('seller', 'name email')
            .populate('gig', 'title category price');

        res.status(200).json({
            success: true,
            count: orders.length,
            orders,
        });
    } catch (error) {
        console.error(`Error in getMyOrders controller: ${error.message}`);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};


export const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
            });
        }

        // Check if the user is authorized to update the order
        if (order.buyer.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Only the buyer can mark this order as completed',
            });
        }

        if (order.status === 'completed') {
            return res.status(400).json({
                success: false,
                message: 'Order is already completed',
            });
        }

        order.status = 'completed';
        const updatedOrder = await order.save();

        res.status(200).json({
            success: true,
            order: updatedOrder,
        });
    } catch (error) {
        console.error(`Error in updateOrderStatus controller: ${error.message}`);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};
