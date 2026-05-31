const Hotel = require('../models/Hotel');

// Get all hotels
exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().populate('createdBy', 'firstName lastName email');
    res.status(200).json({ success: true, count: hotels.length, hotels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single hotel by ID
exports.getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id).populate('createdBy', 'firstName lastName email');

    if (!hotel) {
      return res.status(404).json({ success: false, message: 'Hotel not found' });
    }

    res.status(200).json({ success: true, hotel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create hotel (Admin only)
exports.createHotel = async (req, res) => {
  try {
    const { name, description, address, city, state, zipCode, country, phone, email, amenities, totalRooms } = req.body;

    if (!name || !description || !address || !city || !state || !zipCode || !country || !phone || !email || !totalRooms) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const hotel = await Hotel.create({
      name,
      description,
      address,
      city,
      state,
      zipCode,
      country,
      phone,
      email,
      amenities: amenities || [],
      totalRooms,
      createdBy: req.user.id,
    });

    res.status(201).json({ success: true, hotel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update hotel (Admin only)
exports.updateHotel = async (req, res) => {
  try {
    let hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({ success: false, message: 'Hotel not found' });
    }

    // Update fields
    const { name, description, address, city, state, zipCode, country, phone, email, amenities, rating, image, totalRooms } =
      req.body;

    if (name) hotel.name = name;
    if (description) hotel.description = description;
    if (address) hotel.address = address;
    if (city) hotel.city = city;
    if (state) hotel.state = state;
    if (zipCode) hotel.zipCode = zipCode;
    if (country) hotel.country = country;
    if (phone) hotel.phone = phone;
    if (email) hotel.email = email;
    if (amenities) hotel.amenities = amenities;
    if (rating) hotel.rating = rating;
    if (image) hotel.image = image;
    if (totalRooms) hotel.totalRooms = totalRooms;

    hotel = await hotel.save();

    res.status(200).json({ success: true, hotel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete hotel (Admin only)
exports.deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);

    if (!hotel) {
      return res.status(404).json({ success: false, message: 'Hotel not found' });
    }

    res.status(200).json({ success: true, message: 'Hotel deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Search hotels by city
exports.searchHotels = async (req, res) => {
  try {
    const { city, checkInDate, checkOutDate } = req.query;

    let query = {};
    if (city) {
      query.city = { $regex: city, $options: 'i' };
    }

    const hotels = await Hotel.find(query);

    res.status(200).json({ success: true, count: hotels.length, hotels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
