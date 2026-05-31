import React, { useState, useEffect } from 'react';
import { hotelService } from '../services/api';
import { useBooking } from '../context/BookingContext';
import HotelCard from '../components/HotelCard';
import '../styles/HotelsPage.css';

const HotelsPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { searchParams } = useBooking();

  useEffect(() => {
    fetchHotels();
  }, );

  const fetchHotels = async () => {
    try {
      setLoading(true);
      let response;

      if (searchParams.city) {
        response = await hotelService.searchHotels({
          city: searchParams.city,
        });
      } else {
        response = await hotelService.getAllHotels();
      }

      setHotels(response.data.hotels || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch hotels');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading-container">Loading hotels...</div>;
  if (error) return <div className="error-container">{error}</div>;

  return (
    <div className="hotels-page">
      <div className="hotels-header">
        <h1>Available Hotels</h1>
        {searchParams.city && (
          <p>Showing hotels in {searchParams.city}</p>
        )}
      </div>

      {hotels.length === 0 ? (
        <div className="no-results">
          <p>No hotels found. Please try a different search.</p>
        </div>
      ) : (
        <div className="hotels-grid">
          {hotels.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HotelsPage;
