const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Hotel name is required'],
    },
    description: {
      type: String,
      required: [true, 'Hotel description is required'],
    },
    address: {
      type: String,
      required: [true, 'Hotel address is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    state: {
      type: String,
      required: [true, 'State is required'],
    },
    zipCode: {
      type: String,
      required: [true, 'Zip code is required'],
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
    },
    phone: {
      type: String,
      required: [true, 'Hotel phone is required'],
    },
    email: {
      type: String,
      required: [true, 'Hotel email is required'],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/400x300?text=Hotel',
    },
    amenities: [
      {
        type: String,
      },
    ],
    checkInTime: {
      type: String,
      default: '2:00 PM',
    },
    checkOutTime: {
      type: String,
      default: '11:00 AM',
    },
    totalRooms: {
      type: Number,
      required: [true, 'Total rooms is required'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Hotel', hotelSchema);
