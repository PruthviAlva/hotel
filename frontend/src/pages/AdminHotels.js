import React, { useState, useEffect } from 'react';
import { hotelService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/AdminPage.css';

const AdminHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    email: '',
    totalRooms: '',
    amenities: '',
  });

  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const response = await hotelService.getAllHotels();
      setHotels(response.data.hotels || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch hotels');
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
      const amenitiesArray = formData.amenities.split(',').map((a) => a.trim());
      await hotelService.createHotel({
        ...formData,
        amenities: amenitiesArray,
        totalRooms: parseInt(formData.totalRooms),
      });
      alert('Hotel created successfully');
      setFormData({
        name: '',
        description: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phone: '',
        email: '',
        totalRooms: '',
        amenities: '',
      });
      setShowForm(false);
      fetchHotels();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create hotel');
    }
  };

  const handleDelete = async (hotelId) => {
    if (window.confirm('Are you sure you want to delete this hotel?')) {
      try {
        await hotelService.deleteHotel(hotelId);
        alert('Hotel deleted successfully');
        fetchHotels();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete hotel');
      }
    }
  };

  if (!isAdmin) {
    return <div className="error-container">Access Denied</div>;
  }

  if (loading) return <div className="loading-container">Loading hotels...</div>;

  return (
    <div className="admin-page">
      <h1>Manage Hotels</h1>

      {error && <div className="error-message">{error}</div>}

      <button onClick={() => setShowForm(!showForm)} className="add-btn">
        {showForm ? 'Cancel' : '+ Add New Hotel'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-row">
            <div className="form-group">
              <label>Hotel Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>State *</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Zip Code *</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Country *</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Total Rooms *</label>
              <input
                type="number"
                name="totalRooms"
                value={formData.totalRooms}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Amenities (comma-separated)</label>
              <input
                type="text"
                name="amenities"
                value={formData.amenities}
                onChange={handleInputChange}
                placeholder="WiFi, AC, Pool, Gym"
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Create Hotel
          </button>
        </form>
      )}

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Hotel Name</th>
              <th>City</th>
              <th>Address</th>
              <th>Rooms</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel) => (
              <tr key={hotel._id}>
                <td>{hotel.name}</td>
                <td>{hotel.city}</td>
                <td>{hotel.address}</td>
                <td>{hotel.totalRooms}</td>
                <td>
                  <button
                    onClick={() => handleDelete(hotel._id)}
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

export default AdminHotels;
