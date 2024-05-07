const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define Order Schema
const OrderSchema = new Schema({
  // User who placed the order
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // seller data is in the products (user ref -> brand  ||| product ref -> brand )
  products: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1 // Ensure minimum quantity is 1
    }
  }],

  // Total price of the order
  totalPrice: {
    type: Number,
    required: true,
    min: 0 // Ensure total price is non-negative
  },

  // Timestamp for order placement
  placedAt: {
    type: Date,
    default: Date.now
  },

  // Shipping details (optional)
  shippingAddress: {
    type: String,
    trim: true
  },

  // Status of the order
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
    default: 'Pending'
  }
});

// Create index on commonly queried fields if needed
// OrderSchema.index({ user: 1, status: 1 });

// Compile the schema into a model and export
module.exports = mongoose.model('Order', OrderSchema);
