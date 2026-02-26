import mongoose from 'mongoose';

const gigSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide a gig title'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Please provide a gig description'],
        },
        price: {
            type: Number,
            required: [true, 'Please provide a gig price'],
            min: [0, 'Price cannot be negative'],
        },
        category: {
            type: String,
            required: [true, 'Please select a category'],
            enum: ['notes', 'assignment', 'delivery', 'tutoring', 'other'],
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Seller reference is required'],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);


gigSchema.index({ seller: 1 });

const Gig = mongoose.model('Gig', gigSchema);

export default Gig;
