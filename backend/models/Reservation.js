const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Please provide name'],
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number'],
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
  },
  guests: {
    type: Number,
    required: [true, 'Please provide number of guests'],
    min: 1,
  },
  tableNumber: {
    type: Number,
    required: [true, 'Please provide table number'],
    min: 1,
  },
  reservationDate: {
    type: Date,
    required: [true, 'Please provide reservation date'],
  },
  reservationTime: {
    type: String,
    required: [true, 'Please provide reservation time'],
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Rejected', 'Completed', 'Cancelled'],
    default: 'Pending',
  },
  specialRequest: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Reservation', reservationSchema);
