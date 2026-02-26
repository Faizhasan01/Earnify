import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/Order.js';

// Initialize Razorpay instance lazily to avoid ES module import hoisting issues with dotenv
let razorpayInstance = null;
const getRazorpayInstance = () => {
    if (!razorpayInstance && process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
        razorpayInstance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
    }
    return razorpayInstance;
};

// @desc    Create Razorpay Order
// @route   POST /api/payment/create-order
// @access  Private (Buyer)
export const createRazorpayOrder = async (req, res) => {
    try {
        const { orderId } = req.body;

        if (!orderId) {
            return res.status(400).json({ success: false, message: 'Please provide an order ID' });
        }

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // Only the buyer of this order can initiate payment
        if (order.buyer.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized to pay for this order' });
        }

        if (order.status !== 'pending') {
            return res.status(400).json({ success: false, message: 'Order is not in pending status' });
        }

        // Razorpay accepts amount in smallest currency unit (paise for INR)
        // Assuming order.amount is in INR rupees, multiply by 100
        const options = {
            amount: Math.round(order.amount * 100), // amount in paise
            currency: 'INR',
            receipt: `receipt_order_${order._id}`,
        };

        const razorpay = getRazorpayInstance();
        if (!razorpay) {
            return res.status(500).json({ success: false, message: 'Razorpay is not configured on the server.' });
        }

        const razorpayOrder = await razorpay.orders.create(options);

        // Store the Razorpay order ID in our database order
        order.razorpayOrderId = razorpayOrder.id;
        await order.save();

        res.status(200).json({
            success: true,
            razorpayOrder,
        });

    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ success: false, message: 'Could not create Razorpay order' });
    }
};

// @desc    Verify Razorpay Payment Signature
// @route   POST /api/payment/verify
// @access  Private
export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId) {
            return res.status(400).json({ success: false, message: 'Missing payment details' });
        }

        // Fetch the order first to run pre-verification checks
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found in DB' });
        }

        // 1. Prevent Double Payment Verification
        if (order.status === 'paid') {
            return res.status(400).json({ success: false, message: 'Order already paid' });
        }

        // 2. Ensure razorpay_order_id Matches DB
        if (order.razorpayOrderId !== razorpay_order_id) {
            return res.status(400).json({ success: false, message: 'Order ID mismatch' });
        }

        // Verify Signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        const isAuthentic = expectedSignature === razorpay_signature;

        if (!isAuthentic) {
            return res.status(400).json({ success: false, message: 'Invalid payment signature' });
        }

        // Payment is legit! Update the order status.
        order.razorpayPaymentId = razorpay_payment_id;
        order.status = 'paid'; // Wait for seller to accept to move to "in-progress" conceptually, or just paid is fine

        await order.save();

        res.status(200).json({
            success: true,
            message: 'Payment verified successfully',
            order,
        });

    } catch (error) {
        console.error('Payment verification error:', error);
        res.status(500).json({ success: false, message: 'Payment verification failed' });
    }
};
