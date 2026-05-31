const Payment = require('../models/Payment');
const Booking = require('../models/Booking');

// Create payment (Mock payment system)
exports.createPayment = async (req, res) => {
  try {
    const { bookingId, paymentMethod, cardDetails } = req.body;

    if (!bookingId || !paymentMethod) {
      return res.status(400).json({ success: false, message: 'Please provide booking ID and payment method' });
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to make payment for this booking' });
    }

    // Generate mock transaction ID
    const transactionId = 'TXN' + Date.now();

    const payment = await Payment.create({
      bookingId,
      userId: req.user.id,
      amount: booking.totalPrice,
      paymentMethod,
      transactionId,
      cardDetails: cardDetails || {},
      status: 'pending',
    });

    res.status(201).json({
      success: true,
      message: 'Payment request created',
      payment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Verify payment (Mock verification)
exports.verifyPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { status } = req.body;

    let payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }

    if (payment.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to verify this payment' });
    }

    // Mock: Always succeed or fail based on request
    const finalStatus = status === 'completed' || status === 'success' ? 'completed' : 'failed';
    payment.status = finalStatus;

    if (finalStatus === 'failed') {
      payment.failureReason = 'Mock payment failure';
    }

    payment = await payment.save();

    // Update booking status
    const booking = await Booking.findById(payment.bookingId);
    if (booking) {
      booking.paymentStatus = finalStatus;
      booking.bookingStatus = finalStatus === 'completed' ? 'confirmed' : 'pending';
      await booking.save();
    }

    res.status(200).json({
      success: true,
      message: `Payment ${finalStatus}`,
      payment,
      booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get payment details
exports.getPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('bookingId');

    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }

    if (payment.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to view this payment' });
    }

    res.status(200).json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
