// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   orderId: { type: String, required: true, unique: true }, // Your internal order ID
//   purchaseId: { type: String }, // Stripe PaymentIntent ID
//   transactionId: { type: String }, // Stripe Charge ID or PaymentIntent ID
//   customerEmail: { type: String, required: true },
//   paymentStatus: { type: String, required: true }, // 'succeeded' or 'failed'
//   items: [{ // Array of purchase items (for failures or full details)
//     productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
//     quantity: { type: Number },
//     price: { type: Number }
//   }],
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Order', orderSchema);

// v1

// backend/model/orderModel.js

import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
    index: true, // Faster lookups by your internal order ID
  },
  purchaseId: {
    type: String,
    required: true, // Stripe PaymentIntent ID (pi_xxx)
    index: true,
  },
  transactionId: {
    type: String,
    // Charge ID (ch_xxx) if available, otherwise same as purchaseId
  },
  customerEmail: {
    type: String,
    required: true,
    lowercase: true, // Normalize email
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ['succeeded', 'failed', 'pending'], // More accurate options
    default: 'pending',
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      name: { type: String },       // Optional: snapshot of product name
      price: { type: Number, required: true }, // Price at time of purchase
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: {
    type: Number, // In cents (or your currency's smallest unit)
    required: true,
  },
  currency: {
    type: String,
    default: 'usd',
    uppercase: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

// Optional: Compound index for common queries
orderSchema.index({ customerEmail: 1, createdAt: -1 });

export default mongoose.model('Order', orderSchema);