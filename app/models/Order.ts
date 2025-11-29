import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true,
        index: true, // Index for fast lookup
    },
    name: {
        type: String,
        required: [true, 'Please provide a name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
    },
    phone: {
        type: String,
        required: [true, 'Please provide a phone number'],
    },
    company: {
        type: String,
    },
    serviceType: {
        type: String,
        required: [true, 'Please provide a service type'],
    },
    budget: {
        type: String,
        required: [true, 'Please provide a budget range'],
    },
    description: {
        type: String,
        required: [true, 'Please provide a project description'],
    },
    deadline: {
        type: String,
    },
    paymentAmount: {
        type: Number,
        required: [true, 'Please provide payment amount'],
    },
    paymentProof: {
        type: String, // Base64 string or URL
        required: [true, 'Please provide payment proof'],
    },
    addons: {
        type: [String],
        default: [],
    },
    totalPrice: {
        type: Number,
    },
    status: {
        type: String,
        default: 'confirmed',
        enum: ['confirmed', 'in-progress', 'review', 'completed'],
        index: true, // Index for filtering by status
    },
    adminNote: {
        type: String,
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true, // Index for sorting
    },
});

// Compound index for common queries (status + createdAt)
OrderSchema.index({ status: 1, createdAt: -1 });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
