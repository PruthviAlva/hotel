import React, { useState, useEffect } from 'react';
import { roomService, hotelService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/AdminPage.css';

const AdminRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    hotelId: '',
    roomNumber: '',
    roomType: 'Double',
    price: '',
    capacity: '',
    bedType: 'Queen',
    amenities: '',
  });

  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchRoomsAndHotels();
  }, []);

  const fetchRoomsAndHotels = async () => {
    try {
      setLoading(true);
      const roomsRes = await roomService.getAllRooms();
      const hotelsRes = await hotelService.getAllHotels();
      setRooms(roomsRes.data.rooms || []);
      setHotels(hotelsRes.data.hotels || []);
    } catch (err) {
      console.error(err.response?.data?.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const amenitiesArray = formData.amenities.split(',').map((a) => a.trim()).filter(Boolean);
      await roomService.createRoom({
        ...formData,
        amenities: amenitiesArray,
        price: parseFloat(formData.price),
        capacity: parseInt(formData.capacity),
      });
      alert('Room created successfully');
      setFormData({
        hotelId: '',
        roomNumber: '',
        roomType: 'Double',
        price: '',
        capacity: '',
        bedType: 'Queen',
        amenities: '',
      });
      setShowForm(false);
      fetchRoomsAndHotels();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create room');
    }
  };

  const handleDelete = async (roomId) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await roomService.deleteRoom(roomId);
        alert('Room deleted successfully');
        fetchRoomsAndHotels();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete room');
      }
    }
  };

  if (!isAdmin) {
    return <div className="error-container">Access Denied</div>;
  }

  if (loading) return <div className="loading-container">Loading rooms...</div>;

  return (
    <div className="admin-page">
      <h1>Manage Rooms</h1>

      <button onClick={() => setShowForm(!showForm)} className="add-btn">
        {showForm ? 'Cancel' : '+ Add New Room'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-row">
            <div className="form-group">
              <label>Hotel *</label>
              <select
                name="hotelId"
                value={formData.hotelId}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Hotel</option>
                {hotels.map((hotel) => (
                  <option key={hotel._id} value={hotel._id}>
                    {hotel.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Room Number *</label>
              <input
                type="text"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Room Type *</label>
              <select
                name="roomType"
                value={formData.roomType}
                onChange={handleInputChange}
              >
                <option>Single</option>
                <option>Double</option>
                <option>Suite</option>
                <option>Deluxe</option>
                <option>Presidential</option>
              </select>
            </div>
            <div className="form-group">
              <label>Bed Type *</label>
              <select
                name="bedType"
                value={formData.bedType}
                onChange={handleInputChange}
              >
                <option>Single</option>
                <option>Double</option>
                <option>Twin</option>
                <option>Queen</option>
                <option>King</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price (per night) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Capacity (guests) *</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Amenities (comma-separated)</label>
            <input
              type="text"
              name="amenities"
              value={formData.amenities}
              onChange={handleInputChange}
              placeholder="AC, TV, Mini Bar, Safe"
            />
          </div>

          <button type="submit" className="submit-btn">
            Create Room
          </button>
        </form>
      )}

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Room No.</th>
              <th>Hotel</th>
              <th>Type</th>
              <th>Price</th>
              <th>Capacity</th>
              <th>Available</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room._id}>
                <td>{room.roomNumber}</td>
                <td>{room.hotelId?.name}</td>
                <td>{room.roomType}</td>
                <td>₹{room.price}</td>
                <td>{room.capacity}</td>
                <td>{room.isAvailable ? 'Yes' : 'No'}</td>
                <td>
                  <button
                    onClick={() => handleDelete(room._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRooms;
