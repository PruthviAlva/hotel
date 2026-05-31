const express = require('express');
const { getRooms, getRoom, getRoomsByHotel, createRoom, updateRoom, updateAvailability, deleteRoom } = require('../controllers/roomController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getRooms);
router.get('/:id', getRoom);
router.get('/hotel/:hotelId', getRoomsByHotel);

// Protected routes (Admin only)
router.post('/', protect, authorize('admin'), createRoom);
router.put('/:id', protect, authorize('admin'), updateRoom);
router.patch('/:id/availability', protect, authorize('admin'), updateAvailability);
router.delete('/:id', protect, authorize('admin'), deleteRoom);

module.exports = router;
