const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide food name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide description'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide price'],
  },
  category: {
    type: String,
    required: [true, 'Please provide category'],
    enum: ['Pizza', 'Burgers', 'BBQ', 'Fast Food', 'Drinks', 'Desserts'],
  },
  image: {
    type: String,
    required: [true, 'Please provide image'],
  },
  availability: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Food', foodSchema);
