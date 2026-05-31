const express = require('express');
const { createBooking, getUserBookings, getBooking, cancelBooking, getAllBookings, updateBookingStatus } = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Protected routes (User)
router.post('/', protect, createBooking);
router.get('/', protect, getUserBookings);
router.get('/:id', protect, getBooking);
router.delete('/:id', protect, cancelBooking);

// Admin routes
router.get('/admin/all', protect, authorize('admin'), getAllBookings);
router.patch('/admin/:id', protect, authorize('admin'), updateBookingStatus);

module.exports = router;
