import Order from '../models/Order.js';
import Gig from '../models/Gig.js';
import Wallet from '../models/Wallet.js';
import Transaction from '../models/Transaction.js';
import mongoose from 'mongoose';


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
    // Start a mongoose session for  transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const order = await Order.findById(req.params.id).session(session);

        if (!order) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({
                success: false,
                message: 'Order not found',
            });
        }

        // 1. Only allow buyer to mark as completed
        if (order.buyer.toString() !== req.user._id.toString()) {
            await session.abortTransaction();
            session.endSession();
            return res.status(403).json({
                success: false,
                message: 'Only the buyer can mark this order as completed',
            });
        }

        // 2. Ensure order.status is strictly "paid" or "in-progress"
        if (order.status !== 'in-progress' && order.status !== 'paid') {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({
                success: false,
                message: `Cannot complete order with status: ${order.status}. Order must be paid or in-progress.`,
            });
        }

        // 3. Prevent double execution if already completed
        if (order.status === 'completed') {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({
                success: false,
                message: 'Order is already completed',
            });
        }

        // 4. Calculate commission (10%) and seller payout (90%)
        const platformCommission = Number((order.amount * 0.10).toFixed(2));
        const sellerPayout = Number((order.amount - platformCommission).toFixed(2));

        // 5. Update the Seller's Wallet
        const sellerWallet = await Wallet.findOne({ user: order.seller }).session(session);

        if (!sellerWallet) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({
                success: false,
                message: 'Seller wallet not found',
            });
        }

        sellerWallet.balance += sellerPayout;
        await sellerWallet.save({ session });

        // 6. Create Transaction Document
        await Transaction.create([{
            user: order.seller,
            order: order._id,
            type: 'credit',
            amount: sellerPayout,
            status: 'success',
            description: `Escrow release for order ${order._id} (Fee deducted: ${platformCommission})`,
        }], { session });

        // 7. Update the order status to "completed"
        order.status = 'completed';
        const updatedOrder = await order.save({ session });

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            success: true,
            order: updatedOrder,
        });
    } catch (error) {
        // Abort on error
        await session.abortTransaction();
        session.endSession();

        console.error(`Error in updateOrderStatus controller: ${error.message}`);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};
