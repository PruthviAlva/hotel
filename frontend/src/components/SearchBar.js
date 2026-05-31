import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import '../styles/SearchBar.css';

const SearchBar = () => {
  const navigate = useNavigate();
  const { updateSearchParams } = useBooking();
  const [params, setParams] = useState({
    city: '',
    checkInDate: '',
    checkOutDate: '',
    guests: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updateSearchParams(params);
    navigate('/hotels');
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <div className="search-group">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={params.city}
            onChange={handleChange}
            placeholder="Enter city name"
            required
          />
        </div>

        <div className="search-group">
          <label>Check-in Date</label>
          <input
            type="date"
            name="checkInDate"
            value={params.checkInDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="search-group">
          <label>Check-out Date</label>
          <input
            type="date"
            name="checkOutDate"
            value={params.checkOutDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="search-group">
          <label>Guests</label>
          <input
            type="number"
            name="guests"
            value={params.guests}
            onChange={handleChange}
            min="1"
            max="10"
          />
        </div>

        <button type="submit" className="search-btn">
          Search Hotels
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
