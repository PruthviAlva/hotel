const express = require('express');
const { getDashboardStats, getRevenueAnalytics, getBookingAnalytics } = require('../controllers/dashboardController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Admin only routes
router.get('/stats', protect, authorize('admin'), getDashboardStats);
router.get('/revenue', protect, authorize('admin'), getRevenueAnalytics);
router.get('/bookings', protect, authorize('admin'), getBookingAnalytics);

module.exports = router;
