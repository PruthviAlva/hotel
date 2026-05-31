const Booking = require('../models/Booking');
const Room = require('../models/Room');
const Hotel = require('../models/Hotel');

// Create booking
exports.createBooking = async (req, res) => {
  try {
    const { hotelId, rooms, checkInDate, checkOutDate, numberOfGuests, guestDetails, specialRequests } = req.body;

    if (!hotelId || !rooms || !checkInDate || !checkOutDate || !numberOfGuests) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    // Calculate number of nights
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const numberOfNights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

    if (numberOfNights <= 0) {
      return res.status(400).json({ success: false, message: 'Check-out date must be after check-in date' });
    }

    // Calculate total price
    let totalPrice = 0;
    const roomDetails = [];

    for (let room of rooms) {
      const roomData = await Room.findById(room.roomId);
      if (!roomData) {
        return res.status(404).json({ success: false, message: `Room ${room.roomId} not found` });
      }

      const roomPrice = roomData.price * numberOfNights * (room.quantity || 1);
      totalPrice += roomPrice;

      roomDetails.push({
        roomId: room.roomId,
        roomNumber: roomData.roomNumber,
        price: roomData.price,
        quantity: room.quantity || 1,
      });
    }

    const booking = await Booking.create({
      userId: req.user.id,
      hotelId,
      rooms: roomDetails,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      numberOfNights,
      guestDetails: guestDetails || {},
      totalPrice,
      specialRequests: specialRequests || '',
    });

    await booking.populate('hotelId', 'name city');

    res.status(201).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user bookings
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate('hotelId', 'name city address')
      .populate('rooms.roomId', 'roomNumber roomType');

    res.status(200).json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single booking
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('userId', 'firstName lastName email phone')
      .populate('hotelId', 'name city address')
      .populate('rooms.roomId', 'roomNumber roomType price');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Check if user owns this booking
    if (booking.userId._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to view this booking' });
    }

    res.status(200).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Check if user owns this booking
    if (booking.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to cancel this booking' });
    }

    booking.bookingStatus = 'cancelled';
    booking.paymentStatus = 'refunded';
    booking = await booking.save();

    res.status(200).json({ success: true, message: 'Booking cancelled successfully', booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all bookings (Admin only)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'firstName lastName email phone')
      .populate('hotelId', 'name city')
      .populate('rooms.roomId', 'roomNumber roomType');

    res.status(200).json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update booking status (Admin only)
exports.updateBookingStatus = async (req, res) => {
  try {
    const { bookingStatus, paymentStatus } = req.body;

    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (bookingStatus) booking.bookingStatus = bookingStatus;
    if (paymentStatus) booking.paymentStatus = paymentStatus;

    booking = await booking.save();

    res.status(200).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
