const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel',
      required: [true, 'Hotel ID is required'],
    },
    roomNumber: {
      type: String,
      required: [true, 'Room number is required'],
    },
    roomType: {
      type: String,
      enum: ['Single', 'Double', 'Suite', 'Deluxe', 'Presidential'],
      required: [true, 'Room type is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    capacity: {
      type: Number,
      required: [true, 'Room capacity is required'],
    },
    description: {
      type: String,
      default: '',
    },
    amenities: [
      {
        type: String,
      },
    ],
    image: {
      type: String,
      default: 'https://via.placeholder.com/400x300?text=Room',
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    bedType: {
      type: String,
      enum: ['Single', 'Double', 'Twin', 'Queen', 'King'],
      required: [true, 'Bed type is required'],
    },
    squareFeet: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Room', roomSchema);
