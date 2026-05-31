const express = require('express');
const { getHotels, getHotel, createHotel, updateHotel, deleteHotel, searchHotels } = require('../controllers/hotelController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getHotels);
router.get('/search', searchHotels);
router.get('/:id', getHotel);

// Protected routes (Admin only)
router.post('/', protect, authorize('admin'), createHotel);
router.put('/:id', protect, authorize('admin'), updateHotel);
router.delete('/:id', protect, authorize('admin'), deleteHotel);

module.exports = router;
