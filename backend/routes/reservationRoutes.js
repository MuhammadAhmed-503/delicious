const express = require('express');
const router = express.Router();
const {
  createReservation,
  getAllReservations,
  getReservation,
  updateReservationStatus,
  cancelReservation,
  deleteReservation,
} = require('../controllers/reservationController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .post(protect, createReservation)
  .get(protect, authorize('admin'), getAllReservations);

router.get('/:id', protect, getReservation);
router.put('/:id', protect, authorize('admin'), updateReservationStatus);
router.put('/:id/cancel', protect, cancelReservation);
router.delete('/:id', protect, authorize('admin'), deleteReservation);

module.exports = router;
