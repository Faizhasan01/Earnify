import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Transaction must belong to a user'],
        },
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
            required: [true, 'Transaction must be linked to an order'],
        },
        type: {
            type: String,
            enum: ['credit', 'debit'],
            required: [true, 'Transaction type is required'],
        },
        amount: {
            type: Number,
            required: [true, 'Transaction amount is required'],
            min: [0, 'Amount cannot be negative'],
        },
        status: {
            type: String,
            enum: ['pending', 'success', 'failed'],
            required: [true, 'Transaction status is required'],
        },
        description: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

transactionSchema.index({ user: 1 });

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
