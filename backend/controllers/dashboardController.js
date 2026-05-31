const Booking = require('../models/Booking');
const User = require('../models/User');
const Hotel = require('../models/Hotel');
const Room = require('../models/Room');

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalHotels = await Hotel.countDocuments();
    const totalRooms = await Room.countDocuments();
    const totalBookings = await Booking.countDocuments();

    const confirmedBookings = await Booking.countDocuments({ bookingStatus: 'confirmed' });
    const completedBookings = await Booking.countDocuments({ bookingStatus: 'completed' });
    const cancelledBookings = await Booking.countDocuments({ bookingStatus: 'cancelled' });

    const totalRevenue = await Booking.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalHotels,
        totalRooms,
        totalBookings,
        confirmedBookings,
        completedBookings,
        cancelledBookings,
        totalRevenue: totalRevenue[0]?.total || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get revenue analytics
exports.getRevenueAnalytics = async (req, res) => {
  try {
    // Monthly revenue
    const monthlyRevenue = await Booking.aggregate([
      { $match: { paymentStatus: 'completed' } },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m', date: '$createdAt' },
          },
          total: { $sum: '$totalPrice' },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Revenue by hotel
    const revenueByHotel = await Booking.aggregate([
      { $match: { paymentStatus: 'completed' } },
      {
        $group: {
          _id: '$hotelId',
          total: { $sum: '$totalPrice' },
          bookingCount: { $sum: 1 },
        },
      },
      { $lookup: { from: 'hotels', localField: '_id', foreignField: '_id', as: 'hotel' } },
      { $unwind: '$hotel' },
      { $sort: { total: -1 } },
    ]);

    res.status(200).json({
      success: true,
      analytics: {
        monthlyRevenue,
        revenueByHotel,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get booking analytics
exports.getBookingAnalytics = async (req, res) => {
  try {
    // Booking status distribution
    const bookingStatusCount = await Booking.aggregate([
      {
        $group: {
          _id: '$bookingStatus',
          count: { $sum: 1 },
        },
      },
    ]);

    // Payment status distribution
    const paymentStatusCount = await Booking.aggregate([
      {
        $group: {
          _id: '$paymentStatus',
          count: { $sum: 1 },
        },
      },
    ]);

    // Average booking value
    const avgBookingValue = await Booking.aggregate([
      {
        $group: {
          _id: null,
          avgPrice: { $avg: '$totalPrice' },
          minPrice: { $min: '$totalPrice' },
          maxPrice: { $max: '$totalPrice' },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      analytics: {
        bookingStatusCount,
        paymentStatusCount,
        avgBookingValue: avgBookingValue[0] || {},
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
