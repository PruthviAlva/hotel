const Room = require('../models/Room');
const Hotel = require('../models/Hotel');

// Get all rooms
exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate('hotelId', 'name city');
    res.status(200).json({ success: true, count: rooms.length, rooms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single room
exports.getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate('hotelId', 'name city address');

    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    res.status(200).json({ success: true, room });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get rooms by hotel ID
exports.getRoomsByHotel = async (req, res) => {
  try {
    const rooms = await Room.find({ hotelId: req.params.hotelId });

    if (!rooms) {
      return res.status(404).json({ success: false, message: 'Rooms not found for this hotel' });
    }

    res.status(200).json({ success: true, count: rooms.length, rooms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create room (Admin only)
exports.createRoom = async (req, res) => {
  try {
    const { hotelId, roomNumber, roomType, price, capacity, bedType, amenities, description, squareFeet } = req.body;

    if (!hotelId || !roomNumber || !roomType || !price || !capacity || !bedType) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ success: false, message: 'Hotel not found' });
    }

    const room = await Room.create({
      hotelId,
      roomNumber,
      roomType,
      price,
      capacity,
      bedType,
      amenities: amenities || [],
      description: description || '',
      squareFeet: squareFeet || 0,
    });

    res.status(201).json({ success: true, room });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update room (Admin only)
exports.updateRoom = async (req, res) => {
  try {
    let room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    const { roomNumber, roomType, price, capacity, bedType, amenities, description, image, squareFeet, isAvailable } = req.body;

    if (roomNumber) room.roomNumber = roomNumber;
    if (roomType) room.roomType = roomType;
    if (price) room.price = price;
    if (capacity) room.capacity = capacity;
    if (bedType) room.bedType = bedType;
    if (amenities) room.amenities = amenities;
    if (description) room.description = description;
    if (image) room.image = image;
    if (squareFeet) room.squareFeet = squareFeet;
    if (isAvailable !== undefined) room.isAvailable = isAvailable;

    room = await room.save();

    res.status(200).json({ success: true, room });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update room availability status (Admin only)
exports.updateAvailability = async (req, res) => {
  try {
    const { isAvailable } = req.body;

    let room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    room.isAvailable = isAvailable;
    room = await room.save();

    res.status(200).json({ success: true, room });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete room (Admin only)
exports.deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);

    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    res.status(200).json({ success: true, message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
