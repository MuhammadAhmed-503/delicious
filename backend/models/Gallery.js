const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: [true, 'Please provide image URL'],
  },
  title: {
    type: String,
    required: [true, 'Please provide title'],
  },
  category: {
    type: String,
    enum: ['Food', 'Interior', 'Events'],
    required: [true, 'Please provide category'],
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Gallery', gallerySchema);
