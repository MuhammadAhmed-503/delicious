const Reservation = require('../models/Reservation');

// @desc    Create new reservation
// @route   POST /api/reservations
// @access  Private
exports.createReservation = async (req, res) => {
  try {
    const { name, phone, email, guests, tableNumber, reservationDate, reservationTime, specialRequest } = req.body;

    // Check if table is already reserved for that date and time
    const existingReservation = await Reservation.findOne({
      tableNumber,
      reservationDate,
      reservationTime,
      status: { $in: ['Pending', 'Confirmed'] },
    });

    if (existingReservation) {
      return res.status(400).json({
        success: false,
        message: 'Table is already reserved for this date and time',
      });
    }

    const reservation = await Reservation.create({
      userId: req.user._id,
      name,
      phone,
      email,
      guests,
      tableNumber,
      reservationDate,
      reservationTime,
      specialRequest,
    });

    res.status(201).json({
      success: true,
      reservation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all reservations (for admin)
// @route   GET /api/reservations
// @access  Private/Admin
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reservations.length,
      reservations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single reservation
// @route   GET /api/reservations/:id
// @access  Private
exports.getReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate('userId', 'name email phone');

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found',
      });
    }

    // Make sure user is reservation owner or admin
    if (reservation.userId._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this reservation',
      });
    }

    res.status(200).json({
      success: true,
      reservation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update reservation status
// @route   PUT /api/reservations/:id
// @access  Private/Admin
exports.updateReservationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found',
      });
    }

    reservation.status = status;
    await reservation.save();

    res.status(200).json({
      success: true,
      reservation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Cancel reservation
// @route   PUT /api/reservations/:id/cancel
// @access  Private
exports.cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found',
      });
    }

    // Check if user owns the reservation
    if (reservation.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this reservation',
      });
    }

    reservation.status = 'Cancelled';
    await reservation.save();

    res.status(200).json({
      success: true,
      reservation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete reservation
// @route   DELETE /api/reservations/:id
// @access  Private/Admin
exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found',
      });
    }

    await reservation.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Reservation deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
