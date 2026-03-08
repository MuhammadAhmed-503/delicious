const express = require('express');
const router = express.Router();
const { 
  getProfile, 
  getUserOrders, 
  getUserReservations 
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.get('/profile', protect, getProfile);
router.get('/orders', protect, getUserOrders);
router.get('/reservations', protect, getUserReservations);

module.exports = router;
