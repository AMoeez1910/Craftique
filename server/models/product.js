const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define Product Schema
const ProductSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Product name is required'] 
  },

  images: [{
    type: String,
    required: true
  }],
  description: {
    type: String,
    trim: true,
    required: [true, 'Product description is required']
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, 'Quantity cannot be negative']
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative']
  },
  discount: {
    type: Number,
    min: [0, 'Discount cannot be negative']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: 'Brand'
  },

  updated: {
    type: Date,
    default: Date.now
  },
  created: {
    type: Date,
    default: Date.now
  }
});

// Create index on commonly queried fields if needed
// ProductSchema.index({ name: 1 });

module.exports = mongoose.model('Product', ProductSchema);
