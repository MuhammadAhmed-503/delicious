const User = require('../models/User');
const Order = require('../models/Order');
const Reservation = require('../models/Reservation');
const Food = require('../models/Food');

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalOrders = await Order.countDocuments();
    const totalReservations = await Reservation.countDocuments();
    const totalMenuItems = await Food.countDocuments();

    // Calculate total revenue
    const orders = await Order.find({ paymentStatus: 'Paid' });
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);

    // Get recent orders
    const recentOrders = await Order.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    // Get recent reservations
    const recentReservations = await Reservation.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    // Order status breakdown
    const pendingOrders = await Order.countDocuments({ orderStatus: 'Pending' });
    const completedOrders = await Order.countDocuments({ orderStatus: 'Completed' });
    const cancelledOrders = await Order.countDocuments({ orderStatus: 'Cancelled' });

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalOrders,
        totalReservations,
        totalMenuItems,
        totalRevenue,
        pendingOrders,
        completedOrders,
        cancelledOrders,
        recentOrders,
        recentReservations,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update user role
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
