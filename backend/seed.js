require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Hotel = require('./models/Hotel');
const Room = require('./models/Room');
const connectDB = require('./config/db');

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Hotel.deleteMany({});
    await Room.deleteMany({});

    console.log('Creating sample admin user...');
    const admin = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@hotel.com',
      phone: '9999999999',
      password: 'admin123',
      role: 'admin',
    });

    console.log('Creating sample regular user...');
    const user = await User.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'user@hotel.com',
      phone: '8888888888',
      password: 'user123',
      role: 'user',
    });

    console.log('Creating sample hotels...');
    const hotel1 = await Hotel.create({
      name: 'Trinity Suites Bangalore',
      description: 'Luxury 5-star hotel in the heart of Bangalore with world-class amenities',
      address: '100 MG Road',
      city: 'Bangalore',
      state: 'Karnataka',
      zipCode: '560001',
      country: 'India',
      phone: '080-4321-1111',
      email: 'contact@trinitysuitesblr.com',
      rating: 4.5,
      image: 'https://via.placeholder.com/400x300?text=Trinity+Suites+Bangalore',
      amenities: ['WiFi', 'Swimming Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'Parking'],
      checkInTime: '2:00 PM',
      checkOutTime: '11:00 AM',
      totalRooms: 150,
      createdBy: admin._id,
    });

    const hotel2 = await Hotel.create({
      name: 'Grand Plaza Hotel',
      description: 'Premium business hotel with modern facilities and excellent service',
      address: '500 Residency Road',
      city: 'Bangalore',
      state: 'Karnataka',
      zipCode: '560025',
      country: 'India',
      phone: '080-4321-2222',
      email: 'contact@grandplazablr.com',
      rating: 4,
      image: 'https://via.placeholder.com/400x300?text=Grand+Plaza+Hotel',
      amenities: ['WiFi', 'Business Center', 'Conference Rooms', 'Restaurant'],
      checkInTime: '3:00 PM',
      checkOutTime: '12:00 PM',
      totalRooms: 100,
      createdBy: admin._id,
    });

    console.log('Creating sample rooms...');
    const roomsHotel1 = [
      {
        hotelId: hotel1._id,
        roomNumber: '101',
        roomType: 'Double',
        price: 5000,
        capacity: 2,
        description: 'Spacious double room with king bed',
        amenities: ['AC', 'TV', 'Mini Bar', 'Safe'],
        bedType: 'King',
        squareFeet: 350,
        isAvailable: true,
      },
      {
        hotelId: hotel1._id,
        roomNumber: '102',
        roomType: 'Suite',
        price: 8000,
        capacity: 4,
        description: 'Luxury suite with separate living area',
        amenities: ['AC', 'TV', 'Mini Bar', 'Safe', 'Jacuzzi'],
        bedType: 'King',
        squareFeet: 500,
        isAvailable: true,
      },
      {
        hotelId: hotel1._id,
        roomNumber: '103',
        roomType: 'Deluxe',
        price: 6500,
        capacity: 3,
        description: 'Deluxe room with premium amenities',
        amenities: ['AC', 'TV', 'Mini Bar', 'Safe', 'Bathrobe'],
        bedType: 'Queen',
        squareFeet: 400,
        isAvailable: true,
      },
    ];

    const roomsHotel2 = [
      {
        hotelId: hotel2._id,
        roomNumber: '201',
        roomType: 'Single',
        price: 3000,
        capacity: 1,
        description: 'Comfortable single room',
        amenities: ['AC', 'TV', 'Desk'],
        bedType: 'Single',
        squareFeet: 250,
        isAvailable: true,
      },
      {
        hotelId: hotel2._id,
        roomNumber: '202',
        roomType: 'Double',
        price: 4500,
        capacity: 2,
        description: 'Standard double room',
        amenities: ['AC', 'TV', 'Desk', 'Mini Bar'],
        bedType: 'Double',
        squareFeet: 300,
        isAvailable: true,
      },
    ];

    await Room.create([...roomsHotel1, ...roomsHotel2]);

    console.log('✓ Database seeded successfully!');
    console.log('\nTest Credentials:');
    console.log('Admin - Email: admin@hotel.com, Password: admin123');
    console.log('User - Email: user@hotel.com, Password: user123');
    console.log('\nSample Hotels: Trinity Suites Bangalore, Grand Plaza Hotel');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
