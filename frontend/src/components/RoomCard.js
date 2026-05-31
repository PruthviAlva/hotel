import React from 'react';
import '../styles/RoomCard.css';

const RoomCard = ({ room, onSelect, isSelected }) => {
  return (
    <div className={`room-card ${isSelected ? 'selected' : ''}`}>
      <div className="room-image">
        <img src={room.image} alt={room.roomNumber} />
        <span className="room-type-badge">{room.roomType}</span>
      </div>

      <div className="room-content">
        <h4>Room {room.roomNumber}</h4>
        <p className="bed-type">🛏️ {room.bedType} Bed</p>

        <div className="room-details">
          <span>👥 Capacity: {room.capacity} guests</span>
          <span>📏 {room.squareFeet} sq.ft</span>
        </div>

        <div className="room-amenities">
          {room.amenities && room.amenities.slice(0, 2).map((amenity, index) => (
            <span key={index} className="amenity-badge">
              {amenity}
            </span>
          ))}
        </div>

        <div className="room-footer">
          <div className="room-price">
            <span className="price">₹{room.price}</span>
            <span className="per-night">/night</span>
          </div>
          {room.isAvailable ? (
            <button
              onClick={() => onSelect(room)}
              className={`select-btn ${isSelected ? 'selected' : ''}`}
            >
              {isSelected ? '✓ Selected' : 'Select Room'}
            </button>
          ) : (
            <button disabled className="select-btn disabled">
              Not Available
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
