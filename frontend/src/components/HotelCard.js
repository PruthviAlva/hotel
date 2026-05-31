import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HotelCard.css';

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();

  const handleSelectHotel = () => {
    navigate(`/hotel/${hotel._id}/rooms`);
  };

  return (
    <div className="hotel-card">
      <div className="hotel-image">
        <img src={hotel.image} alt={hotel.name} />
        <div className="hotel-rating">⭐ {hotel.rating || 'N/A'}</div>
      </div>

      <div className="hotel-content">
        <h3>{hotel.name}</h3>
        <p className="hotel-location">
          📍 {hotel.city}, {hotel.state}
        </p>
        <p className="hotel-description">{hotel.description}</p>

        <div className="hotel-amenities">
          {hotel.amenities && hotel.amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="amenity-tag">
              {amenity}
            </span>
          ))}
        </div>

        <div className="hotel-footer">
          <p className="hotel-info">
            {hotel.totalRooms} rooms | Check-in: {hotel.checkInTime}
          </p>
          <button onClick={handleSelectHotel} className="view-rooms-btn">
            View Rooms →
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
