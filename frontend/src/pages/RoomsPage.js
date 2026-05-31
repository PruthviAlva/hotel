import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { roomService, hotelService } from '../services/api';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import RoomCard from '../components/RoomCard';
import '../styles/RoomsPage.css';

const RoomsPage = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { selectedRooms, addRoom, removeRoom, setSelectedHotel } = useBooking();

  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHotelAndRooms();
  },);

  const fetchHotelAndRooms = async () => {
    try {
      setLoading(true);
      const hotelRes = await hotelService.getHotel(hotelId);
      const roomsRes = await roomService.getRoomsByHotel(hotelId);

      setHotel(hotelRes.data.hotel);
      setRooms(roomsRes.data.rooms || []);
      setSelectedHotel(hotelRes.data.hotel);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load rooms');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRoom = (room) => {
    const isSelected = selectedRooms.some((r) => r._id === room._id);
    if (isSelected) {
      removeRoom(room._id);
    } else {
      addRoom(room);
    }
  };

  const handleProceed = () => {
    if (selectedRooms.length === 0) {
      alert('Please select at least one room');
      return;
    }

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    navigate(`/booking/guest-details`);
  };

  if (loading) return <div className="loading-container">Loading rooms...</div>;
  if (error) return <div className="error-container">{error}</div>;
  if (!hotel) return <div className="error-container">Hotel not found</div>;

  return (
    <div className="rooms-page">
      <div className="hotel-info-section">
        <img src={hotel.image} alt={hotel.name} className="hotel-image" />
        <div className="hotel-details">
          <h1>{hotel.name}</h1>
          <p className="location">📍 {hotel.address}, {hotel.city}</p>
          <p className="description">{hotel.description}</p>
          <div className="hotel-meta">
            <span>⭐ Rating: {hotel.rating || 'N/A'}</span>
            <span>🛏️ Check-in: {hotel.checkInTime}</span>
            <span>🚪 Check-out: {hotel.checkOutTime}</span>
          </div>
        </div>
      </div>

      <div className="rooms-section">
        <h2>Available Rooms</h2>
        {rooms.length === 0 ? (
          <p>No rooms available</p>
        ) : (
          <div className="rooms-grid">
            {rooms.map((room) => (
              <RoomCard
                key={room._id}
                room={room}
                onSelect={handleSelectRoom}
                isSelected={selectedRooms.some((r) => r._id === room._id)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="room-selection-footer">
        <div className="selection-summary">
          <h3>Selected Rooms: {selectedRooms.length}</h3>
          {selectedRooms.length > 0 && (
            <div className="selected-rooms-list">
              {selectedRooms.map((room) => (
                <span key={room._id} className="selected-room-tag">
                  Room {room.roomNumber} ({room.quantity}x) - ₹{room.price}
                </span>
              ))}
            </div>
          )}
        </div>
        <button onClick={handleProceed} className="proceed-btn" disabled={selectedRooms.length === 0}>
          Proceed to Booking →
        </button>
      </div>
    </div>
  );
};

export default RoomsPage;
