import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true,
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
    },
    adminNote: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
