const express = require('express');
const { createPayment, verifyPayment, getPayment } = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Protected routes (User)
router.post('/create', protect, createPayment);
router.post('/verify/:paymentId', protect, verifyPayment);
router.get('/:id', protect, getPayment);

module.exports = router;
